import { Role } from "@prisma/client";


export class User {
  id: number;
  email: string;
  password: string;
  roles: Role[];
  createdAt: Date;
  updatedAt: Date;
}
