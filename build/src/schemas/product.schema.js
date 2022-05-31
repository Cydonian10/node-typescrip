"use strict";
// import Joi from "joi";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductSchema = exports.updateProductSchema = exports.CreateProductSchema = void 0;
const zod_1 = require("zod");
const id = zod_1.z.string().uuid();
const name = zod_1.z.string().min(3).min(5);
const price = zod_1.z.number().int().min(20).max(1000);
const image = zod_1.z.string().url();
exports.CreateProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: name.min(1),
        price: price.nonnegative().min(1),
        image: image,
        categoryId: zod_1.z.string().uuid(),
    }),
});
exports.updateProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: name.optional(),
        price: price.optional(),
        image: image.optional(),
    }),
    params: zod_1.z.object({
        id: id.min(1),
    }),
});
exports.getProductSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: id.min(1),
    }),
});
//# sourceMappingURL=product.schema.js.map