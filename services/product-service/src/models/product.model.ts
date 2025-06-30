import {Entity, model, property, hasMany} from '@loopback/repository';
import {Order} from './order.model';

@model({
  name: "products"
})
export class Product extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'number',
  })
  price?: number;

  @hasMany(() => Order, {
    keyFrom: "productId",
    keyTo: "productId"
  })
  
  orders: Order[];

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type IdWithRelations = Product & ProductRelations;
