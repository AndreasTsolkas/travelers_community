import { Module } from '@nestjs/common';
import { SuggestionsService } from './suggestions.service';
import { UtilitiesService } from 'src/utilities.service';
import { SuggestionsController} from './suggestions.controller';

@Module({
  imports: [],
  providers: [SuggestionsService, UtilitiesService],
  controllers: [SuggestionsController],
  exports: [SuggestionsService],
})
export class SuggestionsModule {}
