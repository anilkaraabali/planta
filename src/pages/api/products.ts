import { HTTP_STATUS } from '@/constants';
import { NextApiRequest, NextApiResponse } from 'next';
import plants from 'public/data/products.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(HTTP_STATUS.OK).json(plants);
  }

  res
    .status(HTTP_STATUS.METHOD_NOT_ALLOWED)
    .json({ message: 'Method Not Allowed' });
}
