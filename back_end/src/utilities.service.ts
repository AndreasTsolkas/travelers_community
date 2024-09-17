import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/user/user.service';
import { bcryptSaltOrRounds, databaseSchemaName } from 'src/important';

@Injectable()
export class UtilitiesService {
  entityManager: any;
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

  async performQuery(query: string, parameters?: any[]) {
    let response = await this.entityManager.query(`SHOW search_path`);
    if (response.search_path !== databaseSchemaName) {
      await this.entityManager.query(
        `SET search_path TO ${databaseSchemaName};`,
      );
    }
    return await this.entityManager.query(query, parameters);
  }
}
