import { useContext } from "react";
import { Box, Button, Typography } from "@mui/joy";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getDocumentQuery } from "../api";
import { Role } from "../types";
import { RoleContext } from "../RoleContext";

export const DocumentShow = () => {
  const { documentId } = useParams();
  if (!documentId) throw new Error("Not found");
  const { data: document } = useQuery(getDocumentQuery(documentId));
  const role = useContext(RoleContext);

  return (
    <Box>
      <Typography level="h1">{`Document ${document?.id}`}</Typography>
      {(role === Role.MANAGER || role === Role.CEO) && (
        <Box>
          <Button>Approve</Button>
          <Button>Reject</Button>
          <Button>Refer</Button>
        </Box>
      )}
    </Box>
  );
};
