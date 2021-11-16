/* eslint-disable no-plusplus */
import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { tokensServices } from '@shared/container';
import { IPagination } from '@shared/infra/typeorm/core/Pagination';

import { created, HttpResponse, ok } from '../core/HttpResponse';
import { IBaseService } from '../services/IBaseService';

export abstract class BaseController<T extends IBaseService> {
  public async store(request: Request, response: Response, serviceName: tokensServices): Promise<HttpResponse> {
    const service = container.resolve<T>(serviceName);
    await (service.store && service.store(request));
    return created();
  }

  public async update(request: Request, response: Response, serviceName: tokensServices): Promise<HttpResponse> {
    const service = container.resolve<T>(serviceName);
    await (service.update && service.update(request));
    return ok();
  }

  public async delete(request: Request, response: Response, serviceName: tokensServices): Promise<HttpResponse> {
    const service = container.resolve<T>(serviceName);
    await (service.delete && service.delete(request));
    return ok();
  }

  public async show(request: Request, response: Response, serviceName: tokensServices): Promise<HttpResponse> {
    const service = container.resolve<T>(serviceName);
    const object = await (service.show && service.show(request));
    return ok(object);
  }

  public async inactivateActivate(
    request: Request,
    response: Response,
    serviceName: tokensServices,
  ): Promise<HttpResponse> {
    const service = container.resolve<T>(serviceName);
    await (service.inactivateActivate && service.inactivateActivate(request));
    return ok();
  }

  public async index(request: Request, response: Response, serviceName: tokensServices): Promise<HttpResponse> {
    const service = container.resolve<T>(serviceName);
    const datasPagination: IPagination = request.body;
    const data = await (service.index && service.index(datasPagination));
    return ok(data);
  }
}

export default BaseController;
