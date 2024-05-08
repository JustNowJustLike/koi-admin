import { SetMetadata } from '@nestjs/common';
import { PERMISSION_GUARD_KEY } from '../../constants';

export const Permission = (...args: string[]) =>
  SetMetadata(PERMISSION_GUARD_KEY, args);
