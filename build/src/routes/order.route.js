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
const order_schema_1 = require("../schemas/order.schema");
const order_service_1 = require("../services/order.service");
const router = express_1.default.Router();
const service = new order_service_1.OrderServie();
router.get("/", findMany);
router.post("/", (0, validatorHandler_1.validatorHandler)(order_schema_1.CreateOrderSchema), create);
router.post("/add-item", (0, validatorHandler_1.validatorHandler)(order_schema_1.AddItemSchema), addItemOrder);
function findMany(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orders = yield service.findMany();
            return res.json({
                message: "All orders",
                data: orders,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function create(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        try {
            const newOrder = yield service.create(body);
            return res.json({
                message: "Created Order",
                data: newOrder,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function addItemOrder(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        try {
            const newItem = yield service.addItem(body);
            return res.json({
                message: "Created Order",
                data: newItem,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.default = router;
//# sourceMappingURL=order.route.js.map