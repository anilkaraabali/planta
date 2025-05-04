import { HTTP_STATUS } from '@/constants';
import {
  readOtpsFromFile,
  readUsersFromFile,
  updateEmailVerified,
} from '@/features/auth/index.server';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: 'Email and OTP are required' });
    }

    try {
      const users = await readUsersFromFile();
      const userExists = users.some((user) => user.email === email);

      if (!userExists) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ error: 'Email not linked to any user' });
      }

      const otps = await readOtpsFromFile();

      const match = otps.find((entry) => entry === otp);

      if (match) {
        await updateEmailVerified(email, true);

        return res.status(HTTP_STATUS.OK).json({
          message: 'OTP verified successfully.',
          verified: true,
        });
      }

      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Invalid OTP.',
        verified: false,
      });
    } catch (error) {
      // Handle potential errors during file reading
      // eslint-disable-next-line no-console
      console.error('Error verifying OTP:', error);

      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal server error' });
    }
  }

  res.setHeader('Allow', ['POST']);

  return res
    .status(HTTP_STATUS.METHOD_NOT_ALLOWED)
    .json({ error: 'Method Not Allowed' });
}
