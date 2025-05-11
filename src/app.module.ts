import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

//coins
import { CoinModule } from './modules/coins/conis.module';
import { CoinPaginationController } from "src/controller/coins/pagination.controller";
import { SymbolController } from "src/controller/coins/search.controller";
import {  CoinService } from "./service/coins/conis.service";

// import { GateCoinModule } from './gateway/gateCoins.module';



@Module({
    imports: [CoinModule],
    controllers: [AppController, CoinPaginationController, SymbolController],
    providers: [AppService, CoinService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply()
        .exclude('/socket.io/(.*)')
        .forRoutes('*');
    }
}
