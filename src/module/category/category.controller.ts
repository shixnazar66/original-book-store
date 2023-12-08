import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiQuery } from '@nestjs/swagger';
import { findAllCategoryDto } from './dto/finAll-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }


  @Get('findcategory')
  findcategory(){
   return this.categoryService.findcategory()
  }


  @Post('findcat')
  findcat(@Body() CreateCategoryDto:CreateCategoryDto){
    return this.categoryService.findcat(CreateCategoryDto)
  }


  @Get()
  @ApiQuery({name:'limit',required:false})
  @ApiQuery({name:'page',required:false})
  findAll(@Query() findAllCategoryDto:findAllCategoryDto) {
    return this.categoryService.findAll(findAllCategoryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
