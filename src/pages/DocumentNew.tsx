import { useContext } from "react";
import { Box, Typography } from "@mui/joy";
import { Role } from "../types";
import { RoleContext } from "../RoleContext";

export const DocumentNew = () => {
  const role = useContext(RoleContext);

  if (role !== Role.EMPLOYEE)
    throw new Error("Only employees can create documents.");

  return (
    <Box>
      <Typography level="h1">New document</Typography>
    </Box>
  );
};
