import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { databaseSchemaName } from 'src/important';

@Injectable()
export class DatabaseInitService implements OnModuleInit {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  async onModuleInit() {
    try {
      await this.entityManager.query(`SET search_path TO ${databaseSchemaName};`);
      console.log('Search path set to:', databaseSchemaName);
      const response = await this.entityManager.query(`SHOW search_path;`);
      console.log(response);
    } catch (error) {
      console.error('Failed to set search path:', error);
    }
  }
}