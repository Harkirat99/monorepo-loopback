import {Entity, model, property} from '@loopback/repository';
import { Product } from "product-service";
import { Order } from "order-service";

@model()
export class OrderProduct extends Entity {
  @property({
    type: 'array',
  })
  products?: Product;

   @property({
    type: 'array',
  })
  orders?: Order;
  
  constructor(data?: Partial<OrderProduct>) {
    super(data);
  }
}

export interface OrderProductRelations {
  // describe navigational properties here
}

export type OrderProductWithRelations = OrderProduct & OrderProductRelations;
