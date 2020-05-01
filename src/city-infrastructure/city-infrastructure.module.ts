import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CityInfrastructure } from './city-infrastructure.entity';
import { Station } from './station.entity';
import { Bike } from './bike.entity';
import { CityInfrastructureService } from './city-infrastructure.service';
import { CityInfrastructureResolver } from './city-infrastructure.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([CityInfrastructure]),
    TypeOrmModule.forFeature([Station]),
    TypeOrmModule.forFeature([Bike]),
  ],
  providers: [CityInfrastructureService, CityInfrastructureResolver],
  exports: [
    CityInfrastructureService,
    // CityInfrastructureResolver,
    TypeOrmModule.forFeature([CityInfrastructure]),
    TypeOrmModule.forFeature([Station]),
    TypeOrmModule.forFeature([Bike]),
  ],
})
export class CityInfrastructureModule {}
