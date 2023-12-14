import { BadRequestException, Injectable, UseGuards } from '@nestjs/common';
import { CreateSavedDto } from './dto/create-saved.dto';
import { UpdateSavedDto } from './dto/update-saved.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Saved } from './entities/saved.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Book } from '../book/entities/book.entity';
import { findAllSaveDto } from './dto/findAll-save.dto';
import { Pagination } from 'src/common/utils/pagination';
import { ApiResponse } from 'src/common/http/apiresponse';

@Injectable()
export class SavedService {

  constructor(
    @InjectRepository(Saved) private readonly savedRepo:Repository<Saved>,
    @InjectRepository(User) private readonly userRepo:Repository<User>,
    @InjectRepository(Book) private readonly bookRepo:Repository<Book>
  ){}

 
  async create(createSavedDto: CreateSavedDto) {
   try {
    const {userid,bookid} = createSavedDto
    const findbook = await this.bookRepo.findOneBy({id:bookid})
    const finduser = await this.userRepo.findOneBy({id:userid})
    if(!findbook || !finduser){
      throw new BadRequestException('user or book not found')
    } 
    const find = await this.savedRepo.find({where:{user:finduser,book:findbook}})
    if(find){
      return 'siz bu kitobni allaqachon saqlagansiz'
    }
    const save = await this.savedRepo.create({book:findbook,user:finduser})
    await this.savedRepo.save(save)
    return 'bingo'
   } catch (error) {
    throw error 
   } 
  }
 

  async findAll(findAllSaveDto:findAllSaveDto) {
    try {
      const totalUserCount = await this.savedRepo.count()
      const {page,limit} = findAllSaveDto 
      const pagination = new Pagination(limit, page, totalUserCount);
      const users = await this.savedRepo.find({
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
    const findsave = await this.savedRepo.findOne({where:{id},relations:["user","book"]})
    if(!findsave){
      throw new BadRequestException(`save ${id} ID not found`)
    }
     return findsave
    } catch (error) {
     throw error 
    }
  }


 async remove(id: number) {
  try {
     const find = await this.savedRepo.findOneBy({id})
    if(!find){
      throw new BadRequestException(`save ${id} ID not found`)
    }
    await this.savedRepo.remove(find)
    return 'bingo'
  } catch (error) {
    throw error
  } 
 }
}
