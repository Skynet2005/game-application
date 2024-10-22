// src/components/cyber-rant/lib/validations/community.ts
import * as z from 'zod';

export const CommunityValidation = z.object({
  community_photo: z.string().url().nonempty(),
  name: z
    .string()
    .min(1, { message: 'Minimum 1 character.' })
    .max(30, { message: 'Maximum 30 caracters.' }),
  username: z
    .string()
    .min(1, { message: 'Minimum 1 character.' })
    .max(30, { message: 'Maximum 30 caracters.' }),
  bio: z
    .string()
    .min(1, { message: 'Minimum 1 character.' })
    .max(1000, { message: 'Maximum 1000 caracters.' }),
});
