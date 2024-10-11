import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import path from 'path';
import * as fs from 'fs';
import * as sharp from 'sharp';
import { StoreImage } from 'src/enums/store.image.enum';

@Injectable()
export class FileService {
  constructor() {}

  isFileImage(file) {
    return file.mimetype.startsWith('image/');
  }

  isFileJpg(file) {
    return file.mimetype === 'image/jpeg';
  }

  async convertToJpg(imageBuffer: Buffer): Promise<Buffer> {
    return sharp(imageBuffer).jpeg().toBuffer();
  }

  async getAbsolutePath(relativePath: any): Promise<string> {
    const path = require('path');
    const absolutePath = path.resolve(relativePath);
    return absolutePath;
  }

  async setAbsolutePath(parentFolderPath, fileName) {
    const path = require('path');
    return path.join(process.cwd(), parentFolderPath, fileName);
  }

  async storeFile(filePath, file) {
    const buffer = Buffer.from(file.buffer);
    fs.writeFileSync(filePath, buffer);
  }

  async storeImage(number: number, file: any, storeImageCase: any) {
    const fileName = 'img' + number;
    const fileNameWithType = fileName + '.jpg';
    let imageBuffer = file;
    let imageFolder = StoreImage[storeImageCase];

    if (!this.isFileImage(file)) {
      throw new Error('Only images are allowed.');
    }

    if (!this.isFileJpg(file))
      imageBuffer = await this.convertToJpg(file.buffer);

    const imagePath = await this.setAbsolutePath(
      'app_images/' + imageFolder,
      fileNameWithType,
    );
    this.storeFile(imagePath, imageBuffer);

    const savedImagePath = imageFolder + '/' + fileName;
    return savedImagePath;
  }
}
