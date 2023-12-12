import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { SavedService } from './saved.service';
import { CreateSavedDto } from './dto/create-saved.dto';
import { UpdateSavedDto } from './dto/update-saved.dto';
import { ApiQuery } from '@nestjs/swagger';
import { findAllSaveDto } from './dto/findAll-save.dto';
import { AuthGuard } from 'src/common/guards/auth-guard';

@Controller('saved')
export class SavedController {
  constructor(private readonly savedService: SavedService) {}


  // @UseGuards(AuthGuard)
  @Post()
  create(@Body() createSavedDto: CreateSavedDto) {
    return this.savedService.create(createSavedDto);
  }

  @Get()
  @ApiQuery({name:'limit',required:false})
  @ApiQuery({name:'page',required:false})
  findAll(@Query() findAllSaveDto:findAllSaveDto) {
    return this.savedService.findAll(findAllSaveDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.savedService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.savedService.remove(+id);
  }
}
