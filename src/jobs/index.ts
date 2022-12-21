// import schedule from 'node-schedule';
// import PScale from 'services/pscale';
// import logger from '../services/logger';

// // jobs
// import AirtableSync from '../utils/syncAirtable';
// async function scheduler() {
//   logger.info('Started scheduler job');
//   const services = [PScale];
//   for (const service of services) {
//     await service.init();
//   }
//   // Runs at mid night sync airtable with db
//   schedule.scheduleJob('0 0 * * *', AirtableSync);
// }
// scheduler();
