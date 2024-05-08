import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Admin extends BaseEntity {
  @ApiProperty({
    description: 'admin的uuid',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'admin的用户名',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: '角色列表',
  })
  @ManyToMany(() => Role, (roleList) => roleList.adminList)
  @JoinTable()
  roleList: Role[];

  @ApiProperty({
    format: 'YYYY-MM-DD hh:mm:ss',
    description: '创建时间',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    format: 'YYYY-MM-DD hh:mm:ss',
    description: '更新时间',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    format: 'YYYY-MM-DD hh:mm:ss',
    description: '更新时间',
  })
  @DeleteDateColumn()
  deletedAt: Date;
}
