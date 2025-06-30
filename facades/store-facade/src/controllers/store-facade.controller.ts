// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
import { juggler } from '@loopback/repository';
import { get } from '@loopback/rest';
import {ConnectorService} from '../services';


export class StoreFacadeController {
  constructor(
       @inject('services.Store') protected storeService: ConnectorService,
  ) {}

  @get('/collectStoreData')
  async getGlobalData(): Promise<any> {
    const products = await this.storeService.getProducts();
    const orders = await this.storeService.getOrders();
    return {
      products,
      orders
    };
  }

}
