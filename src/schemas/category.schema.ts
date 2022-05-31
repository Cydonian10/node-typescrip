import { z } from "zod";

const id = z.string().uuid();
const name = z.string().min(3).max(20);

export const CreateCategorySchema = z.object({
  body: z.object({
    name: name.min(1),
  }),
});

export const updateCategorySchema = z.object({
  body: z.object({
    name: name.optional(),
  }),
  params: z.object({
    id: id.min(1),
  }),
});

export const getCateogorySchema = z.object({
  params: z.object({
    id: id.min(1),
  }),
});
