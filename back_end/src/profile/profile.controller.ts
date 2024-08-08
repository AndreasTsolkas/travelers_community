import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
  Query,
  Req,
  UseGuards,
  Headers,
  BadRequestException,
  Post,
  Res,
  NotFoundException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from 'src/auth.guard';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ProfileService } from 'src/profile/profile.service';
import { TokenService } from 'src/token.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Travel } from 'src/travel/travel.entity';

/*@UseGuards(AuthGuard)*/
@Controller('profile')
export class ProfileController {
  constructor(
    private profileService: ProfileService,
    private readonly tokenService: TokenService,
  ) {}

  prepareUserId(authorization: string) {
    const decodedToken = this.tokenService.decodeToken(authorization);
    const userId: number = this.tokenService.extractField(decodedToken, 'id');
    return userId;
  }

  @Get()
  async findOneWithRelationshipsAndSpecialDetails(
    @Headers('Authorization') authorization: string,
  ) {
    if (!authorization) return { message: 'Unauthorized' };
    const userId: number = this.prepareUserId(authorization);
    if (userId !== undefined) {
      return await this.profileService.findOne(userId as number);
    } else throw new BadRequestException('User id is missing.');
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() employeeData: Partial<User>) {
    return this.profileService.update(id, employeeData);
  }

  @Delete('/:id')
  async remove(@Param('id') id: number) {
    return this.profileService.remove(id);
  }

  @Post('/checkpassword')
  async checkIfPasswordIsCorrect(
    @Headers('Authorization') authorization: string,
    @Body('password') password: string,
  ) {
    if (!authorization) return { message: 'Unauthorized' };
    const userId: number = this.prepareUserId(authorization);
    return await this.profileService.checkIfPasswordIsCorrect(userId, password);
  }

  @Patch('/update/password')
  async updatePassword(
    @Headers('Authorization') authorization: string,
    @Body('newpassword') password: string,
  ) {
    if (!authorization) return { message: 'Unauthorized' };
    const userId: number = this.prepareUserId(authorization);
    console.log(userId);
    return await this.profileService.updatePassword(userId, password);
  }

  @Get('/avatar')
  async getAvatar(@Res() res: Response) {
    /*if (!authorization) return { message: 'Unauthorized' };
    const userId: number = this.prepareUserId(authorization);*/
    const userId = 2;
    const filePath: string =
      await this.profileService.getAvatarFilePath(userId);
    return res.sendFile(filePath);
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('image'))
  async storeAvatar(@UploadedFile() file) {
    /*if (!authorization) return { message: 'Unauthorized' };
    const userId: number = this.prepareUserId(authorization);*/
    const userId = 1;
    await this.profileService.storeAvatar(userId, file);
  }

  @Get('/mytravels')
  async getMyTravels(@Headers('Authorization') authorization: string) {
    if (!authorization) return { message: 'Unauthorized' };
    const userId: number = this.prepareUserId(authorization);
    return this.profileService.findMyTravels(userId);
  }

  @Put('/newtravel')
  async createNewTravel(
    @Headers('Authorization') authorization: string,
    @Body() travelData: Partial<Travel>,
  ) {
    if (!authorization) return { message: 'Unauthorized' };
    const userId: number = this.prepareUserId(authorization);
    return this.profileService.createNewTravel(userId, travelData);
  }
}
