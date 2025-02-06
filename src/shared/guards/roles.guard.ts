import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/modules/auth/domain/entities/user.entity';



@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true; // Si no hay roles requeridos, permitir el acceso
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as User;

    if (!user || !user.roles) {
      throw new ForbiddenException('Acceso denegado: usuario no autenticado');
    }

    const hasRole = user.roles.some((role) => requiredRoles.includes(role.name));
    if (!hasRole) {
      throw new ForbiddenException('Acceso denegado: no tienes los permisos necesarios');
    }

    return true;
  }
}
