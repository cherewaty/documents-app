import { ReactNode } from "react";
import { Box } from "@mui/joy";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return <Box>{children}</Box>;
};
