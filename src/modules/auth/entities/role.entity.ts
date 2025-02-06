import { User } from "./user.entity";

export class Role {
  id: number;
  name: string;
  users: User[];
  createdAt: Date;
  updatedAt: Date;
}
