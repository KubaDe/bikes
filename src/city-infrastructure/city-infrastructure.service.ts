import * as _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityInfrastructure } from './city-infrastructure.entity';
import { Station } from './station.entity';
import { Bike } from './bike.entity';

type City = Omit<CityInfrastructure, 'id' | 'stations'>;
type Places = Omit<Station, 'id' | 'cityInfrastructure'>[];
type Bikes = Omit<Bike, 'id' | 'cityInfrastructure'>[];

@Injectable()
export class CityInfrastructureService {
  constructor(
    @InjectRepository(CityInfrastructure)
    private cityInfrastructureRepository: Repository<CityInfrastructure>,
    @InjectRepository(Station)
    private stationRepository: Repository<Station>,
    @InjectRepository(Bike)
    private bikeRepository: Repository<Bike>,
  ) {}

  public get(): Promise<CityInfrastructure> {
    return this.cityInfrastructureRepository.findOne({relations: ['stations']});
  }

  public getBikes(cityInfrastructureId: number): Promise<Bikes> {
    return this.bikeRepository.find({cityInfrastructure: {id: cityInfrastructureId}});
  }

  public async clear(): Promise<void> {
    const cityInfrastructureList = await this.cityInfrastructureRepository.find();
    await this.cityInfrastructureRepository.remove(cityInfrastructureList);
    const stationList = await this.stationRepository.find();
    await this.stationRepository.remove(stationList);
    const bikeList = await this.bikeRepository.find();
    await this.bikeRepository.remove(bikeList);
  }

  public async createCity({
    city,
    places,
    bikes,
  }: {
    city: City;
    places: Places;
    bikes: Bikes;
  }): Promise<void> {
    const cityInfrastructure = await this.createInfrastructure(city);
    this.createStations(places, cityInfrastructure);
    this.createBikes(bikes, cityInfrastructure);
  }

  private async createInfrastructure(city: City): Promise<CityInfrastructure> {
    const newCityInfrastructure = new CityInfrastructure();
    Object.entries(city).forEach(([key, value]) => {
      newCityInfrastructure[key] = value;
    });
    const cityInfrastructure = await this.cityInfrastructureRepository.save(
      newCityInfrastructure,
    );
    return cityInfrastructure;
  }

  private async createStations(
    places: Places,
    cityInfrastructure: CityInfrastructure,
  ): Promise<void> {
    const newStationList = places.map(place => {
      const newStation = new Station();
      Object.entries(place).forEach(([key, value]) => {
        newStation[key] = value;
      });
      newStation.cityInfrastructure = cityInfrastructure;
      return newStation;
    });
    await this.stationRepository.save(newStationList);
  }

  private async createBikes(
    bikes: Bikes,
    cityInfrastructure: CityInfrastructure,
  ): Promise<void> {
    const newBikeList = bikes.map(bike => {
      const newBike = new Bike();
      Object.entries(bike).forEach(([key, value]) => {
        newBike[key] = value;
      });
      newBike.cityInfrastructure = cityInfrastructure;
      return newBike;
    });
    await this.bikeRepository.save(newBikeList);
  }

  public async updateCity({
    cityUuid,
    places,
    bikes,
  }: {
    cityUuid: string;
    places: Places;
    bikes: Bikes;
  }): Promise<void> {
    const cityInfrastructure = await this.cityInfrastructureRepository.findOne({
      uuid: cityUuid,
    });
    if (!cityInfrastructure) {
      throw Error('No city infrastructure');
    }

    this.updateBikes(bikes, cityInfrastructure);
    this.updateStations(places, cityInfrastructure);

  }

  private async updateBikes(
    bikes: Bikes,
    cityInfrastructure: CityInfrastructure,
  ): Promise<void> {
    const currentBikes = await this.bikeRepository.find({ select: ['number'] });
    const currentBikesNumbers = currentBikes.map(bike => bike.number);
    const newBikes = bikes.filter(
      bike => !currentBikesNumbers.includes(bike.number),
    );
    const newBikeList = newBikes.map(bike => {
      const newBike = new Bike();
      Object.entries(bike).forEach(([key, value]) => {
        newBike[key] = value;
      });
      newBike.cityInfrastructure = cityInfrastructure;
      return newBike;
    });
    await this.bikeRepository.save(newBikeList);
  }

  private async updateStations(
    stations: Places,
    cityInfrastructure: CityInfrastructure,
  ): Promise<void> {
    const currentStations = await this.stationRepository.find({ select: ['number'] });
    const currentStationsNumbers = currentStations.map(station => station.number);
    const newStations = stations.filter(
      station => !currentStationsNumbers.includes(station.number),
    );
    const newStationList = newStations.map(station => {
      const newStation = new Station();
      Object.entries(station).forEach(([key, value]) => {
        newStation[key] = value;
      });
      newStation.cityInfrastructure = cityInfrastructure;
      return newStation;
    });
    await this.stationRepository.save(newStationList);
  }
}
