import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { pagination, success } from '../../utils/response';
import { Admin } from './entities/admin.entity';
import { ApiPagination, ApiSuccess } from '../../decorators/response/response.decorator';
import { Public } from '../../decorators/public/public.decorator';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from './dto/login-response.dto';
import { Permission } from '../../decorators/permission/permission.decorator';

@ApiTags('admin')
@ApiBearerAuth()
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  @ApiOperation({
    operationId: 'createAdmin',
    description: '创建admin',
  })
  @ApiSuccess()
  @Permission('createAdmin')
  @Post()
  async create(@Body() createAdminDto: CreateAdminDto) {
    await this.adminService.create(createAdminDto);
    return success();
  }

  @ApiOperation({
    operationId: 'getAdminList',
    description: '查询admin列表',
  })
  @ApiPagination(Admin)
  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(16), ParseIntPipe) pageSize: number,
  ) {
    const [adminList, total] = await this.adminService.findAll(page, pageSize);
    return pagination(adminList, total);
  }

  @ApiOperation({
    operationId: 'getAdminById',
    description: '根据uuid查询admin详情',
  })
  @ApiSuccess(Admin)
  @ApiParam({
    name: 'id',
    example: '7702c928-35eb-4182-ba8a-9e4ccb9ff7e8',
    description: 'admin的uuid',
    type: String,
  })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const admin = await this.adminService.findOne(id);
    return success(admin);
  }

  @ApiOperation({
    operationId: 'updateAdminById',
    description: '根据uuid更新admin',
  })
  @ApiSuccess()
  @ApiParam({
    name: 'id',
    example: '875ecad7-f2f0-476c-88c7-c15a20b241e8',
    description: 'admin的uuid',
    type: String,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id, updateAdminDto);
  }

  @ApiOperation({
    operationId: 'deleteAdminById',
    description: '根据uuid删除admin',
  })
  @ApiSuccess()
  @ApiParam({
    name: 'id',
    example: '875ecad7-f2f0-476c-88c7-c15a20b241e8',
    description: 'admin的uuid',
    type: String,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }

  @ApiOperation({
    summary: '登录',
    operationId: 'login',
    description: '登录',
  })
  @ApiSuccess(LoginResponseDto)
  @Public()
  @Post('/login')
  async login() {
    const payload = { sub: 'user.userId', username: 'user.username' };
    const token = await this.jwtService.signAsync(payload);
    return success({ token });
  }
}
