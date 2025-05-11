import { Controller, Get, Param } from "@nestjs/common";
import { CoinService } from "src/service/coins/conis.service";

// http://localhost:3000/search/symbol/₿
@Controller('search/symbol')
export class SymbolController {
    constructor (private readonly coinService: CoinService) {}

    @Get(':Symbol')
    async getBysymbol(@Param('Symbol') symbol: string) {
        return await this.coinService.fetchCoinsBySymbol(symbol);
    }

}