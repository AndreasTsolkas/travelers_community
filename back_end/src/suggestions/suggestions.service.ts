import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import * as bcrypt from 'bcrypt';
  

  
  @Injectable()
  export class SuggestionsService {
    constructor() {}
  

  }
  