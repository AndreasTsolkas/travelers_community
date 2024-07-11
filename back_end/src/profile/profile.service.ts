import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, IsNull, Not, Repository, getManager } from 'typeorm';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { TravelService } from 'src/travel/travel.service';
import { FileService } from 'src/file/file.service';
import path from 'path';
import * as fs from 'fs';
import * as sharp from 'sharp';
import {countryList} from "src/lists/countries";
import {nationalityList} from "src/lists/nationalities";
import {sexList} from "src/lists/sexes";
import { Travel } from 'src/travel/travel.entity';


@Injectable()
export class ProfileService {

  constructor(
    private readonly entityManager: EntityManager,
    private readonly userService: UserService,
    private readonly travelService: TravelService,
    private readonly fileService: FileService,
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


  async getAvatarRelativeFilePath(userId: number): Promise<string | undefined> {

    let result = 'app_images/user_avatars/default.jpg';
    const user = await this.userService.findOne(userId, false);
    if(user)
      result = 'app_images/'+user?.avatarFilepath+'.jpg';
    return result;
  }

  async getAvatarAbsolutePath(filePath: any): Promise<string> {
    const absolutePath = this.fileService.getAbsolutePath(filePath);
    return absolutePath;
  }

  async getAvatarFilePath(userId: any): Promise<string> {
    const relativeFilePath = await this.getAvatarRelativeFilePath(userId);
    if (!relativeFilePath) 
      throw new NotFoundException('Avatar not found.');
    const absolutePath: string = await this.getAvatarAbsolutePath(relativeFilePath);
    return absolutePath;
  }

  async storeAvatar(userId: any, file: any) {
    let savedImagePath = await this.fileService.storeImage(userId, file, 'avatar');
    await this.userService.update(userId, {avatarFilepath: savedImagePath});
  }

  async findMyTravels(userId: any) {
    return this.travelService.findManyWithRelationshipsBySpecificFieldAndValue('user_id',userId);
  }


  async createNewTravel(userId: any, travelData: Partial<Travel>) {
    travelData.user = await this.userService.findOne(userId,false);
    travelData.dateStarted = new Date(travelData.dateStarted);
    travelData.dateFinished = new Date(travelData.dateFinished);
    return await this.travelService.create(travelData);
  }



  


}


