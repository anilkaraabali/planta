import { HTTP_STATUS } from '@/constants';
import { addNewProductToFile } from '@/features/product/utils';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res
      .status(HTTP_STATUS.METHOD_NOT_ALLOWED)
      .json({ message: 'Method Not Allowed' });
  }

  const { coverImage, expectedHumidity, name, type, weeklyWaterNeed } =
    req.body;

  if (!coverImage || !expectedHumidity || !name || !type || !weeklyWaterNeed) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: 'Missing required fields' });
  }

  try {
    await addNewProductToFile({
      coverImage,
      expectedHumidity: parseFloat(expectedHumidity),
      id: crypto.randomUUID(),
      name,
      type,
      weeklyWaterNeed: parseFloat(weeklyWaterNeed),
    });

    return res
      .status(HTTP_STATUS.CREATED)
      .json({ message: 'Product added successfully' });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in addNewProductToFile:', error);

    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: 'Failed to add a new product' });
  }
}
