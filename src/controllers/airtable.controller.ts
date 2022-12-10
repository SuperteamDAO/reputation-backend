import { dataCalculator } from '../utils/dataCalculator';

export const airtableController = async (_req: any, res: any) => {
  console.log('inside /airtable/data');
  const { personData, bountyDataJson } = await dataCalculator();
  res.json({ personData, bountyDataJson });
};
