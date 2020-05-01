import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { CityInfrastructure } from './city-infrastructure.entity';
import { Bike } from './bike.entity';
import { CityInfrastructureService } from './city-infrastructure.service';

@Resolver(of => CityInfrastructure)
export class CityInfrastructureResolver {
  constructor(private cityInfrastructureService: CityInfrastructureService) {}

  @Query(returns => CityInfrastructure)
  async cityInfrastructure() {
    return this.cityInfrastructureService.get();
  }

  @Query(returns => [Bike])
  async bikes(
    @Args('cityInfrastructureId', { type: () => Int })
    cityInfrastructureId: number,
  ) {
    return this.cityInfrastructureService.getBikes(cityInfrastructureId);
  }
}
