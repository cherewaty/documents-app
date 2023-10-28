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
import { Role } from "../types";
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

      <List>
        {documents?.map((document) => (
          <ListItem key={document.id}>
            <ListItemButton
              component={RouterLink}
              to={`/documents/${document.id}`}
            >
              <ListItemContent sx={{ overflow: "hidden" }}>
                <Typography
                  sx={{ textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                >
                  {document.description}
                </Typography>
              </ListItemContent>
              <ListItemDecorator>
                <Stack direction="row" spacing={2} sx={{ paddingInline: 1 }}>
                  <StatusChip status={document.status} />
                  <Typography>{`$${document.amount}`}</Typography>
                </Stack>
              </ListItemDecorator>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};
