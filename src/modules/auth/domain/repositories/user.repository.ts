import { CreateUserDto } from '../../application/dto/create-user.dto';
import { User } from '../entities/user.entity';

export abstract class UserRepository {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract create(email:string, password: string): Promise<User>;
  abstract findById(id: number): Promise<User | null>;
}
