// src/lib/cyber-rant/validations/thread.ts
import * as z from 'zod';

export const ThreadValidation = z.object({
  thread: z.string().nonempty().min(3, { message: 'Minimum 3 characters.' }),
  accountId: z.string(),
  image: z.union([z.string().optional(), z.any().refine(val => val instanceof File, "Must be a File object").optional()]),
});

export const CommentValidation = z.object({
  thread: z.string().nonempty().min(3, { message: 'Minimum 3 characters.' }),
});

export const CommentValidationExtended = CommentValidation.extend({
  aiInput: z.string().optional(),
});

export const ReactionValidation = z.object({
  reactionType: z.union([
    z.literal('heartpulseCount'),
    z.literal('fireCount'),
    z.literal('thumbsDownCount')
  ]),
  increment: z.boolean()
});
