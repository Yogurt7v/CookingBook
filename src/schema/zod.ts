import z, { object, string } from 'zod';

export const signInSchema = object({
  email: string({ error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email'),
  password: string({ error: 'Password is required' })
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
});

export const ingredientSchema = object({
  name: string({ error: 'Name is required' })
    .min(1, 'Name is required')
    .min(2, 'Name must be more than 2 characters')
    .max(32, 'Name must be less than 32 characters'),
  category: z.enum([
    'VEGETABLES',
    'FRUITS',
    'MEAT',
    'FISH',
    'GRAINS',
    'DAIRY',
    'BAKERY',
    'SPICES',
    'OTHER',
  ]),
  unit: z.enum(['KILOGRAMS', 'GRAMS', 'LITERS', 'MILLILITERS', 'PIECES']),
  pricePerUnit: z
    .number({
      error: 'Price per unit is required',
    })
    .min(0, 'Price per unit must be more than 0')
    .nullable(),
  description: z.string().optional(),
});
