import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, FindOptionsSelect, IsNull, Not, Repository, getManager } from 'typeorm';

import { Book } from './book.entity';


@Injectable()
export class BookService {
    constructor(
       private readonly entityManager: EntityManager,
       @InjectRepository(Book)
       private bookRepository: Repository<Book>,
    ) {}

    async findAll(): Promise<Book[]> {
        try {
          return await this.bookRepository.find();
        }
        catch(error) {
          console.log(error);
          throw new InternalServerErrorException();
        }
    }

    async findOne(id: any): Promise<Book | null> {
        try {
          return await this.bookRepository.findOneBy({ id });
        }
        catch(error) {
          console.log(error);
          throw new InternalServerErrorException();
        }
    }

    async update(id: number, bookData: Partial<Book>): Promise<Book | null> {
        try {
          const book = await this.bookRepository.findOne({ where: { id } });
          if (!book) {
            return null; 
          }
          Object.assign(book, bookData);
          return await this.bookRepository.save(book);
        }
        catch(error) {
          console.log(error);
          throw new InternalServerErrorException();
        }
    }

    async create(bookData: Partial<Book>): Promise<Book> {
        try {
          const newBook = await this.bookRepository.create(bookData);
          return await this.bookRepository.save(newBook);
        }
        catch(error) {
          console.log(error);
          throw new InternalServerErrorException();
        }
    }

    async remove(id: number, transactionalEntityManager?: EntityManager) {
        try {
          if(transactionalEntityManager)
            return await transactionalEntityManager.delete(Book, id);
          return await this.bookRepository.delete(id);
          
        } catch (error) {
          console.error(error);
          throw new InternalServerErrorException();
        }
    }
}