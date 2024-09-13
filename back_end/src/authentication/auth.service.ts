import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from 'src/user/user.entity';
import { NewUserDto } from 'src/dto/new.user.dto';
import { UserService } from 'src/user/user.service';
import { bcryptSaltOrRounds } from 'src/important';
import { countryList } from 'src/lists/countries';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email, pass) {
    try {
      const user =
        await this.userService.findOneWithRelationshipsBySpecificFieldAndValue(
          'email',
          email,
          true,
        );
      if (!user) throw new BadRequestException();

      const isValid = await bcrypt.compare(pass, user.password);
      if (isValid) {
        user.isOnline = true;
        await this.userService.update(user.id, user);
        const payload = { id: user.id, email: user.email };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      } else throw new UnauthorizedException();
    } catch (error) {
      console.log(error);
      if (error instanceof BadRequestException)
        throw new BadRequestException(
          'User with the email : ' + email + ' not found.',
        );
      else if (error instanceof UnauthorizedException) {
        let message = 'Password given is incorrect.';
        throw new UnauthorizedException(message);
      } else throw new InternalServerErrorException('Account search failed.');
    }
  }

  async register(newUserDto: NewUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(
      newUserDto.password,
      bcryptSaltOrRounds,
    );
    newUserDto.password = hashedPassword;

    newUserDto.dateSigned = new Date();

    try {
      let newUser: any = await this.userService.create(newUserDto);
      newUser = this.userService.deletePasswordFromRecord(newUser);
      return newUser;
    } catch (error) {
      let message = 'New account creation failed.';
      if (error.code == 23505) {
        message = 'Email given is used by another user.';
        throw new BadRequestException(message);
      }
      throw new InternalServerErrorException(message);
    }
  }

  async signOut(userId: number) {
    try {
      const user = await this.userService.findOne(userId, false);
      if (!user) throw new BadRequestException('User ID provided is not valid.');
      user.isOnline = false;
      await this.userService.update(user.id, user);
      return { message: 'User signed out successfully.' };

    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      console.error('Internal Server Error:', error);
      throw new InternalServerErrorException('Something went wrong. Please try again later.');
    }
  }
}
