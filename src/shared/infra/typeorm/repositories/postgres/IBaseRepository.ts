import { DeleteResult } from 'typeorm';

import { IPagination, IPaginationAwareObject } from '../../core/Pagination';

export default interface IBaseRepository<T> {
  store(entity: T): Promise<T>;
  stores(entity: T[]): Promise<T[]>;
  update(entity: T): Promise<T>;
  delete(id: string): Promise<DeleteResult>;
  findById(id: string): Promise<T | undefined>;
  findByIds(ids: string[]): Promise<T[]>;
  inactivateActivate(entity: T): Promise<boolean>;
  checkIfThereIsRegistrationById(id: string): Promise<boolean>;
  index(data: IPagination): Promise<IPaginationAwareObject>;
}
