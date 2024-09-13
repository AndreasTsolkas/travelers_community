import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/user/user.service';
import { bcryptSaltOrRounds } from 'src/important';

@Injectable()
export class UtilitiesService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  decodeToken(authorization: string) {
    const token = authorization.replace('Bearer ', '');
    const decodedToken = this.jwtService.decode(token);
    return decodedToken;
  }

  extractField(decodedToken: any, field: any) {
    let extractedField: any = decodedToken?.[field];
    return extractedField;
  }

  prepareUserId(authorization: string) {
    const decodedToken = this.decodeToken(authorization);
    const userId: number = this.extractField(decodedToken, 'id');
    return userId;
  }
}
