import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PgDataSource} from '../datasources';
import {Product, ProductRelations, Order} from '../models';
import {OrderRepository} from './order.repository';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.id,
  ProductRelations
> {

  public readonly orders: HasManyRepositoryFactory<Order, typeof Product.prototype.id>;

  constructor(
    @inject('datasources.pg') dataSource: PgDataSource, @repository.getter('OrderRepository') protected orderRepositoryGetter: Getter<OrderRepository>,
  ) {
    super(Product, dataSource);
    this.orders = this.createHasManyRepositoryFactoryFor('orders', orderRepositoryGetter,);
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
  }
}
