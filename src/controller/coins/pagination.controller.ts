import { Controller, Get, Query } from '@nestjs/common';
import { CoinService } from 'src/service/coins/conis.service';
// import { CoinsGateway } from 'src/gateway/coins.gateway';

// http://localhost:3000/coins/pagination?page=1&limit=20
@Controller('coins/pagination')
export class CoinPaginationController {
  constructor(
    private readonly coinService: CoinService,
  ) {}

  @Get() 
  async getCoins(
    @Query('page') page: string, 
    @Query('limit') limit: string
  ) {
    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);
    const coins = await this.coinService.fetchCoins(pageInt, limitInt);  

    console.log('Coins:', coins);  

    return coins;  
  }
}
