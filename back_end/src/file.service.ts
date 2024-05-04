import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import path from 'path';
import * as fs from 'fs';
import * as sharp from 'sharp';

@Injectable()
export class FileService {
  constructor(
    
  ) {}

  isFileImage(file) {
    return file.mimetype.startsWith('image/');
  }

  isFileJpg(file) {
    return file.mimetype === 'image/jpeg';
  }

  async convertToJpg(imageBuffer: Buffer): Promise<Buffer> {
    return sharp(imageBuffer)
      .jpeg()
      .toBuffer();
  }
  
  async getAbsolutePath(relativePath: any): Promise<string> {
    const path = require('path');
    const absolutePath = path.resolve(relativePath);
    return absolutePath;
  }

}