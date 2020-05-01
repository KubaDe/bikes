import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Snapshot } from './snapshot.entity';
import { SnapshotService } from './snapshot.service';
import { CityInfrastructureModule } from '../city-infrastructure/city-infrastructure.module';

@Module({
  imports: [TypeOrmModule.forFeature([Snapshot]), CityInfrastructureModule],
  providers: [SnapshotService],
})
export class SnapshotModule {}
