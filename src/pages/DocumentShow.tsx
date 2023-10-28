import { useContext } from "react";
import { Button, Container, Stack, Typography } from "@mui/joy";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getDocumentQuery, useUpdateDocumentMutation } from "../api";
import { DocumentStatus, DocumentType, Role } from "../types";
import { RoleContext } from "../RoleContext";
import { StatusChip } from "../components/StatusChip";

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

  if (!document) return <Container maxWidth="sm">Document not found</Container>;

  return (
    <Container maxWidth="sm" sx={{ padding: 4 }}>
      <Stack spacing={2} sx={{ marginBlockEnd: 4 }}>
        <Typography level="h1">{DocumentType[document?.type || 0]}</Typography>
        <Typography>{document?.description}</Typography>
        <Typography
          sx={{ fontWeight: "bold" }}
        >{`$${document?.amount}`}</Typography>
        {document?.reviewer === Role.CEO && (
          <Typography>Awaiting review from CEO</Typography>
        )}
        {document?.reviewer === Role.MANAGER && (
          <Typography>Awaiting review from Manager</Typography>
        )}
        <StatusChip status={document?.status} />
      </Stack>

      {document?.status === DocumentStatus.PENDING &&
        document?.reviewer === role &&
        role !== Role.EMPLOYEE && (
          <Stack direction="row" spacing={2}>
            <Button
              color="success"
              disabled={isPending}
              onClick={handleApprove}
            >
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
    </Container>
  );
};
