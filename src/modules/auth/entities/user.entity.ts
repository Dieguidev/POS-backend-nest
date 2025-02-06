import { Role } from "./role.entity";

export class User {
  id: number;
  email: string;
  password: string;
  roles: Role[];
  createdAt: Date;
  updatedAt: Date;
}
