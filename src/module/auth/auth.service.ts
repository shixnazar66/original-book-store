import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { decryptWithAES,encryptWithAES } from 'src/common/utils/hashing-util';
import { env } from 'src/common/config/env.config';
import { Saved } from '../saved/entities/saved.entity';


@Injectable()
export class AuthService {
constructor(
  @InjectRepository(User) private readonly UserRepo: Repository<User>,
  @InjectRepository(Saved) private readonly savedRepo: Repository<Saved>
){}


async login(CreateAuthDto: CreateAuthDto) {
  try {
    const { password, email, firstname } = CreateAuthDto;
    const emm = await this.UserRepo.findOneBy({ email });
    const namm = await this.UserRepo.findOneBy({ firstname });
    if (!emm || !namm) {
      throw new BadRequestException('wrong email or name');
    }
    if (decryptWithAES(emm.password)!==password) {
      throw new BadRequestException('password wrong');
    }
    CreateAuthDto.password = encryptWithAES(CreateAuthDto.password)
    const newtoken = jwt.sign({ id: namm.id }, env.REFRESH_TOKEN_SECRET, {
      expiresIn: '1d',
    });
    const id = emm.id
    CreateAuthDto.refresh_token = newtoken
    CreateAuthDto.refresh_token = encryptWithAES(CreateAuthDto.refresh_token)
    const user = await this.UserRepo.create(CreateAuthDto)
    await this.UserRepo.update(id,(user))
    return { refreshtoken: CreateAuthDto.refresh_token };
  } catch (error) {
    throw error;
  }
}



  async register(CreateAuthDto:CreateAuthDto) {
    try {
      const {firstname,password,email} = CreateAuthDto
      CreateAuthDto.password = encryptWithAES(CreateAuthDto.password)
      const name = await this.UserRepo.findOneBy({firstname})
      const emm = await this.UserRepo.findOneBy({email})
      if(name || emm){
      throw new BadRequestException(`account already registir`)
      }
      const user = this.UserRepo.create(CreateAuthDto)
      this.UserRepo.save(user)
      return 'bingo'
     } catch (error) {
       throw error;
     }
  }


  async refresh(body) {
    try {
      const token = body.refresh_token
      const refreshtoken = env.REFRESH_TOKEN_SECRET
      const accestoken = env.ACCES_TOKEN_SECRET
      const {id} = jwt.verify(token,refreshtoken)
      const newtoken = jwt.sign({id:id},accestoken,{expiresIn:'1d'})
      return ({newaccestoken:newtoken})
     } catch (error) {
       throw error;
     }
  }


  async remove(id: number) {
    try {
      const user = await this.UserRepo.findOneBy({id:id})
      if(!user){
        throw new HttpException('not found',HttpStatus.NOT_FOUND)
      }
      this.UserRepo.update({id:id},{refresh_token:null})
      return 'bingo'
      } catch (error) {
        throw error
      }
  }


  async findtelegramID(id:string){
    try {
      const find =await this.UserRepo.findOneBy({telegramID:id})
      if(!find){
        throw new BadRequestException('registratsiya qilinmagan')
      }
      return find
    } catch (error) {
      throw error
    } 
  }


  async finsaved(id:any){
    try {
    const telegramid = await this.UserRepo.findOne({where:{telegramID:id}})
    if(!telegramid){
      throw new BadRequestException('telegramid not found')
    }
    const ID:any = telegramid.id
    const find = await this.savedRepo.find({where:{user:{id:ID}},relations:["book"]})
    if(find.length == 0){
      throw new BadRequestException('saved not found')
    } 
    const books = find.map((item) => item.book);
    return books
    } catch (error) {
      throw error
    }
  }


  
}
