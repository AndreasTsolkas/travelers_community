import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, FindOptionsSelect, IsNull, Not, Repository, getManager } from 'typeorm';

import { User } from './user.entity';
import {bcryptSaltOrRounds, selectColumns} from "src/important";


@Injectable()
export class UserService {
    constructor(
       private readonly entityManager: EntityManager,
       @InjectRepository(User)
       private userRepository: Repository<User>,
    ) {}

    deletePasswordsFromResultSet(result: any) {
      result.map((item: any) => {
        delete item.password;
      });
      return result;
    }
  
    deletePasswordFromRecord(record: any) {
      delete record.password;
      return record;
    }

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

    async findOneWithRelationshipsBySpecificFieldAndValue(field: string, value: any, findPassword: boolean): Promise<User | null> {
      try {
  
        if (findPassword) {
          selectColumns.push('password');
        }
  
        const where: Record<string, any> = {};
        where[field] = value;
  
        return await this.userRepository.findOne({
          select: selectColumns as FindOptionsSelect<User>,
          where,
        });
      } catch (error) {
        console.error(error);
        throw new InternalServerErrorException();
      }
    }

    async findManyWithRelationshipsBySpecificFieldAndValue(field: string, value: any): Promise<User[] | null> {
      try {
        let result: any = await this.userRepository
          .createQueryBuilder('user')
          .where(`user.${field} = :value`, { value })
          .getMany();
        return result;
      } catch (error) {
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