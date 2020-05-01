import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { xml2js } from 'xml-js';
import { Injectable, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { isJsonData, JsonData } from './JsonData';

import { CityInfrastructureService } from 'city-infrastructure/city-infrastructure.service';

@Injectable()
export class CollectorService {
  constructor(
    private httpService: HttpService,
    private readonly cityInfrastructureService: CityInfrastructureService,
  ) {}

  public scrap(): Observable<JsonData> {
    return this.httpService.get(process.env.BIKE_SERVICE_URL).pipe(
      map(response => { return response.data; }),
      map(rawData => this.parseRawData(rawData)),
      map(jsonData => {
        if (isJsonData(jsonData)) {
          return jsonData;
        }
        throw new Error();
      }),
    );
  }

  private parseRawData(rawData: string): object {
    const jsonData: object = xml2js(rawData, { compact: true });
    return jsonData;
  }

  public async setupCityInfrastructure(): Promise<void> {
    const currentCityInfrastructure = await this.cityInfrastructureService.get();
    this.scrap()
      .pipe(
        map(async jsonData => {
          const cityJson = jsonData.markers.country.city;
          const city = {
            name: cityJson._attributes.name,
            uuid: cityJson._attributes.uid,
            bounds: cityJson._attributes.bounds,
            lat: cityJson._attributes.lat,
            lng: cityJson._attributes.lng,
            zoom: cityJson._attributes.zoom,
          };

          const places = jsonData.markers.country.city.place.map(placeJson => ({
            uuid: placeJson._attributes.uid,
            name: placeJson._attributes.name,
            lat: placeJson._attributes.lat,
            lng: placeJson._attributes.lng,
            spot: placeJson._attributes.spot,
            number: Number(placeJson._attributes.number),
            placeType: placeJson._attributes.place_type,
            bikeTypes: placeJson._attributes.bike_types,
            bikeRacks: Number(placeJson._attributes.bike_racks),
          }));

          const bikesRepeatable = _.flatMap(
            jsonData.markers.country.city.place,
            place => place.bike,
          );
          const bikesUniq = _.uniqBy(
            bikesRepeatable,
            bike => bike?._attributes.number,
          );
          const bikes = bikesUniq
            .filter(bike => bike)
            .map(bike => ({
              number: Number(bike._attributes.number),
              type: Number(bike._attributes.bike_type),
            }));

          if (currentCityInfrastructure) {
            await this.cityInfrastructureService.updateCity({
              cityUuid: city.uuid,
              places,
              bikes,
            });
          } else {
            await this.cityInfrastructureService.createCity({
              city,
              places,
              bikes,
            });
          }
        }),
      )
      .subscribe({
        error: err => console.error(err),
      });
  }

  public async scrapAndSnap(): Promise<void> {

  }
}
