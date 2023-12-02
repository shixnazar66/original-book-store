import { Injectable } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { Book } from '../book/entities/book.entity';
import { Delivery } from './entities/delivery.entity';
import { BadRequestException } from '@nestjs/common';
import { findAllDeliveryDto } from './dto/findAll-delivery.dto';
import { Pagination } from 'src/common/utils/pagination';
import { ApiResponse } from 'src/common/http/apiresponse';

@Injectable()
export class DeliveryService {

constructor(
  @InjectRepository(User) private readonly userRepo:Repository<User>,
  @InjectRepository(Book) private readonly bookRepo:Repository<Book>,
  @InjectRepository(Delivery) private readonly deliveryRepo:Repository<Delivery>
){}

  async create(createDeliveryDto: CreateDeliveryDto) {
    try {
      const {userid,bookid,address} = createDeliveryDto
      const finduser = await this.userRepo.findOneBy({id:userid})
      const findbook = await this.bookRepo.findOneBy({id:bookid})
      if(!findbook || !finduser || !address){
        throw new BadRequestException(`user ${finduser.id} ID or book ${findbook.id} ID not found or address`)
      }
      const save = await this.deliveryRepo.create({book:findbook,user:finduser,address:createDeliveryDto.address})
      await this.deliveryRepo.save(save)
      return 'bingo'
    } catch (error) {
      throw error
    }
  }


 async findAll(findAllDeliveryDto:findAllDeliveryDto) {
  try {
    const totalUserCount = await this.deliveryRepo.count()
    const {page,limit} = findAllDeliveryDto 
    const pagination = new Pagination(limit, page, totalUserCount);
    const users = await this.deliveryRepo.find({
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
    const find = await this.deliveryRepo.findOne({where:{id},relations:["user","book"]})
    if(!find){
      throw new BadRequestException(`delivery ${id} ID not found`)
    }
    return find
    } catch (error) {
      throw error
    }
  }


  async update(id: number, updateDeliveryDto: UpdateDeliveryDto) {
    try {
      const {bookid,userid,address} = updateDeliveryDto
      const finddelivery = await this.deliveryRepo.findOneBy({id})
      if(!finddelivery){
        throw new BadRequestException(`delivery ${id} ID not found`)
      }
      await this.deliveryRepo.update({id},updateDeliveryDto)
      return 'bingo'
    } catch (error) {
      throw error
    }
  }

  async remove(id: number) {
    try {
      const find = await this.deliveryRepo.findOneBy({id})
  if(!find){
    throw new BadRequestException(`delivery ${id} ID not found`)
  }
  await this.deliveryRepo.remove(find)
  return 'bingo'
    } catch (error) {
      throw error
    }
  }
}
