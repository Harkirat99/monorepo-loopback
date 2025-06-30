// src/controllers/store.controller.ts
import {inject} from '@loopback/core';
import {get} from '@loopback/rest';
import {juggler} from '@loopback/repository';
// import {OrderWithProduct} from '../models/order-with-product.model';

export class StoreController {
  constructor(
    @inject('datasources.ordersDs') private ordersDs: juggler.DataSource,
    @inject('datasources.productsDs') private productsDs: juggler.DataSource,
  ) {}

  @get('/store/orders-with-products', {
    responses: {
      '200': {
        description: 'Array of OrderWithProduct',
        content: {
          'application/json': {
            schema: {
              type: 'array',
            },
          },
        },
      },
    },
  })
  async getAllOrdersAndProducts(): Promise<any[]> {
    const ordersApi: any = this.ordersDs.connector;
    const productsApi: any = this.productsDs.connector;

    const orders = await ordersApi.getOrders(); // GET /orders

    const result: any[] = [];

    for (const order of orders) {
      const product = await productsApi.getProductById(order.productId); // GET /products/:id

      result.push({
        orderId: order.orderId,
        quantity: order.quantity,
        product: {
          id: product.id,
          name: product.name,
        },
      });
    }

    return result;
  }
}
