import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, FindOptionsSelect, IsNull, Not, Repository, getManager } from 'typeorm';

import { Travel } from './travel.entity';


@Injectable()
export class TravelService {
    constructor(
       private readonly entityManager: EntityManager,
       @InjectRepository(Travel)
       private travelRepository: Repository<Travel>,
    ) {}


    async findAll(): Promise<Travel[]> {
        try {
          let result = await this.travelRepository.find();
          return result;
        }
        catch(error) {
          console.log(error);
          throw new InternalServerErrorException();
        }
    }

    async findOne(id: number) {
      try {
        return await this.travelRepository.findOne({where: { id } 
        });
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }

    async findOneWithRelationshipsBySpecificFieldAndValue(field: string, value: any): Promise<Travel | null> {
      try {
  
        const where: Record<string, any> = {};
        where[field] = value;
  
        return await this.travelRepository.findOne({
          where
        });
      } catch (error) {
        console.error(error);
        throw new InternalServerErrorException();
      }
    }

    async findManyWithRelationshipsBySpecificFieldAndValue(field: string, value: any): Promise<Travel[] | null> {
      try {
        let result: any = await this.travelRepository
          .createQueryBuilder('travel')
          .where(`user.${field} = :value`, { value })
          .getMany();
        return result;
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }

    async update(id: number, travelData: Partial<Travel>): Promise<Travel | null> {
        try {
          const travel = await this.travelRepository.findOne({ where: { id } });
          if (!travel) {
            return null; 
          }
          Object.assign(travel, travelData);
          return await this.travelRepository.save(travel);
        }
        catch(error) {
          console.log(error);
          throw new InternalServerErrorException();
        }
    }

    async create(travelData: Partial<Travel>): Promise<Travel> {
        try {
          const newTravel = await this.travelRepository.create(travelData);
          return await this.travelRepository.save(newTravel);
        }
        catch(error) {
          console.log(error);
          throw new InternalServerErrorException();
        }
    }

    async remove(id: number, transactionalEntityManager?: EntityManager) {
        try {
          if(transactionalEntityManager)
            return await transactionalEntityManager.delete(Travel, id);
          return await this.travelRepository.delete(id);
          
        } catch (error) {
          console.error(error);
          throw new InternalServerErrorException();
        }
    }
}