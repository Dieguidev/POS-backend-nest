import { Module } from '@nestjs/common';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { AuthService } from './application/service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/config/envs';

import { PrismaUserRepository } from './infrastructure/repositoriesImpl/prisma-user.repository';
import { PrismaService } from 'src/shared/database/prisma.service';
import { PrismaModule } from 'src/shared/database/prisma.module';
import { UserRepository } from './domain/repositories/user.repository';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    AuthService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    PrismaService,
  ],
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: envs.jwtSecret,
        signOptions: {
          expiresIn: '2h'
        }
      })
    }),

  ],
  exports:[JwtStrategy, PassportModule, JwtModule]
})
export class AuthModule {}
