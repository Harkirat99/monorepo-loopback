import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {ProductDataSource} from '../datasources';

export interface Store {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
}

export class StoreProvider implements Provider<Store> {
  constructor(
    // Product must match the name property in the datasource json file
    @inject('datasources.Product')
    protected dataSource: ProductDataSource = new ProductDataSource(),
  ) {}

  value(): Promise<Store> {
    return getService(this.dataSource);
  }
}
