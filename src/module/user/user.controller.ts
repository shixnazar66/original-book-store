import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiQuery } from '@nestjs/swagger';
import { findAllUserDto } from './dto/findAll-user.dto';
import { AuthGuard } from 'src/common/guards/auth-guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @UseGuards(AuthGuard)
  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiQuery({name:'limit',required:false})
  @ApiQuery({name:'page',required:false})
  findAll(@Query() findAllUserDto:findAllUserDto) {
    return this.userService.findAll(findAllUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }


  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }


  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
