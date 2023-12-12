import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth-guard';


@ApiTags()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() CreateAuthDto: CreateAuthDto) {
    return this.authService.login(CreateAuthDto);
  }

  @Put('register')
  register(@Body()CreateAuthDto:CreateAuthDto) {
    return this.authService.register(CreateAuthDto);
  }


  @UseGuards(AuthGuard)
  @Get('refresh/:id')
  refresh(@Body() id: string) {
    return this.authService.refresh(id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
 

  @Get('telegram/:id')
  findtelegramID(@Param('id')id:string){
    return this.authService.findtelegramID(id)
  } 


  @Get('saved/:id')
  findsaved(@Param('id')id:string){
    return this.authService.finsaved(+id)
  }
}
