import { Observable } from 'rxjs';
import {AxiosResponse} from 'axios'
import { Injectable, HttpService } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CollectorService {
  constructor(private httpService: HttpService) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron() {

  }

  findAll(): Observable<AxiosResponse<any>> {
    return this.httpService.get(process.env.BIKE_SERVICE_URL);
  }
}
