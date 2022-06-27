import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from './entities/role.enum';

export const Roles = (...roles: RoleEnum[]) => SetMetadata('roles', roles)
