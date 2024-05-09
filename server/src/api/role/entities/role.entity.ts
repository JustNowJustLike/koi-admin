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
import { Admin } from '../../admin/entities/admin.entity';
import { Permission } from '../../permission/entities/permission.entity';
import { ApiProperty, OmitType } from '@nestjs/swagger';

@Entity()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;

  @ApiProperty({
    type: () => [() => OmitType(Admin, [])],
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
