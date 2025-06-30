import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {ProductDataSource} from '../datasources';
import { juggler } from '@loopback/repository';
import { Order } from 'order-service';

export interface StoreInter {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
}

export interface ConnectorService {
  getProducts(): Promise<any[]>;
  getOrders(): Promise<any[]>;
  createOrder(order: Omit<Order, 'id'>): Promise<Order>;
}

export class StoreProvider implements Provider<ConnectorService> {
  constructor(
    @inject('datasources.product')
     protected dataSource: juggler.DataSource = new ProductDataSource(),
  ) {}

  value(): Promise<ConnectorService> {
    return getService(this.dataSource);
  }
}
