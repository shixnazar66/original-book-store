import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { findAllCategoryDto } from './dto/finAll-category.dto';
import { ApiResponse } from 'src/common/http/apiresponse';
import { Pagination } from 'src/common/utils/pagination';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category) private readonly categoryRepo: Repository<Category>
  ){}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      if(!createCategoryDto.categoryname){
        throw new BadRequestException('category nomini kiriting')
      }
      const category = this.categoryRepo.create(createCategoryDto)
      await this.categoryRepo.save(category)
      return 'bingo'
    } catch (error) {
      throw error
    }
  }

  async findAll(findAllCategoryDto:findAllCategoryDto) {
    try {
      const totalUserCount = await this.categoryRepo.count()
      const {page,limit} = findAllCategoryDto 
      const pagination = new Pagination(limit, page, totalUserCount);
      const users = await this.categoryRepo.find({
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
      const category = await this.categoryRepo.findOneBy({id})
      if(!category){
        throw new BadRequestException(`category ${id} ID not found`)
      }
      return category
    } catch (error) {
      throw error
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const findcategory = await this.categoryRepo.findOneBy({id})
      if(!findcategory){
        throw new BadRequestException(`category ${id} ID not found`)
      }
      await this.categoryRepo.update({id}, updateCategoryDto)
      return 'bingo'
    } catch (error) {
      throw error
    }
  }

  async remove(id: number) {
   try {
    const findcategory = await this.categoryRepo.findOneBy({id})
    if(!findcategory){
      throw new BadRequestException(`category ${id} ID not found`)
    }
    this.categoryRepo.remove(findcategory)
    return 'bingo'
   } catch (error) {
    throw error
   }
  }
}
