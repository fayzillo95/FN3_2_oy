import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../types/user.enums';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
