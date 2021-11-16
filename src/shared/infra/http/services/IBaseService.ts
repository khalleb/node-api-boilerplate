import { Request } from 'express';

import { IPagination, IPaginationAwareObject } from '@shared/infra/typeorm/core/Pagination';

interface IBaseService {
  datasValidate?(data: any): Promise<any>;
  store?(data: Request): Promise<any>;
  update?(data: Request): Promise<any>;
  delete?(data: Request): Promise<any>;
  show?(data: Request): Promise<any | undefined>;
  inactivateActivate?(data: Request): Promise<string>;
  index?(data: IPagination): Promise<IPaginationAwareObject>;
}

export { IBaseService };
