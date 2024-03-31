import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, IsNull, Not, Repository, getManager } from 'typeorm';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';


@Injectable()
export class ProfileService {

  constructor(
    private readonly entityManager: EntityManager,
    private readonly userService: UserService,
  ) {}

  async findAll() {
    try {
      return await this.userService.findAll();
    }
    catch(error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }




  async findOne(id: number): Promise<User | null> {
    try {
      return await this.userService.findOne(id, false);
    }
    catch(error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
    
  }

  async findOneWithRelationshipsBySpecificFieldAndValue(field: string, value: any): Promise<User | null> {
    try {
      return await this.userService.findOneWithRelationshipsBySpecificFieldAndValue(field, value, true);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async update(id: number, userData: Partial<User>): Promise<User | null> {
    try {
        return await this.userService.update(id, userData);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await await this.userService.remove(id);
    }
    catch(error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  //

  async checkIfPasswordIsCorrect(id: number, password: string) {
    if(!await this.userService.checkIfPasswordIsCorrect(id, password))
      throw new BadRequestException('The password you sent is not the correct.');
  }

  async updatePassword(id: number, password: string) {
    return await this.userService.updatePassword(id, password);
  }

}


