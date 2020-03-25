import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CityInfrastructure } from './city-infrastructure.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CityInfrastructure])],
})
export class CityInfrastructureModule {}
