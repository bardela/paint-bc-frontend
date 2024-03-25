import { Role } from "./types";

export interface User {
  id: number,
  name: string,
  age: string,
  role: Role
  permissions: Permission,
}

export interface Permission {
  adminUsers: boolean,
  viewPaints: boolean,
  editPaints: boolean,
}
