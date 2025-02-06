import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '@prisma/client';
import { CreateUserDto } from '../dto/create-user.dto';



@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto): Promise<User> {
    const { password, email, confirmPassword } = dto;
    if (password !== confirmPassword) {
      throw new UnauthorizedException('Passwords do not match');
    }

    const existsEmail = await this.userRepository.findByEmail(email);
    if (existsEmail) {
      throw new UnauthorizedException('Email ya registrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userRepository.create(email, hashedPassword);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { id: user.id }; // Solo el ID del usuario en el JWT
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
