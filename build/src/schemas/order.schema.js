"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrdersSchema = exports.AddItemSchema = exports.updateOrderSchema = exports.CreateOrderSchema = void 0;
const zod_1 = require("zod");
const id = zod_1.z.string().uuid();
const customerId = zod_1.z.string().uuid();
const productId = zod_1.z.string().uuid();
const orderId = zod_1.z.string().uuid();
const amount = zod_1.z.number().min(1);
exports.CreateOrderSchema = zod_1.z.object({
    body: zod_1.z.object({
        customerId: customerId.min(1),
    }),
});
exports.updateOrderSchema = zod_1.z.object({
    body: zod_1.z.object({
        customerId: customerId.optional(),
    }),
    params: zod_1.z.object({
        id: id.min(1),
    }),
});
exports.AddItemSchema = zod_1.z.object({
    body: zod_1.z.object({
        orderId: orderId.min(1),
        productId: productId.min(1),
        amount: amount,
    }),
});
exports.CreateOrdersSchema = zod_1.z.object({});
//# sourceMappingURL=order.schema.js.map