/* eslint-disable @typescript-eslint/ban-ts-comment */
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import express from 'express';
import HttpException from '../exceptions/httpException';

import logger, { prettyJSON } from '../services/logger';

type ClassType<T> = {
  new (...args: unknown[]): T;
};

function validationMiddleware<T>(cls: ClassType<T>, skipMissingProperties = false): express.RequestHandler {
  return (req, _res, next) => {
    // @ts-ignore
    validate(plainToClass(cls, req.body), { skipMissingProperties }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors.map((error: ValidationError) => Object.values(error?.constraints || [])).join(', ');
        logger.error(prettyJSON(req.body));
        logger.error(JSON.stringify(message));
        next(new HttpException(400, message));
      } else {
        next();
      }
    });
  };
}

export default validationMiddleware;
