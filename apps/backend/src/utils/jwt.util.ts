import * as jwt from 'jsonwebtoken';
import { UserRole } from '../entities/user.entity';

interface tokenPayload {
  firstName: string;
  lastName?: string | null;
  role: UserRole;
}

export const getToken = async (payload: tokenPayload): Promise<string> => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export const verify = async (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
