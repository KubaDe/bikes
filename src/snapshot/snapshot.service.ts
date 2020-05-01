import * as _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Snapshot } from './snapshot.entity';

interface RawSnapshot {

}

@Injectable()
export class SnapshotService {
  constructor(
    @InjectRepository(Snapshot)
    private snapshotRepository: Repository<Snapshot>,
  ) {}

  public async sample(rawSnapshotList: RawSnapshot[]): Promise<void>{

  }


}
