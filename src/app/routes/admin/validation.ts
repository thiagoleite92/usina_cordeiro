import { z } from 'zod';

export const loginSchema = z.object({
  cpf: z.string(),
  email: z.string().email(),
});
