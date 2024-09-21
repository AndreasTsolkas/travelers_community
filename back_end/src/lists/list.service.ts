import { Injectable } from '@nestjs/common';
import { countryList } from 'src/lists/countries';
import { nationalityList } from 'src/lists/nationalities';
import { sexList } from 'src/lists/sexes';
import { suggestionsMethods } from 'src/lists/suggestion.methods';

@Injectable()
export class ListService {
  constructor() {}

  async getAllCountries() {
    return countryList;
  }

  async getAllNationalities() {
    return nationalityList;
  }

  async getAllSexes() {
    return sexList;
  }

  async getAllSuggestionMethods() {
    return suggestionsMethods;
  }
}
