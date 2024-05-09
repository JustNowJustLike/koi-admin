import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { ApiProperty, OmitType } from '@nestjs/swagger';

@Entity()
@Tree('materialized-path')
export class Permission extends BaseEntity {
  @ApiProperty({
    description: '权限id',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: '权限名称',
  })
  @Column()
  title: string;

  @ApiProperty({
    description: '角色列表',
    type: () => [() => OmitType(Role, [])],
  })
  @ManyToMany(() => Role, (roleList) => roleList.permissionList)
  roleList: Role[];

  @ApiProperty({
    description: '子集节点',
    type: () => [OmitType(Permission, ['parent'] as const)],
  })
  @TreeChildren()
  children: Permission[];

  @ApiProperty({
    description: '父级节点',
    type: () => OmitType(Permission, ['children'] as const),
  })
  @TreeParent()
  parent: Permission;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
}
