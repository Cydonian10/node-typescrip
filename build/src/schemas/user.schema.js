"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserSchema = exports.updateUserSchema = exports.CreateUserSchema = void 0;
const zod_1 = require("zod");
const id = zod_1.z.string().uuid();
const email = zod_1.z.string().email();
const password = zod_1.z.string().min(4).max(10);
exports.CreateUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: email.min(1),
        password: password.min(1),
    }),
});
exports.updateUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: email.optional(),
        password: password.optional(),
    }),
    params: zod_1.z.object({
        id: id.min(1),
    }),
});
exports.getUserSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: id.min(1),
    }),
});
//# sourceMappingURL=user.schema.js.map