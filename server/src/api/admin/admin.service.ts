import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AdminService {
  constructor(@InjectRepository(Admin) private adminRepository: Repository<Admin>) {}

  create(createAdminDto: CreateAdminDto) {
    return this.adminRepository.insert(createAdminDto);
  }

  findAll(page = 1, pageSize = 16) {
    return this.adminRepository.findAndCount({
      order: {
        createdAt: 'desc',
      },
      relations: ['roleList'],
    });
  }

  findOne(id: string) {
    return this.adminRepository.findOne({
      where: {
        id,
      },
      order: {
        createdAt: 'desc',
      },
      relations: ['roleList'],
    });
  }

  update(id: string, updateAdminDto: UpdateAdminDto) {
    return this.adminRepository.update(id, updateAdminDto);
  }

  remove(id: string) {
    return this.adminRepository.softDelete(id);
  }
}
