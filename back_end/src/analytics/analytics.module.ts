import { Module } from '@nestjs/common';
import { AnalyticsService } from 'src/analytics/analytics.service';
import { UtilitiesService } from 'src/utilities.service';
import { AnalyticsController } from 'src/analytics/analytics.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
  ],
  providers: [AnalyticsService, UtilitiesService],
  controllers: [AnalyticsController],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
