import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, IsNull, Not, Repository, getManager } from 'typeorm';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { HasReadService } from 'src/has_read/has_read.service';
import { FileService } from 'src/file/file.service';
import path from 'path';
import * as fs from 'fs';
import * as sharp from 'sharp';


@Injectable()
export class ProfileService {

  constructor(
    private readonly entityManager: EntityManager,
    private readonly userService: UserService,
    private readonly hasReadService: HasReadService,
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

  async findMyReads(userId: any) {
    return this.hasReadService.findAllByUser(userId);
  }

  async getAvatarRelativeFilePath(userId: number): Promise<string | undefined> {
    const user = await this.userService.findOne(userId, false);
    return user?.avatarFilepath;
  }

  async getAvatarAbsolutePath(filePath: any): Promise<string> {
    filePath = 'app_images/'+filePath+'.jpg';
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



  


}


