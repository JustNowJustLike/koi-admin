import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Admin } from '../../admin/entities/admin.entity';
import { Permission } from '../../permission/entities/permission.entity';
import { ApiProperty, OmitType } from '@nestjs/swagger';

@Entity()
export class Role {
  @ApiProperty({
    description: '角色id',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: '角色名称',
  })
  @Column()
  name: string;

  @ApiProperty({
    type: () => [() => OmitType(Admin, ['roleList'])],
  })
  @ManyToMany(() => Admin, (adminList) => adminList.roleList)
  adminList: Admin[];

  @ApiProperty({
    type: () => [() => OmitType(Permission, [])],
  })
  @ManyToMany(() => Permission, (permissionList) => permissionList.roleList)
  @JoinTable()
  permissionList: Permission[];

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
}
