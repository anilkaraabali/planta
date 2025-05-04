import { HTTP_STATUS } from '@/constants';
import { User } from '@/features/auth';
import {
  readUsersFromFile,
  writeUsersToFile,
} from '@/features/auth/index.server';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: 'All fields are required' });
    }

    // Check if the user already exists
    const users = await readUsersFromFile();
    const userExists = users.find((user) => user.email === email);

    if (userExists) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: 'An account with that email already exists' });
    }

    const newUser: User = {
      createdAt: new Date().toISOString(),
      email,
      emailVerified: false,
      id: crypto.randomUUID(),
      image: null,
      name: null,
      provider: 'credentials',
      providerId: email,
      updatedAt: null,
    };

    users.push(newUser);

    // Save the updated users array back to the file
    await writeUsersToFile(users);

    return res
      .status(HTTP_STATUS.CREATED)
      .json({ message: 'User registered successfully' });
  }

  res
    .status(HTTP_STATUS.METHOD_NOT_ALLOWED)
    .json({ error: 'Method Not Allowed' });
}
