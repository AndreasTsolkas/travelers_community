import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
  } from '@nestjs/common';
  import {
    EntityManager,
    FindOptionsSelect,
    IsNull,
    Not,
    Repository,
    getManager,
  } from 'typeorm';
  import { JwtService } from '@nestjs/jwt';
  import * as bcrypt from 'bcrypt';
  import { InjectEntityManager } from '@nestjs/typeorm';
  import { UtilitiesService } from 'src/utilities.service';
  import * as Datetime from 'src/datetime';

  @Injectable()
  export class SuggestionsService {
    constructor(
      @InjectEntityManager()
      private readonly entityManager: EntityManager,
      private readonly utilitiesService: UtilitiesService,
    ) {}

    async getAllSuggestedTravels(limit:number) {
      return await this.utilitiesService.performQuery
      (`SELECT "travel".place, "travel".country, CONCAT("user".first_name, ' ', "user".last_name) AS user_fullname
        FROM travel INNER JOIN "user" ON "travel".user_id = "user".id WHERE suggest_it = $1 LIMIT $2`, 
        [true, limit]);
    }

    async getAllSuggestedPlaces(limit:number) {
      return await this.utilitiesService.performQuery
      (`SELECT place, COUNT(*) AS suggestions FROM travel WHERE suggest_it = $1 GROUP BY place  ORDER BY suggestions DESC LIMIT $2 `, 
        [true, limit]);
    }

    async getAllSuggestedCountries(limit:number) {
      return await this.utilitiesService.performQuery
      (`SELECT country, COUNT(*) AS suggestions FROM travel WHERE suggest_it = $1 GROUP BY country  ORDER BY suggestions DESC LIMIT $2 `, 
        [true, limit]);
    }

    async getAllSuggestionsOfThisYear(limit:number) {
      const currentYear = Datetime.getCurrentYear();
      const startOfYear = Datetime.getStartOfTheYear(currentYear);
      return await this.utilitiesService.performQuery
      (`SELECT "travel".place, "travel".country, CONCAT("user".first_name, ' ', "user".last_name) AS user_fullname
        FROM travel INNER JOIN "user" ON "travel".user_id = "user".id WHERE "travel".suggest_it = $1 
        AND "travel".date_started >= $2  ORDER BY suggestions DESC LIMIT $3`, 
        [true, startOfYear, limit]);
    }


  

  }
  