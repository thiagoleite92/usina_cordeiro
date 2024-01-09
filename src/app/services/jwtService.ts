import jsonwebtoken from 'jsonwebtoken';
import { env } from '../../env';

type JWTPayload = {
  email: string;
  name: string;
  role: string;
  id: string;
};

const jwt = jsonwebtoken;

export const jwtService = {
  signJWT: (payload: JWTPayload): string => {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '7 days' });
  },
};
