import httpStatus from 'http-status';

export type HttpResponse = {
  statusCode: number;
  body: any;
};

export function ok<T>(dto?: T): HttpResponse {
  return {
    statusCode: httpStatus.OK,
    body: dto,
  };
}

export function created(): HttpResponse {
  return {
    statusCode: httpStatus.CREATED,
    body: undefined,
  };
}

export function clientError(error: Error): HttpResponse {
  return {
    statusCode: httpStatus.BAD_REQUEST,
    body: {
      error: error.message,
    },
  };
}

export function unauthorized(error: Error): HttpResponse {
  return {
    statusCode: httpStatus.UNAUTHORIZED,
    body: {
      error: error.message,
    },
  };
}

export function forbidden(error: Error): HttpResponse {
  return {
    statusCode: httpStatus.FORBIDDEN,
    body: {
      error: error.message,
    },
  };
}

export function notFound(error: Error): HttpResponse {
  return {
    statusCode: httpStatus.NOT_FOUND,
    body: {
      error: error.message,
    },
  };
}

export function conflict(error: Error): HttpResponse {
  return {
    statusCode: httpStatus.CONFLICT,
    body: {
      error: error.message,
    },
  };
}

export function tooMany(error: Error): HttpResponse {
  return {
    statusCode: httpStatus.TOO_MANY_REQUESTS,
    body: {
      error: error.message,
    },
  };
}

export function fail(error: Error) {
  return {
    statusCode: httpStatus.INTERNAL_SERVER_ERROR,
    body: {
      error: error.message,
    },
  };
}
