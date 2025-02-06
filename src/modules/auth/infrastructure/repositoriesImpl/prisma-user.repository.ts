import { Injectable } from '@nestjs/common';

import { UserRepository } from 'src/modules/auth/domain/repositories/user.repository';
import { User } from 'src/modules/auth/domain/entities/user.entity';
import { CreateUserDto } from 'src/modules/auth/application/dto/create-user.dto';
import { PrismaService } from 'src/shared/database/prisma.service';


@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email }, include: { roles: true } });
  }

  async create(email:string, password: string): Promise<User> {
    return this.prisma.user.create({ data: {
      password,
      email
    }, include: { roles: true } });
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id }, include: { roles: true } });
  }
}
