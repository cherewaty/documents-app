import { createContext } from "react";
import { Role } from "./types";

export const RoleContext = createContext<Role>(Role.EMPLOYEE);
