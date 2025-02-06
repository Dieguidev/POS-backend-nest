import { Module } from '@nestjs/common';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { AuthService } from './application/service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/config/envs';

import { PrismaUserRepository } from './infrastructure/repositoriesImpl/prisma-user.repository';
import { PrismaService } from 'src/shared/database/prisma.service';
import { PrismaModule } from 'src/shared/database/prisma.module';
import { UserRepository } from './domain/repositories/user.repository';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    PrismaService,
  ],
  imports: [
    JwtModule.register({
      global: true,
      secret: envs.jwtSecret,
      signOptions: {
        expiresIn: '60s',
      },
    }),
    PrismaModule
  ],
})
export class AuthModule {}
