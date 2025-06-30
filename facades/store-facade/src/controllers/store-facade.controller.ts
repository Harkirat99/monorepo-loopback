// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
import { juggler } from '@loopback/repository';
import { get } from '@loopback/rest';
import {Store} from '../services';


export class StoreFacadeController {
  constructor(
      @inject('datasources.Product') private dataSource: juggler.DataSource,
       @inject('services.Store') protected geoService: Store,
  ) {}

  @get('/collectStoreData')
  async getGlobalData(): Promise<any> {
    const restConnector: any = this.dataSource.connector;
    const products = await restConnector.getProducts();
    const orders = await restConnector.getOrders();
    return {
      products,
      orders
    };
  }

}
