import { useContext } from "react";
import {
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Stack,
  Typography,
} from "@mui/joy";
import { useQuery } from "@tanstack/react-query";
import { Link as RouterLink } from "react-router-dom";
import { getDocumentsByRoleQuery } from "../api";
import { DocumentType, Role } from "../types";
import { RoleContext } from "../RoleContext";
import { StatusChip } from "../components/StatusChip";

export const DocumentsIndex = () => {
  const role = useContext(RoleContext);
  const { data: documents } = useQuery(getDocumentsByRoleQuery(role));

  return (
    <Container maxWidth="md" sx={{ padding: 4 }}>
      <Typography level="h1" sx={{ marginBlockEnd: 2 }}>
        Documents
      </Typography>

      {(role === Role.MANAGER || role === Role.CEO) && (
        <Typography>
          {documents && documents?.length > 0
            ? "Awaiting your review"
            : "No documents to review"}
        </Typography>
      )}

      {role === Role.EMPLOYEE && documents?.length === 0 && (
        <Typography>No documents</Typography>
      )}

      <List sx={{ gap: 2 }}>
        {documents?.map((document) => (
          <ListItem key={document.id}>
            <ListItemButton
              component={RouterLink}
              to={`/documents/${document.id}`}
            >
              <ListItemContent sx={{ overflow: "hidden" }}>
                <Typography
                  sx={{
                    marginBlockEnd: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {`${DocumentType[document.type]}: ${document.description}`}
                </Typography>
                <StatusChip status={document.status} />
              </ListItemContent>
              <ListItemDecorator>
                <Typography
                  sx={{ paddingInline: 1 }}
                >{`$${document.amount}`}</Typography>
              </ListItemDecorator>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};
