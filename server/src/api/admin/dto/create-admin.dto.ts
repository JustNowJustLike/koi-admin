import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  @MinLength(6)
  @ApiProperty({
    description: '用户名',
    example: 'admin',
  })
  name: string;
}
