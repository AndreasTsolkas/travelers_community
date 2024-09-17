import { Module } from '@nestjs/common';
import { MyAnalyticsService } from 'src/myanalytics/myanalytics.service';
import { UtilitiesService } from 'src/utilities.service';
import { MyAnalyticsController } from 'src/myanalytics/myanalytics.controller';
import { UserModule } from 'src/user/user.module';
import { AnalyticsModule } from 'src/analytics/analytics.module';

@Module({
  imports: [
    UserModule, AnalyticsModule
  ],
  providers: [MyAnalyticsService, UtilitiesService],
  controllers: [MyAnalyticsController],
  exports: [MyAnalyticsService],
})
export class MyAnalyticsModule {}
