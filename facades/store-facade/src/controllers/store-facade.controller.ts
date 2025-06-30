// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
import { get, getModelSchemaRef, post, requestBody, response } from '@loopback/rest';
import {ConnectorService} from '../services';
import { Order } from 'order-service';


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

  @post('/createOrder')
  @response(200, {
    description: 'Order model instance',
    content: {'application/json': {schema: getModelSchemaRef(Order)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {
            title: 'NewOrder',
            exclude: ['id'],
          }),
        },
      },
    })
        order: Omit<Order, 'id'>,

  ) : Promise<any> {

    return this.storeService.createOrder(order)
    // return this.orderRepository.create(order);
  }
}
