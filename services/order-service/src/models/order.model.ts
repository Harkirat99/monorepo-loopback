import {Entity, model, property} from '@loopback/repository';

@model({
  name: "orders"
})
export class Order extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  status?: string;

  @property({
    type: 'number',
  })
  amount?: number;

  @property({
    type: 'number',
    name: "product_id"
  })
  productId?: number;


  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;
