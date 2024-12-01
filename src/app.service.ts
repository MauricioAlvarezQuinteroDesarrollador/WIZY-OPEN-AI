import { Injectable } from '@nestjs/common';
import { ExchangeRateSerivce } from './externalServices/exchangeRate.service';
import { ProductsSerivce } from './externalServices/products.service';
import { OpenAIService } from './externalServices/openAI.services';
import { Question } from './entities/question.entity';

@Injectable()
export class AppService {
  constructor(
    private readonly exchangeRateSerivce: ExchangeRateSerivce,
    private readonly productsSerivce: ProductsSerivce,
    private readonly openAISerivce: OpenAIService,
   
  ) {}

  async getResponseQuestion({ question }: Question) {

    const openAI = await this.openAISerivce.getAPIFunctions(question);

    if (!openAI.function_call) return openAI.content || '';
    let response;
    let message;
    const parameters = JSON.parse(openAI.function_call.arguments);
    switch (openAI.function_call.name) {
      case 'searchProducts':
        response = await this.productsSerivce.getProducts(parameters);
        if(!response.length) message = 'The product does not exist in our stack'
        else{
          message = 'The products are:\n\n';
          response.forEach((element, index) => {
            if(index<2)
              message+= `- ${element.displayTitle} with price ${element.price} and variants:${element.variants}\n\n`
          });
        }
        break;
      default:
        response = await this.exchangeRateSerivce.convertCurrency(parameters);
        message =  `${response.amount} from ${response.from} to ${response.to} is: 200 ${response.to}`
        break;
    }

    return message;
  }
}
