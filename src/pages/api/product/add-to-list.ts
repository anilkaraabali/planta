import { HTTP_STATUS } from '@/constants';
import { addProductToFile } from '@/features/product/utils';
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

  const { id, userId } = req.body;

  if (!id || !userId) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: 'Missing required fields: id and userId' });
  }

  try {
    await addProductToFile(id, userId);

    return res
      .status(HTTP_STATUS.CREATED)
      .json({ message: 'Product added successfully' });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in addProductToFile:', error);

    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: 'Failed to add product' });
  }
}
