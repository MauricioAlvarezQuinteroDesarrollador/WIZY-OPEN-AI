import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExchangeRateSerivce } from './externalServices/exchangeRate.service';
import { HttpModule } from '@nestjs/axios';
import { ProductsSerivce } from './externalServices/products.service';
import { OpenAIService } from './externalServices/openAI.services';

@Module({
  imports: [HttpModule,ConfigModule.forRoot(),],
  controllers: [AppController],
  providers: [AppService, ExchangeRateSerivce, ProductsSerivce, OpenAIService],
  
})
export class AppModule {}
