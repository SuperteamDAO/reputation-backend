import { dataCalculator } from '../utils/dataCalculator';

export const airtableController = async (_req: any, res: any) => {
  const { personData, bountyDataJson } = await dataCalculator();
  console.log({ personData, bountyDataJson });
  res.json({ personData, bountyDataJson });
};
