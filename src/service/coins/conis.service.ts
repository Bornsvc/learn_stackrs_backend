import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';

// import { CoinsGateway } from 'src/gateway/coins.gateway';
@Injectable()
export class CoinService {
  private readonly logger = new Logger(CoinService.name);
  private readonly API_KEY = 'b0dab415-9d37-486d-aa15-e79003e47f9b';
  private readonly BASE_URL = 'https://api.livecoinwatch.com/coins/list';

  
  // constructor(private readonly coinsGateway: CoinsGateway) {
  //   this.scheduleCoinFetching();
  // }

  constructor() {
    this.scheduleCoinFetching()
  }

  scheduleCoinFetching() {
    const page = 1;
    const limit = 5;
    const symbol = '₿';
    setInterval(() => {
      this.fetchCoins(page, limit);
      this.fetchCoinsBySymbol(symbol);
    }, 10000)
  }

  async fetchCoins(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;
    try { 
            const response = await axios.post( this.BASE_URL, {
                currency: 'USD',
                sort: 'rank',
                order: 'ascending',
                offset: offset,
                limit: limit,
                meta: true,
              },
              {
                headers: {
                  'content-type': 'application/json',
                  'x-api-key': this.API_KEY,
                },
              },
            );
            const Coins = response.data.map((coin) => {
              const {
                  name,
                  symbol,
                  png32,
                  png64,
                  webp32,
                  webp64,
                  markets,
                  allTimeHighUSD,
                  code,
                  rate,
                  volume,
                  delta,
              } = coin;
              return {
                  name,
                  symbol,
                  png32,
                  png64,
                  webp32,
                  webp64,
                  markets,
                  allTimeHighUSD,
                  code,
                  rate,
                  volume,
                  delta,
              }
            })
            fs.writeFileSync('Coins.json', JSON.stringify(Coins, null, 2), "utf-8");
            // this.coinsGateway.sendCryptoUpdates(Coins);
            return Coins;
    } catch (error) {
      this.logger.error('Error fetching data from API:', error);
      throw error;
    }
  }

  async fetchCoinsBySymbol (Symbol: string) {
    try {
      const response = await axios.post(this.BASE_URL , {
        currency: 'USD',
        sort: 'rank',
        order: 'ascending',
        offset: 0,
        limit: 10,
        meta: true,
      },{
          headers: {
            'content-type': 'application/json',
            'x-api-key': this.API_KEY,
          }
        } 
      )
      const matched = response.data.find((coin) => coin.symbol === Symbol); // can change to be code
      if (!matched) {
        throw new NotFoundException(`Coin with symbol "${Symbol}" not found`);
      }
      
      const {
        name,
        symbol,
        png32,
        png64,
        webp32,
        webp64,
        markets,
        allTimeHighUSD,
        code,
        rate,
        volume,
        delta,
      } = matched;
      fs.writeFileSync('CoinsBysymbol.json', JSON.stringify(matched, null, 2), "utf-8");
      return {
        name,
        symbol,
        png32,
        png64,
        webp32,
        webp64,
        markets,
        allTimeHighUSD,
        code,
        rate,
        volume,
        delta,
      };
    } catch(error) {
      this.logger.error('Error fetching coin by symbol:', error.meassage);
      throw error;
    }
  }
}
