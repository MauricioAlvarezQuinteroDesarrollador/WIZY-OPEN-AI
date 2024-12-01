import { Injectable } from '@nestjs/common';

import * as data from '../json/products.json';


@Injectable()
export class ProductsSerivce {

    getProducts(parameters){
        return data.filter(item=> item.displayTitle.toLocaleLowerCase().includes(parameters.product.toLocaleLowerCase()));
    }
}