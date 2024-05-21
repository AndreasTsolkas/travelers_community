import { Body, Controller, Delete, Get, Param, Patch, Put, Query, Req, UseGuards, Headers, BadRequestException, Post, Res, NotFoundException, UseInterceptors, UploadedFile  } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from 'src/auth.guard';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ProfileService } from 'src/profile/profile.service';
import { TokenService } from 'src/token.service';
import { FileInterceptor } from '@nestjs/platform-express';

/*@UseGuards(AuthGuard)*/
@Controller('profile')
export class ProfileController {
  
  constructor(private profileService: ProfileService,
    private readonly tokenService: TokenService
    ) {

  }
  

  prepareUserId(authorization: string) {
    const decodedToken =  this.tokenService.decodeToken(authorization);
    const userId: number  =  this.tokenService.extractField(decodedToken, 'id');
    return userId;
  }

  @Get()
  async findOneWithRelationshipsAndSpecialDetails(@Headers('Authorization') authorization: string) {
    if (!authorization) return { message: 'Unauthorized' };
    const userId: number = this.prepareUserId(authorization);
    if (userId !== undefined) {
      return await this.profileService.findOne(userId as number);
    }
    else throw new BadRequestException('User id is missing.');
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() employeeData: Partial<User>) {
    return this.profileService.update(id, employeeData);
  }

  @Delete('/:id')
  async remove(@Param('id') id: number) {
    return this.profileService.remove(id);
  }

  @Post('/checkpassword/:id')
  async checkIfPasswordIsCorrect(@Param('id') id: number, @Body('password') password: string) {
    return await this.profileService.checkIfPasswordIsCorrect(id, password);
  }

  @Patch('/updatepassword/:id')
  async updatePassword(@Param('id') id: number, @Body('newpassword') password: string) {
    return await this.profileService.updatePassword(id, password);
  }

  @Get('/avatar')
  async getAvatar(@Res() res: Response) {
    /*if (!authorization) return { message: 'Unauthorized' };
    const userId: number = this.prepareUserId(authorization);*/
    const userId = 1;
    const filePath: string = await this.profileService.getAvatarFilePath(userId);
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

}