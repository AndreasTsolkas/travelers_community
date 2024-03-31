import { Body, Controller, Delete, Get, Param, Patch, Put, Req, UseGuards } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth.guard';

/*@UseGuards(AuthGuard)*/
@Controller('user')
export class UserController {
  
  constructor(private userService: UserService) {

  }

  @Get('/all')
  async findAll() {
    return await this.userService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: any) {
    return await this.userService.findOne(id, false);
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() userData: Partial<User>) {
    return this.userService.update(id, userData);
  }

  @Put()
  async create(@Body() userData: Partial<User>) {
    return this.userService.create(userData);
  }
  
}