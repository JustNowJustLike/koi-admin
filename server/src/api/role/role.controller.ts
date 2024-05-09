import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiOperation, ApiParam, ApiTags, OmitType } from '@nestjs/swagger';
import { ApiPagination, ApiSuccess } from '../../decorators/response/response.decorator';
import { Role } from './entities/role.entity';

@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({
    summary: '创建角色',
    operationId: 'createRole',
  })
  @ApiSuccess()
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @ApiOperation({
    summary: '角色列表',
    operationId: 'getRoleList',
  })
  @ApiPagination(OmitType(Role, ['adminList', 'permissionList'] as const))
  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @ApiOperation({
    summary: '角色详情',
    operationId: 'getRoleById',
  })
  @ApiSuccess(OmitType(Role, ['adminList', 'permissionList'] as const))
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.roleService.findOne(+id);
  }

  @ApiOperation({
    summary: '更新角色',
    operationId: 'updateRole',
  })
  @ApiSuccess()
  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @ApiOperation({
    summary: '删除角色',
    operationId: 'deleteRole',
  })
  @ApiSuccess()
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.roleService.remove(+id);
  }
}
