import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
  import {
    EntityManager,
    FindOptionsSelect,
    IsNull,
    Not,
    Repository,
    getManager,
  } from 'typeorm';
  
  @Injectable()
  export class AnalyticsService {
    constructor(
      @InjectEntityManager()
      private readonly entityManager: EntityManager,
    ) {}


    async performQuery(query: string, parameters:string[]) {
        return await this.entityManager.query(query, parameters);
    }

    async service() {
        return await this.performQuery(`SELECT * FROM "travelers_community"."user" WHERE "user"."country" = $1 AND "user"."nationality" = $2;`, ['United States of America', 'American'])
    }
  
  }
  