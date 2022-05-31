import { z } from "zod";

const id = z.string().uuid();
const name = z.string().min(3).max(20);
const lastName = z.string().min(4).max(20);
const userId = z.string().uuid();

const email = z.string().email();
const password = z.string().min(4).max(10);

export const CreateCustomerSchema = z.object({
  body: z.object({
    name: name.min(1),
    lastName: lastName.min(1),
    // userId: userId.min(1),
    user: z.object({
      email: email.min(1),
      password: password.min(1),
    }),
  }),
});

export const updateCustomerSchema = z.object({
  body: z.object({
    name: name.optional(),
    lastName: lastName.optional(),
    userId: userId.optional(),
  }),
  params: z.object({
    id: id.min(1),
  }),
});

export const getCustomerSchema = z.object({
  params: z.object({
    id: id.min(1),
  }),
});

export const UpdateUserFullSchema = z.object({
  body: z.object({
    user: z.object({
      email: email.optional(),
      password: password.optional(),
    }),
    customer: z.object({
      lastName: lastName.optional(),
      name: name.optional(),
    }),
  }),
});
