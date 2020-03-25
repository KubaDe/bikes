import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CityInfrastructure } from './city-infrastructure.entity';
import { Station } from './station.entity';
import { Bike } from './bike.entity';
import { CityInfrastructureService } from './city-infrastructure.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CityInfrastructure]),
    TypeOrmModule.forFeature([Station]),
    TypeOrmModule.forFeature([Bike]),
  ],
  providers: [CityInfrastructureService],
  exports: [
    CityInfrastructureService,
    TypeOrmModule.forFeature([CityInfrastructure]),
    TypeOrmModule.forFeature([Station]),
    TypeOrmModule.forFeature([Bike]),
  ],
})
export class CityInfrastructureModule {}
