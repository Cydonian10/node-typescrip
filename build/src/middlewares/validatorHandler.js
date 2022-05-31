"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorHandler = void 0;
const zod_1 = require("zod");
function validatorHandler(schema) {
    return function (req, res, next) {
        try {
            schema.parse({ body: req.body, params: req.params });
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json(error.issues.map((issue) => ({
                    path: issue.path[1],
                    message: issue.message,
                })));
            }
        }
    };
}
exports.validatorHandler = validatorHandler;
//# sourceMappingURL=validatorHandler.js.map