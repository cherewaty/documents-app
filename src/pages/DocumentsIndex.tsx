import { useContext } from "react";
import { Box, Button } from "@mui/joy";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getDocumentsQuery } from "../api";
import { Role } from "../types";
import { RoleContext } from "../RoleContext";

export const DocumentsIndex = () => {
  const { data: documents } = useQuery(getDocumentsQuery());
  const role = useContext(RoleContext);

  return (
    <Box>
      <ul>
        {documents?.map((document) => (
          <li key={document.id}>
            <Link to={`/documents/${document.id}`}>
              {`$${document.amount} ${document.description}`}
            </Link>
          </li>
        ))}
      </ul>
      {role === Role.EMPLOYEE && (
        <Button component={Link} to="new">
          New document
        </Button>
      )}
    </Box>
  );
};
