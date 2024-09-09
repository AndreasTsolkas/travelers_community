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
  import {databaseSchemaName} from 'src/important';
  
  @Injectable()
  export class AnalyticsService {
    constructor(
      @InjectEntityManager()
      private readonly entityManager: EntityManager,
    ) {}


    async performQuery(query: string, parameters?:any[]) {
        let response = await this.entityManager.query(`SHOW search_path`);
        if(response.search_path!==databaseSchemaName) {
            await this.entityManager.query(`SET search_path TO ${databaseSchemaName};`);
        }
        return await this.entityManager.query(query, parameters);
    }
    
    async getTravelsTotalNum() {
      return await this.performQuery(`SELECT COUNT(*) FROM travel`);
    }

    async getBusinessTravelsTotalNum() {
      return await this.performQuery(`SELECT COUNT(*) FROM travel WHERE business_travel=$1`,[true]);
    }

    async getCurrentYearTravelsTotalNum() {
      const currentYear = new Date().getFullYear();
      const startOfYear = `${currentYear}-01-01 00:00:00`;
    
      return await this.performQuery(
        `SELECT COUNT(*) FROM travel WHERE date_started >= $1`,
        [startOfYear]
      );
    }

    async getOngoingTravelsTotalNum() {
      const currentYear = new Date().getFullYear();
      const endOfYear = `${currentYear}-12-31 23:59:59`;
    
      return await this.performQuery(
        `SELECT COUNT(*) FROM travel WHERE date_finished >= $1`,
        [endOfYear]
      );
    }

    async getUsersTotalNum() {
      return await this.performQuery(`SELECT COUNT(*) FROM "user"`);
    }
  
  }
  