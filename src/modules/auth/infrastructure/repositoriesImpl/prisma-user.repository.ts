import { Injectable } from '@nestjs/common';

import { UserRepository } from 'src/modules/auth/domain/repositories/user.repository';
import { User } from 'src/modules/auth/domain/entities/user.entity';

import { PrismaService } from 'src/shared/database/prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { roles: { include: { role: true } } },
    });
    return this.mapUser(user);
  }

  async create(email: string, password: string): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        password,
        email,
        roles: {
          create: [
            {
              roleId: 1,
            },
          ],
        },
      },
      include: { roles: { include: { role: true } } },
    });
    console.log(user);

    return this.mapUser(user);
  }

  async findById(id: number): Promise<User | null> {

    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { roles: { include: { role: true } } },
    });
    return this.mapUser(user);
  }

  private mapUser(user: any): User | null {
    if (!user) return null;
    return {
      ...user,
      roles: user.roles.map((userRole: any) => ({
        id: userRole.role.id,
        name: userRole.role.name,
        createdAt: userRole.role.createdAt,
        updatedAt: userRole.role.updatedAt,
      })),
    };
  }
}
