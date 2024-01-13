import { z } from 'zod';

export const AuthCredentialsValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters long',
  }),
});

export const VerifyEmailValidator = z.object({
  token: z.string(),
});
