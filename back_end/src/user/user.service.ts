import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, FindOptionsSelect, IsNull, Not, Repository, getManager } from 'typeorm';

import { User } from './user.entity';


@Injectable()
export class UserService {
    constructor(
       private readonly entityManager: EntityManager,
       @InjectRepository(User)
       private userRepository: Repository<User>,
    ) {}

    async findAll(): Promise<User[]> {
        try {
          return await this.userRepository.find();
        }
        catch(error) {
          console.log(error);
          throw new InternalServerErrorException();
        }
    }

    async findOne(id: any): Promise<User | null> {
        try {
          return await this.userRepository.findOneBy({ id });
        }
        catch(error) {
          console.log(error);
          throw new InternalServerErrorException();
        }
    }

    async update(id: number, userData: Partial<User>): Promise<User | null> {
        try {
          const user = await this.userRepository.findOne({ where: { id } });
          if (!user) {
            return null; 
          }
          Object.assign(user, userData);
          return await this.userRepository.save(user);
        }
        catch(error) {
          console.log(error);
          throw new InternalServerErrorException();
        }
    }

    async create(userData: Partial<User>): Promise<User> {
        try {
          const newUser = await this.userRepository.create(userData);
          return await this.userRepository.save(newUser);
        }
        catch(error) {
          console.log(error);
          throw new InternalServerErrorException();
        }
    }

    async remove(id: number, transactionalEntityManager?: EntityManager) {
        try {
          if(transactionalEntityManager)
            return await transactionalEntityManager.delete(User, id);
          return await this.userRepository.delete(id);
          
        } catch (error) {
          console.error(error);
          throw new InternalServerErrorException();
        }
    }
}