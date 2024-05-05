import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';

import { User } from "src/user/user.entity";
import { NewUserDto } from 'src/dto/new.user.dto';
import { UserService } from "src/user/user.service";
import { ProfileService } from "src/profile/profile.service";
import {bcryptSaltOrRounds} from "src/important";


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private jwtService: JwtService
  ) {}

  async signIn(username, pass) { 
    try {
      const user = await this.userService.findOneWithRelationshipsBySpecificFieldAndValue("username",username, true);
      if (!user) 
        throw new BadRequestException;
  

      const isValid =  await bcrypt.compare(pass, user.password);
      if(isValid) {
        const payload = { id: user.id, username: user.username };
        return {
          access_token: await this.jwtService.signAsync(payload)
        };
      }
      else throw new UnauthorizedException;
    }
    catch (error) {
      console.log(error);
      if(error instanceof BadRequestException)
        throw new BadRequestException('User with the username : '+username+' not found.');
      else if(error instanceof UnauthorizedException) {
        let message = 'Password given is incorrect.';
        throw new UnauthorizedException(message);
      }
      else throw new InternalServerErrorException('Account search failed.');
    }
  }

  async register(file: any, newUserDto: NewUserDto): Promise<User> {

    const hashedPassword = await bcrypt.hash(newUserDto.password,bcryptSaltOrRounds);
    newUserDto.password = hashedPassword;

    try{
      let newUser: any = await this.userService.create(newUserDto);
      newUser = this.userService.deletePasswordFromRecord(newUser);
      await this.profileService.storeImage(newUser.id,file);
      return newUser;
    } 
    catch(error) {
      let message = "New account creation failed.";
      if(error.code==23505) {
        message= "Username given is used by another user.";
        throw new BadRequestException(message);
      }
      throw new InternalServerErrorException(message);
    }
  }

}