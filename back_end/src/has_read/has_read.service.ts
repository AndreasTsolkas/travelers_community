import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, FindOptionsSelect, IsNull, Not, Repository, getManager } from 'typeorm';
import { HasRead } from 'src/has_read/has_read.entity';


@Injectable()
export class HasReadService {

  constructor(
    private readonly entityManager: EntityManager,
    @InjectRepository(HasRead)
    private hasReadRepository: Repository<HasRead>,
    
  ) {}


  async findAllWithRelationships() {
    try {

      return await this.hasReadRepository.find({
        relations: ['user','book']});
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async findManyWithRelationshipsBySpecificFieldAndValue(field: string, value: any): Promise<HasRead[] | null> {
    try {
      let result: any = await this.hasReadRepository
        .createQueryBuilder('has_read')
        .leftJoinAndSelect('has_read.user_id', 'user')
        .leftJoinAndSelect('has_read.book_id', 'book')
        .where(`has_read.${field} = :value`, { value })
        .getMany();
      return result;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }



  async findOneWithRelationships(id: number) {
    try {
      return await this.hasReadRepository.findOne({
        relations: ['user','book'],
        where: { id } 
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async findOneWithRelationshipsBySpecificFieldAndValue(field: string, value: any): Promise<HasRead | null> {
    try {

      const where: Record<string, any> = {};
      where[field] = value;

      return await this.hasReadRepository.findOne({
        relations: ['user','book'],
        where,
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  async update(id: number, hasReadData: Partial<HasRead>, transactionalEntityManager?: EntityManager): Promise<HasRead | null> {
    try { 

        const hasRead = await this.findOneWithRelationships(id);
  
        if (!hasRead) 
          return null;
  
        Object.assign(hasRead, hasReadData);
  
        if (transactionalEntityManager) {
          await transactionalEntityManager
            .createQueryBuilder()
            .update(HasRead)
            .set(hasReadData)
            .where('id = :id', { id })
            .execute();

        } 
        else await this.hasReadRepository.save(hasRead);
        
        return hasRead;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async create(hasReadData: Partial<HasRead> ): Promise<HasRead> {
    try {
      let newHasRead: any = await this.hasReadRepository.create(hasReadData);
      await this.hasReadRepository.save(newHasRead);
      return newHasRead;
    }
    catch(error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number, transactionalEntityManager?: EntityManager) {
    try {
      if(transactionalEntityManager)
        return await transactionalEntityManager.delete(HasRead, id);
      return await this.hasReadRepository.delete(id);
      
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

}




