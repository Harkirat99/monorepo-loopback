import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {ProductDataSource} from '../datasources';
import { juggler } from '@loopback/repository';

export interface StoreInter {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
}

export interface ConnectorService {
  getProducts(): Promise<any[]>;
  getOrders(): Promise<any[]>;
}

export class StoreProvider implements Provider<ConnectorService> {
  constructor(
    // Product must match the name property in the datasource json file
    @inject('datasources.product')
     protected dataSource: juggler.DataSource = new ProductDataSource(),
    // protected dataSource: ProductDataSource = new ProductDataSource(),
  ) {}

  value(): Promise<ConnectorService> {
    return getService(this.dataSource);
  }
}
