import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

// import { firstValueFrom } from 'rxjs';

@Injectable()
export class ExchangeRateSerivce {
  url = 'https://api.exchangeratesapi.io/v1';
  constructor(private readonly httpService: HttpService) {}

  async convertCurrency(params) {
    try {
      // No pude probar con el api real porque no tengo key con  openexchangerates y exchangeratesapi toca tener un usuario pago 
      // const response = await firstValueFrom(
      //   this.httpService.get(`${this.url}/convert?access_key=1a6d4422769bef66f92892f88fa676c2&from=GBP&to=JPY&amount=25`),
      // );
      // return response;

      // quemo datos de prueba sin conectarme al api
      return params;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
}
