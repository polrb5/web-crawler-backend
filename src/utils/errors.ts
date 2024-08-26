import { GraphQLError } from 'graphql';

import { ERROR_MESSAGES } from '../constants';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode: number,
    isOperational: boolean = true,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = ERROR_MESSAGES.AUTHENTICATION_FAILED) {
    super(message, 401);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = ERROR_MESSAGES.RESOURCE_NOT_FOUND) {
    super(message, 404);
  }
}

export class CrawlJobError extends AppError {
  constructor(message: string = ERROR_MESSAGES.CRAWL_JOB_ERROR) {
    super(message, 500);
  }
}

export const formatGraphQLError = (
  error: GraphQLError | Error,
): GraphQLError | Error => {
  if (error instanceof GraphQLError) {
    const originalError = error.originalError as AppError;

    return new GraphQLError(error.message, {
      nodes: error.nodes,
      source: error.source,
      positions: error.positions,
      path: error.path,
      originalError: error.originalError,
      extensions: {
        ...error.extensions,
        code: originalError?.statusCode || 500,
        exception: {
          stacktrace: error.stack ? error.stack.split('\n') : null,
        },
      },
    });
  }

  return error;
};

export const handleResolverError = async <T>(
  resolverFunc: () => Promise<T>,
): Promise<T> => {
  try {
    return await resolverFunc();
  } catch (error) {
    if (error instanceof Error) {
      throw new GraphQLError(error.message, {
        extensions: {
          code: error instanceof AppError ? error.statusCode : 500,
        },
      });
    }
    throw new GraphQLError(ERROR_MESSAGES.UNKNOWN_ERROR, {
      extensions: {
        code: 500,
      },
    });
  }
};
