import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { encryptWithAES } from 'src/common/utils/hashing-util';
import { Pagination } from 'src/common/utils/pagination';
import { ApiResponse } from 'src/common/http/apiresponse';
import { findAllUserDto } from './dto/findAll-user.dto';


@Injectable()
export class UserService {

constructor(
  @InjectRepository(User) private readonly userRepo: Repository<User>
){}


  async create(createUserDto: CreateUserDto) {
    try {
      const {email} = createUserDto
      const findemm = await this.userRepo.findOneBy({email:email})
      if(findemm){
        throw new BadRequestException('account already register')
      }
      createUserDto.password = encryptWithAES(createUserDto.password);
      const user = this.userRepo.create(createUserDto);
      this.userRepo.save(user);
      return 'bingo';
    } catch (error) {
      throw new error(error);
    }
  }



  async findAll(findAllUserDto:findAllUserDto) {
    try {
      const totalUserCount = await this.userRepo.count()
      const {page,limit} = findAllUserDto 
      const pagination = new Pagination(limit, page, totalUserCount);
      const users = await this.userRepo.find({
        take: pagination.limit,
        skip: pagination.offset,
      });
      return new ApiResponse(users,pagination)
    } catch (error) {
      throw new error(error);
    }
  }



  async findOne(id: number) {
    try {
      const user = await this.userRepo.findOneBy({id})
      if(!user){
        throw new BadRequestException(`user ${id} ID not found`)
      }
      return user
    } catch (error) {
      throw error
    }
  }



  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const { email } = updateUserDto;
      if (updateUserDto.email) {
        const user = await this.userRepo.findOneBy({ email });
        if (user) {
          throw new BadRequestException(`user email ${email} already yes`);
        }
      }
      await this.userRepo.update({ id }, updateUserDto);
      return 'bingo';
    } catch (error) {
      throw new error(error);
    }
  }



  async remove(id: number) {
    try {
      const user = await this.userRepo.findOneBy({ id });
      if (!user) {
        throw new BadRequestException(`user ID ${id} not found`);
      }
      await this.userRepo.remove(user);
      return 'bingo'
    } catch (error) {
      throw new error(error);
    }
  }
}
