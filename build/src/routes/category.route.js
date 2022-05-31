"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validatorHandler_1 = require("../middlewares/validatorHandler");
const category_schema_1 = require("../schemas/category.schema");
const category_service_1 = require("../services/category.service");
const router = express_1.default.Router();
const service = new category_service_1.CategoryService();
router.get("/", findMany);
router.post("/", (0, validatorHandler_1.validatorHandler)(category_schema_1.CreateCategorySchema), create);
function findMany(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const categories = yield service.findMany();
        return res.status(200).json({
            message: "All Categories",
            data: categories,
        });
    });
}
function create(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        try {
            const newCategory = yield service.create(body);
            return res.json({
                message: "Created category",
                data: newCategory,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
// async function findMany(req: Request, res: Response, next: NextFunction ) {}
exports.default = router;
//# sourceMappingURL=category.route.js.map