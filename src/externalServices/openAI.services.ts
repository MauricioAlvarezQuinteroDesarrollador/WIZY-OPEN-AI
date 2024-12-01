import OpenAI from 'openai';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OpenAIService {
    client;

    constructor(){
        this.client = new OpenAI({
            apiKey: process.env.API_KEY,
          });
    }

    async getAPIFunctions(content){
        const response = await this.client.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content }],
            functions: [
              {
                name: "searchProducts",
                description: "Find all product information",
                parameters: {
                  type: "object",
                  properties: {
                    product: {
                      type: "string",
                      description: "The product, eg: iPhone 12, celulares Color (Black, Blue, Red, Green, White), Capacity (64gb, 128gb),  In Sale/Discount",
                    },
                    price: {
                      type: "string",
                      description:"price eg: 900"
                    },
                    // descriptions: {
                    //   type: 'string',
                    //   description: 'descriptions, eg: iPhone'
                    // },
                    // variants: {
                    //   type: "string",
                    //   description: 'variantas, eg: Color (Black, Blue, Red, Green, White), Capacity (64gb, 128gb)'
                    // },
                    // type: {
                    //   type: "string",
                    //   description: 'type object, eg: Technology'
                    // }
                  },
                  required: ["product","price", "type","description","variants"],
                },
              },
              {
                name: "convertCurrencies",
                description: "convert Currency",
                parameters: {
                  type: "object",
                  properties: {
                    amount: {
                      type: "string",
                      description: "The currency, eg: 25 ",
                    },
                    from: {
                      type: "string",
                      description: "The from currency, eg: GBP",
                    },
                    to: {
                      type: "string",
                      description: "The to currency, eg: JPY",
                    },
      
                  },
                  required: ["currency"],
                },
              },
            ],
            function_call: "auto",
          });
        
          const message = response.choices[0].message;
          
          return message;
    }

    async responseFunction(message,content, functionName, functionResponse){
        const secondResponse = await this.client.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content,
              },
              message,
              { role: "function", name: functionName, content: functionResponse },
            ],
          });
          console.log("secondResponse", secondResponse)
          return secondResponse.data.choices[0].message;
    }

}