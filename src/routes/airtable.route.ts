import express from 'express';
const router = express.Router();

//Validation
//import { airtableValidator } from '../helper/airtableValidator.js';

//load controllers
import { airtableController } from '../controllers/airtable.controller.js';

router.get('/', (_req: any, res: { send: (arg0: string) => any }) => res.send('are you looking for some data'));
router.get('/data', airtableController);

export default router;
