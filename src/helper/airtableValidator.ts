import { check } from 'express-validator';

export const airtableValidator = (_req: any, _res: any) => {
  check('newPassword');
};
