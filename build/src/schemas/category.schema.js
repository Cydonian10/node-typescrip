"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCateogorySchema = exports.updateCategorySchema = exports.CreateCategorySchema = void 0;
const zod_1 = require("zod");
const id = zod_1.z.string().uuid();
const name = zod_1.z.string().min(3).max(20);
exports.CreateCategorySchema = zod_1.z.object({
    body: zod_1.z.object({
        name: name.min(1),
    }),
});
exports.updateCategorySchema = zod_1.z.object({
    body: zod_1.z.object({
        name: name.optional(),
    }),
    params: zod_1.z.object({
        id: id.min(1),
    }),
});
exports.getCateogorySchema = zod_1.z.object({
    params: zod_1.z.object({
        id: id.min(1),
    }),
});
//# sourceMappingURL=category.schema.js.map