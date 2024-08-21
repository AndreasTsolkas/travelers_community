import { Module } from '@nestjs/common';
import { AnalyticsService } from 'src/analytics/analytics.service';
import { AnalyticsController } from 'src/analytics/analytics.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
  ],
  providers: [AnalyticsService],
  controllers: [AnalyticsController],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
