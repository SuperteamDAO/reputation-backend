// create a basic express server to ping the server
import express from 'express';
const app = express();
import router from './routes/airtable.route';
const port = 3000;

import dotenv from 'dotenv';
import { airtableController } from './controllers/airtable.controller';
dotenv.config();

app.get('/', (_req: any, res: { send: (arg0: string) => any }) => res.send('Hello World!'));
app.get('/xp', airtableController);
app.use('/airtable', router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
