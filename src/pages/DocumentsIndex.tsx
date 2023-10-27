import { Box, Button } from "@mui/joy";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getDocumentsQuery } from "../api";

export const DocumentsIndex = () => {
  const { data: documents } = useQuery(getDocumentsQuery());

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
      <Button component={Link} to="new">
        New document
      </Button>
    </Box>
  );
};
