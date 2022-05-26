// import Joi from "joi";

import { z } from "zod";

// const id = Joi.string().uuid();
// const name = Joi.string().alphanum().min(3).max(5);
// const price = Joi.number().integer().min(10);
// const image = Joi.string();

// export const createProductSchema = Joi.object({
//   name: name.required(),
//   price: price.required(),
//   image: image.required(),
// });

// export const updateProductSchema = Joi.object({
//   name: name,
//   price: price,
//   image: image,
// });

// export const getProductSchema = Joi.object({
//   id: id.required(),
// });

const id = z.string().uuid();
const name = z.string().min(3).min(5);
const price = z.number().int().min(20);
const image = z.string().url();

export const CreateProductSchema = z.object({
  body: z.object({
    name: name.min(1),
    price: price.nonnegative().min(1),
    image: image,
  }),
});

export const updateProductSchema = z.object({
  body: z.object({
    name: name.optional(),
    price: price.optional(),
    image: image.optional(),
  }),
  params: z.object({
    id: id,
  }),
});

export const getProductSchema = z.object({
  id: id.min(1),
});
