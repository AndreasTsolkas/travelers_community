import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, FindOptionsSelect, IsNull, Not, Repository, getManager } from 'typeorm';


@Injectable()
export class BookService {

}