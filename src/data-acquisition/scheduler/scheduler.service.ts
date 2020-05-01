import { Injectable, HttpService } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CollectorService } from '../collector/collector.service'

@Injectable()
export class SchedulerService {
  constructor(private collectorService: CollectorService) {
    collectorService.setupCityInfrastructure()
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron() {
    this.collectorService.scrapAndSnap()
  }
}
