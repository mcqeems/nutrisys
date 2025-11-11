import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).trim().min(1, 'Email is required').email('Invalid email'),
  password: z.string({ required_error: 'Password is required' }).min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = loginSchema.extend({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name too long').optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
