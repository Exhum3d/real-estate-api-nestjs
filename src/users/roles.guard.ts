import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { RoleEnum } from "./entities/role.enum";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    // what is the required role
    const requireRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      'roles',
      [
        context.getHandler,
        context.getClass,
      ]);

    if (!requireRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    // does the current user making the request has the required roles
    return requireRoles.some(role => user.roles.include(role));
  }
}
