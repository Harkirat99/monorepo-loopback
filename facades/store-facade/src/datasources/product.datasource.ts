import { inject, lifeCycleObserver, LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';

const config = {
  name: 'Product',
  connector: 'rest',
  baseURLProducts: 'http://127.0.0.1:3001',
  baseURLOrders: 'http://127.0.0.1:3002',
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
        url: '{baseURLProducts}/products',
      },
      functions: {
        getProducts: [],
      },
    },
    {
      template: {
        method: 'GET',
        url: '{baseURLOrders}/orders',
      },
      functions: {
        getOrders: [],
      },
    },
  ],
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class ProductDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'Product';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.Product', { optional: true })
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
