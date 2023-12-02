import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Request } from 'express';
  import * as jwt from 'jsonwebtoken'
import { env } from '../config/env.config';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
  
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException('token yoq');
      }
      try {
        const refreshtoken = env.REFRESH_TOKEN_SECRET
        const payload = jwt.verify(token,refreshtoken);
        request.user = payload;
      } catch {
        throw new UnauthorizedException('token mos emas');
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }