import { User } from '../entities/user.entity';

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<User>;
  findById(id: number): Promise<User | null>;
}
