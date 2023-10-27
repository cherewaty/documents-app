import { useContext } from "react";
import { Container, List, Typography } from "@mui/joy";
import { useQuery } from "@tanstack/react-query";
import { Link as RouterLink } from "react-router-dom";
import { getDocumentsQuery } from "../api";
import { Role } from "../types";
import { RoleContext } from "../RoleContext";

export const DocumentsIndex = () => {
  const { data: documents } = useQuery(getDocumentsQuery());
  const role = useContext(RoleContext);

  return (
    <Container sx={{ padding: 4 }}>
      <Typography level="h1">Documents</Typography>
      <Typography>Role {Role[role]}</Typography>

      <List>
        {documents?.map((document) => (
          <li key={document.id}>
            <RouterLink to={`/documents/${document.id}`}>
              {`$${document.amount} ${document.status} ${document.description}`}
            </RouterLink>
          </li>
        ))}
      </List>
    </Container>
  );
};
