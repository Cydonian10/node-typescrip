import { optional, string, z } from "zod";

const id = z.string().uuid();
const email = z.string().email();
const password = z.string().min(4).max(10);

export const CreateUserSchema = z.object({
  body: z.object({
    email: email.min(1),
    password: password.min(1),
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    email: email.optional(),
    password: password.optional(),
  }),
  params: z.object({
    id: id.min(1),
  }),
});

export const getUserSchema = z.object({
  params: z.object({
    id: id.min(1),
  }),
});
