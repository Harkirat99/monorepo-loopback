import { inject, lifeCycleObserver, LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';

const config = {
  connector: 'rest',
  crud: false,
  options: {
    headers: {
      accept: 'application/json',
    },
  },
  operations: [
    {
      template: {
        method: 'GET',
        url: 'http://127.0.0.1:3001/products',
      },
      functions: {
        getProducts: [],
      },
    },
    {
      template: {
        method: 'GET',
        url: 'http://127.0.0.1:3002/orders',
      },
      functions: {
        getOrders: [],
      },
    },
  ],
};


@lifeCycleObserver('datasource')
export class ProductDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'product';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.product', { optional: true })
    dsConfig: object = config,
  ) {
    dsConfig = Object.assign({}, dsConfig, {
      connector: require('loopback-connector-rest'),
    });
    super(dsConfig);
  }
}
