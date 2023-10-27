import { useContext } from "react";
import { Box, Button, List, Typography } from "@mui/joy";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getDocumentsQuery } from "../api";
import { Role } from "../types";
import { RoleContext } from "../RoleContext";

export const DocumentsIndex = () => {
  const { data: documents } = useQuery(getDocumentsQuery());
  const role = useContext(RoleContext);

  return (
    <Box sx={{ padding: 4 }}>
      <Box>
        <Typography level="h1">Documents</Typography>
        {role === Role.EMPLOYEE && (
          <Button component={Link} to="new">
            New
          </Button>
        )}
      </Box>
      <List>
        {documents?.map((document) => (
          <li key={document.id}>
            <Link to={`/documents/${document.id}`}>
              {`$${document.amount} ${document.status} ${document.description}`}
            </Link>
          </li>
        ))}
      </List>
    </Box>
  );
};
