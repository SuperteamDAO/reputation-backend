import { dataCalculator } from '../utils/dataCalculator';

export const airtableController = async (_req: any, res: any) => {
  const { personData, bountyDataJson, lastSevenDaysData } = await dataCalculator();
  console.log('here is the data you want - ', lastSevenDaysData);

  res.json({ personData, bountyDataJson, lastSevenDaysData });
};
