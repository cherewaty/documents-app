import { useContext } from "react";
import { Box, Button, Chip, Stack, Typography } from "@mui/joy";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getDocumentQuery, useUpdateDocumentMutation } from "../api";
import { DocumentStatus, DocumentType, Role } from "../types";
import { RoleContext } from "../RoleContext";

export const DocumentShow = () => {
  const { documentId } = useParams();
  if (!documentId) throw new Error("Not found");
  const { data: document } = useQuery(getDocumentQuery(documentId));
  const { mutateAsync: update, isPending } = useUpdateDocumentMutation();
  const role = useContext(RoleContext);

  const handleApprove = async () => {
    await update({ ...document, status: DocumentStatus.APPROVED });
  };
  const handleReject = async () => {
    await update({ ...document, status: DocumentStatus.REJECTED });
  };
  const handleRefer = async () => {
    await update({ ...document, reviewer: Role.CEO });
  };

  const getStatus = () => {
    switch (document?.status) {
      case DocumentStatus.PENDING:
        return "Pending";
      case DocumentStatus.APPROVED:
        return "Approved";
      case DocumentStatus.REJECTED:
        return "Rejected";
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Box sx={{ marginBottom: 4 }}>
        <Typography level="h1">
          {document?.type === DocumentType.EXPENSE ? "Expense" : "Requisition"}
        </Typography>
        <Typography>{document?.description}</Typography>
        <Typography>{`$${document?.amount}`}</Typography>
        <Typography>{`Reviewer: ${document?.reviewer}`}</Typography>
        <Chip>{getStatus()}</Chip>
      </Box>
      {(role === Role.MANAGER || role === Role.CEO) && (
        <Stack direction="row" spacing={2}>
          <Button color="success" disabled={isPending} onClick={handleApprove}>
            Approve
          </Button>
          <Button
            color="danger"
            disabled={isPending}
            onClick={handleReject}
            variant="outlined"
          >
            Reject
          </Button>
          <Button
            color="neutral"
            disabled={isPending}
            onClick={handleRefer}
            variant="outlined"
          >
            Refer
          </Button>
        </Stack>
      )}
    </Box>
  );
};
