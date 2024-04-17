import { Body, Controller, Delete, Get, Param, Patch, Put, Query, Req, UseGuards, Headers, BadRequestException, Post  } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ProfileService } from 'src/profile/profile.service';
import { Token } from 'src/token';

@UseGuards(AuthGuard)
@Controller('profile')
export class ProfileController {
  
  constructor(private profileService: ProfileService,
    private readonly token: Token
    ) {

  }

  @Get()
  async findOneWithRelationshipsAndSpecialDetails(@Headers('Authorization') authorization: string) {
    if (!authorization) return { message: 'Unauthorized' };
    const decodedToken =  this.token.decodeToken(authorization);
    const userId: number  =  this.token.extractField(decodedToken, 'id');
    if (userId !== undefined) {
      let basicData = await this.profileService.findOne(userId as number);
      return {
        basicData
      }
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

  
  
}