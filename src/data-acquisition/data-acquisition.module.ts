import { HttpModule, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CollectorService } from './collector/collector.service';
import { SchedulerService } from './scheduler/scheduler.service';

// External modules
import { CityInfrastructureModule } from 'city-infrastructure/city-infrastructure.module'

@Module({
  imports: [
    ScheduleModule.forRoot(),
    HttpModule,
    CityInfrastructureModule,
  ],
  providers: [CollectorService, SchedulerService],
})
export class DataAcquisitionModule {}
