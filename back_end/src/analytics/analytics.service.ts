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
import { databaseSchemaName } from 'src/important';
import * as Datetime from 'src/datetime';
import {AgeGroup} from 'src/enums/age.groups.custom.enum';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async performQuery(query: string, parameters?: any[]) {
    let response = await this.entityManager.query(`SHOW search_path`);
    if (response.search_path !== databaseSchemaName) {
      await this.entityManager.query(
        `SET search_path TO ${databaseSchemaName};`,
      );
    }
    return await this.entityManager.query(query, parameters);
  }

  // Get total numbers

  async getTravelsTotalNum() {
    return await this.performQuery(`SELECT COUNT(*) FROM travel`);
  }

  async getBusinessTravelsTotalNum() {
    return await this.performQuery(
      `SELECT COUNT(*) FROM travel WHERE business_travel=$1`,
      [true],
    );
  }

  async getCurrentYearTravelsTotalNum() {
    const currentYear = Datetime.getCurrentYear();
    const startOfYear = Datetime.getStartOfTheYear(currentYear);

    return await this.performQuery(
      `SELECT COUNT(*) FROM travel WHERE date_started >= $1`,
      [startOfYear],
    );
  }

  async getOngoingTravelsTotalNum() {
    const currentYear = Datetime.getCurrentYear();
    const endOfYear = Datetime.getEndOfTheYear(currentYear);

    return await this.performQuery(
      `SELECT COUNT(*) FROM travel WHERE date_finished >= $1`,
      [endOfYear],
    );
  }

  async getUsersTotalNum() {
    return await this.performQuery(`SELECT COUNT(*) FROM "user"`);
  }

  // Get ranked data

  async getCountriesByMostVisits() {
    return await this.performQuery(
      `SELECT country, COUNT(*) as visits FROM travel GROUP BY country ORDER BY visits DESC`,
    );
  }

  async getCountriesByMostVisitsBySex(sex: string) {
    return await this.performQuery(
      `SELECT travel.country, COUNT(*) as visits 
         FROM travel 
         INNER JOIN "user" ON travel.user_id = "user".id
         WHERE "user".sex = $1
         GROUP BY travel.country 
         ORDER BY visits DESC`,
      [sex],
    );
  }

  async getCountriesByExperienceRate() {
    return await this.performQuery(
      `SELECT country, SUM(experience_rate) as total_rate FROM travel GROUP BY country ORDER BY total_rate DESC`,
    );
  }

  async getCountriesByTotalTimeSpent() {
    return await this.performQuery(
      `SELECT country, SUM(date_finished - date_started) as total_time_spent FROM travel GROUP BY country ORDER BY total_time_spent DESC`,
    );
  }

  async getCountriesByMostTravelSuggestions() {
    return await this.performQuery(
      `SELECT country, COUNT(*) as total_suggestions FROM travel WHERE suggest_it = $1 GROUP BY country ORDER BY total_suggestions DESC`,
      [true],
    );
  }

  async getUserNationalitiesByMostTravels() {
    return await this.performQuery(
      `SELECT "user".nationality, COUNT(*) as total_travels FROM "user" INNER JOIN "travel" ON "user".id = "travel".user_id GROUP BY "user".nationality ORDER BY total_travels DESC`,
    );
  }

  async getUserSexesByMostTravels() {
    return await this.performQuery(
      `SELECT "user".sex, COUNT(*) as total_travels FROM "user" INNER JOIN "travel" ON "user".id = "travel".user_id GROUP BY "user".sex ORDER BY total_travels DESC`,
    );
  }

  async getUsersByMostTravels() {
    return await this.performQuery(
      `SELECT "user".id, "user".first_name, "user".last_name, COUNT(*) as total_travels FROM "user" INNER JOIN "travel" ON "user".id = "travel".user_id GROUP BY "user".id ORDER BY total_travels DESC`,
    );
  }

  async getUsersByMostSuccessfulTravels() {
    return await this.performQuery(
      `SELECT "user".id, "user".first_name, "user".last_name, SUM(experience_rate) as total_exeprience_rate FROM "user" INNER JOIN "travel" ON "user".id = "travel".user_id GROUP BY "user".id ORDER BY total_exeprience_rate DESC`,
    );
  }

  async getUsersByMostBusinessTravels() {
    return await this.performQuery(
      `SELECT "user".id, "user".first_name, "user".last_name, COUNT(*) as total_business_travels FROM "user" INNER JOIN "travel" ON "user".id = "travel".user_id WHERE "user".business_travel = $1 GROUP BY "user".id ORDER BY total_business_travels DESC`,
      [true],
    );
  }

  async getUsersByMostCountriesVisited() {
    return await this.performQuery(
      `SELECT "user".id, "user".first_name, "user".last_name, COUNT(DISTINCT "travel".country) as total_countries_visited FROM "user" INNER JOIN "travel" ON "user".id = "travel".user_id GROUP BY "user".id ORDER BY total_countries_visited DESC`,
    );
  }

  async getCountriesByMostVisitsOnASpecificYear(year: any) {
    const startOfYear = Datetime.getStartOfTheYear(year);
    const endOfYear = Datetime.getEndOfTheYear(year);
    return await this.performQuery(
      `SELECT country, COUNT(*) as total_visits_on_year FROM "travel" WHERE "travel".date_started >= $1 AND "travel".date_finished<= $2 GROUP BY country ORDER BY total_visits_on_year DESC`,
      [startOfYear, endOfYear],
    );
  }

  async getCountriesByMostVisitsOnASpecificNationality(nationality: any) {
    return await this.performQuery(
      `SELECT "travel".country, COUNT(*) as total_visits_by_nationality FROM "travel" INNER JOIN "user" ON "travel".user_id = "user".id WHERE "user".nationality = $1 GROUP BY "travel".country ORDER BY total_visits_by_nationality DESC`,
      [nationality],
    );
  }

  async getTravelsNumByAgeGroup(ageGroup: { min: number; max: number }) {
    return this.performQuery(
      `SELECT 
          (SELECT COUNT(*) FROM "user" WHERE "user".age >= $1 AND "user".age <= $2) AS population,
          COUNT(DISTINCT "user".id) AS travels
       FROM "travel"
       INNER JOIN "user" ON "travel".user_id = "user".id
       WHERE "user".age >= $1 AND "user".age <= $2`,
      [ageGroup.min, ageGroup.max]
    );
  }

  async getTravelsNumForAllAgeGroups() {

    const ageGroups = [
      { label: 'young', group: AgeGroup.YOUNG },
      { label: 'youngAdult', group: AgeGroup.YOUNG_ADULT },
      { label: 'adult', group: AgeGroup.ADULT },
      { label: 'middleAged', group: AgeGroup.MIDDLE_AGED },
      { label: 'matureAdult', group: AgeGroup.MATURE_ADULT },
      { label: 'old', group: AgeGroup.OLD },
    ];
  
    const results = await Promise.all(
      ageGroups.map(({ label, group }) =>
        this.getTravelsNumByAgeGroup(group).then((result) => ({ [label]: result }))
      )
    );
  
    return Object.assign({}, ...results);
  }

  async getOnlineNowUsersNum() {
    return await this.performQuery(
      `SELECT COUNT(*) as users_online_num FROM "user" WHERE is_online ORDER BY users_online_num DESC`,
    );
  }

  async getOnlineNowUsers() {
    return await this.performQuery(
      `SELECT "user".id,  "user".first_name, "user".last_name FROM "user" WHERE is_online`,
    );
  }

}
