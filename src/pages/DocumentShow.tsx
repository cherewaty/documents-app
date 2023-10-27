import { Box, Typography } from "@mui/joy";
import { useParams } from "react-router-dom";

export const DocumentShow = () => {
  const { documentId } = useParams();
  if (!documentId) throw new Error("Not found");
  return (
    <Box>
      <Typography level="h1">{`Document ${documentId}`}</Typography>
    </Box>
  );
};
