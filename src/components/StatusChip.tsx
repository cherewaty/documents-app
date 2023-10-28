import { Chip } from "@mui/joy";
import { DocumentStatus } from "../types";

interface StatusChipProps {
  status?: DocumentStatus;
}

export const StatusChip = ({
  status = DocumentStatus.PENDING,
}: StatusChipProps) => {
  const getText = () => {
    switch (status) {
      case DocumentStatus.PENDING:
        return "Pending";
      case DocumentStatus.APPROVED:
        return "Approved";
      case DocumentStatus.REJECTED:
        return "Rejected";
    }
  };

  const getColor = () => {
    switch (status) {
      case DocumentStatus.PENDING:
        return "neutral";
      case DocumentStatus.APPROVED:
        return "success";
      case DocumentStatus.REJECTED:
        return "danger";
    }
  };

  return <Chip color={getColor()}>{getText()}</Chip>;
};
