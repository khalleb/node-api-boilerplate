import { NextFunction, Request, Response } from 'express';

import httpStatus from 'http-status';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import redis from 'redis';

import { env } from '@shared/env';
import AppError from '@shared/errors/AppError';
import { i18n } from '@shared/internationalization';
import { AppLogger } from '@shared/logger';
import { nameProject } from '@shared/utils/stringUtil';

const dataConnection = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  db: env.REDIS_DB || 1,
};

const redisClient = redis.createClient(
  env.REDIS_PASS ? { ...dataConnection, password: env.REDIS_PASS } : dataConnection,
);

redisClient?.on('connect', () => {
  AppLogger.warn({ message: 'REDIS CONNECTED - RateLimited' });
});

const rateLimiterClient = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: `RATE_LIMITER_${nameProject().toUpperCase().replace(' ', '_')}`,
  points: 10,
  duration: 5,
});

async function rateLimiter(req: Request, res: Response, next: NextFunction) {
  try {
    await rateLimiterClient?.consume(req.ip);

    return next();
  } catch {
    throw new AppError(i18n('validations.many_requests'), httpStatus.TOO_MANY_REQUESTS);
  }
}

export { rateLimiter };
