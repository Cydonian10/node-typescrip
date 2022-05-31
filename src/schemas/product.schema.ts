// import Joi from "joi";

import { z } from "zod";

const id = z.string().uuid();
const name = z.string().min(3).min(5);
const price = z.number().int().min(20).max(1000);
const image = z.string().url();

export const CreateProductSchema = z.object({
  body: z.object({
    name: name.min(1),
    price: price.nonnegative().min(1),
    image: image,
    categoryId: z.string().uuid(),
  }),
});

export const updateProductSchema = z.object({
  body: z.object({
    name: name.optional(),
    price: price.optional(),
    image: image.optional(),
  }),
  params: z.object({
    id: id.min(1),
  }),
});

export const getProductSchema = z.object({
  params: z.object({
    id: id.optional(),
  }),
  querys: z.object({
    limit: z.string().optional(),
    offset: z.string().optional(),
  }),
});
