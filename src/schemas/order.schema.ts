import { z } from "zod";

const id = z.string().uuid();
const customerId = z.string().uuid();

const productId = z.string().uuid();
const orderId = z.string().uuid();
const amount = z.number().min(1);

export const CreateOrderSchema = z.object({
  body: z.object({
    customerId: customerId.min(1),
  }),
});

export const updateOrderSchema = z.object({
  body: z.object({
    customerId: customerId.optional(),
  }),
  params: z.object({
    id: id.min(1),
  }),
});

export const AddItemSchema = z.object({
  body: z.object({
    orderId: orderId.min(1),
    productId: productId.min(1),
    amount: amount,
  }),
});

export const CreateOrdersSchema = z.object({});
