import { z } from 'zod';

export const loginSchema = z.object({
  login: z.string().email(),
  password: z.string(),
});
