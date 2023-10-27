import { ReactNode, useState } from "react";
import { Box, Option, Select } from "@mui/joy";
import { Role } from "./types";
import { RoleContext } from "./RoleContext";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [role, setRole] = useState<Role>(Role.EMPLOYEE);

  return (
    <RoleContext.Provider value={role}>
      <Box sx={{ padding: 2 }}>
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
      </Box>
      <Box>{children}</Box>
    </RoleContext.Provider>
  );
};
