import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { Category } from '../category/entities/category.entity';
import { findAllBookDto } from './dto/findAll-book.dto';
import { Pagination } from 'src/common/utils/pagination';
import { ApiResponse } from 'src/common/http/apiresponse';
import { findBookDto } from './dto/find-book.dto';

@Injectable()
export class BookService {

constructor(
  @InjectRepository(Book) private readonly bookRepo:Repository<Book>,
  @InjectRepository(Category) private readonly categoryRepo:Repository<Category>
){}

  async create(createBookDto: CreateBookDto) {
    try {
      const {bookname,booklanguage,author,categoryID,money,pdf} = createBookDto
      const pusharr = []
      for (let id of categoryID){
      const findcategory = await this.categoryRepo.findOneBy({id})
      if(!findcategory){
        throw new BadRequestException('category ID not found')
      }
      pusharr.push(findcategory)
      }
      const end = this.bookRepo.create({
        bookname,
        booklanguage,
        author,
        money,
        pdf,
        category:pusharr
      })
      await this.bookRepo.save(end)
      return 'bingo'
    } catch (error) {
      throw error
    }
  }


  async findAll(findAllBookDto:findAllBookDto) {
    try {
      const totalUserCount = await this.bookRepo.count()
      const {page,limit} = findAllBookDto 
      const pagination = new Pagination(limit, page, totalUserCount);
      const users = await this.bookRepo.find({
        take: pagination.limit,
        skip: pagination.offset,
        relations: ['category'],
        loadRelationIds: true
      });
      return new ApiResponse(users,pagination)
    } catch (error) {
      throw new error(error);
    }
  }


 async findOne(id: number) {
  try {
    const findbook = await this.bookRepo.findOneBy({id})
    if(!findbook){
      throw new BadRequestException(`book ${id} ID not found`)
    }
    if(findbook){
      this.bookRepo.update({id},{viewcount:findbook.viewcount+1})
    }
    return findbook
  } catch (error) {
    throw error
   }
  }


  async update(id: number, updateBookDto: UpdateBookDto) {
    try {
      const find = await this.bookRepo.findOneBy({id})
    if(!find){
      throw new BadRequestException(`book ${id} ID not found`)
    }
    const {author,booklanguage,bookname,money,viewcount,pdf} = updateBookDto
    await this.bookRepo.update({id},{author,booklanguage,bookname,money,viewcount,pdf})
    return 'bingo'
    } catch (error) {
      throw error
    }
  }


  async remove(id: number) {
    try {
      const findbook = await this.bookRepo.findOneBy({id})
      if(!id){
        throw new BadRequestException(`book ${id} ID not found`)
      }
      await this.bookRepo.remove(findbook)
      return 'bingo'
    } catch (error) {
      throw error
    }
  }

 
  async find(findBookDto:findBookDto){
    try {
      const {bookname} = findBookDto
      const find = await this.bookRepo.findOneBy({bookname:bookname})
      if(!find){
        throw new BadRequestException('kitob topilmadi')
      }
      const id = find.id
      this.bookRepo.update({id},{viewcount:find.viewcount+1})
      return find
    } catch (error) {
      throw error
    }
  }
 

  async buy(id:number){
    try {
      const find = await this.bookRepo.findOneBy({id})
      if(!find){
        throw new BadRequestException('kitob topilmadi')
      } 
      return find
    } catch (error) {
      console.log(error);
    }
  }

}
