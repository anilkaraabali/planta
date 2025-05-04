import fs from 'fs';
import path from 'path';

import { User } from '../model';

const usersFilePath = path.join(process.cwd(), 'public/data/users.json');
const otpsFilePath = path.join(process.cwd(), 'public/data/otps.json');

const readOtpsFromFile = async (): Promise<{ otp: string }[]> => {
  try {
    const fileData = fs.readFileSync(otpsFilePath, 'utf-8');

    return JSON.parse(fileData);
  } catch {
    return [];
  }
};

const readUsersFromFile = async (): Promise<User[]> => {
  try {
    const fileData = fs.readFileSync(usersFilePath, 'utf-8');

    return JSON.parse(fileData);
  } catch {
    return [];
  }
};

const updateEmailVerified = async (
  email: string,
  value: boolean
): Promise<boolean> => {
  try {
    const users = await readUsersFromFile();

    const userIndex = users.findIndex((user) => user.email === email);

    if (userIndex === -1) {
      return false;
    }

    users[userIndex].emailVerified = value;

    await writeUsersToFile(users);

    return true;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error updating emailVerified field:', error);

    return false;
  }
};

const writeUsersToFile = async (users: User[]): Promise<void> => {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  } catch {
    throw new Error('Error writing to file:');
  }
};

export {
  readOtpsFromFile,
  readUsersFromFile,
  updateEmailVerified,
  writeUsersToFile,
};
