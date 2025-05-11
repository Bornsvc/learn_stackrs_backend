import { Module } from '@nestjs/common';
import { CoinService } from 'src/service/coins/conis.service';
import { CoinPaginationController } from 'src/controller/coins/pagination.controller';
import { SymbolController } from 'src/controller/coins/search.controller';
// import { CoinsGateway } from 'src/gateway/coins.gateway';

@Module({
  imports: [],
  controllers: [CoinPaginationController, SymbolController],
  providers: [CoinService],  // ประกาศทั้ง CoinService และ CoinsGateway
  // exports: [CoinService, CoinsGateway],  // export เพื่อให้ใช้ในที่อื่น
})
export class CoinModule {}
