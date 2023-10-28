import { useContext } from "react";
import { Container, Link, List, Typography } from "@mui/joy";
import { useQuery } from "@tanstack/react-query";
import { Link as RouterLink } from "react-router-dom";
import { getDocumentsByRoleQuery } from "../api";
import { Role } from "../types";
import { RoleContext } from "../RoleContext";

export const DocumentsIndex = () => {
  const role = useContext(RoleContext);
  const { data: documents } = useQuery(getDocumentsByRoleQuery(role));

  return (
    <Container sx={{ padding: 4 }}>
      <Typography level="h1">Documents</Typography>
      <Typography>Role {Role[role]}</Typography>

      <List>
        {documents?.map((document) => (
          <li key={document.id}>
            <Link component={RouterLink} to={`/documents/${document.id}`}>
              {`$${document.amount} ${document.status} ${document.description}`}
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
};
