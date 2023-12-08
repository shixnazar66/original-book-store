import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiQuery } from '@nestjs/swagger';
import { findAllBookDto } from './dto/findAll-book.dto';
import { findBookDto } from './dto/find-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }


  @Put('bookfind')
  find(@Body() findBookDto:findBookDto){
    return this.bookService.find(findBookDto)
  }

  @Get()
  @ApiQuery({name:'limit',required:false})
  @ApiQuery({name:'page',required:false})
  findAll(@Query() findAllBookDto:findAllBookDto) {
    return this.bookService.findAll(findAllBookDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }

  
}
