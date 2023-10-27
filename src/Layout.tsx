import { ReactNode, useState } from "react";
import { Box, IconButton, Option, Select, Stack } from "@mui/joy";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import { Link as RouterLink } from "react-router-dom";
import { Role } from "./types";
import { RoleContext } from "./RoleContext";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [role, setRole] = useState<Role>(Role.EMPLOYEE);

  return (
    <RoleContext.Provider value={role}>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", padding: 2 }}
      >
        <IconButton aria-label="Home" component={RouterLink} to="/">
          <HomeIcon />
        </IconButton>
        <Stack direction="row" spacing={2}>
          {role === Role.EMPLOYEE && (
            <IconButton
              aria-label="New document"
              component={RouterLink}
              to="/documents/new"
            >
              <AddIcon />
            </IconButton>
          )}
          <Select
            defaultValue={Role.EMPLOYEE}
            onChange={(_e, value) => {
              if (value !== null) {
                setRole(value);
              }
            }}
          >
            <Option value={Role.EMPLOYEE}>Employee</Option>
            <Option value={Role.MANAGER}>Manager</Option>
            <Option value={Role.CEO}>CEO</Option>
          </Select>
        </Stack>
      </Box>
      <Box>{children}</Box>
    </RoleContext.Provider>
  );
};
