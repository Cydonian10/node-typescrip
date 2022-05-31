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
const customer_service_1 = require("../services/customer.service");
const validatorHandler_1 = require("../middlewares/validatorHandler");
const customer_schema_1 = require("../schemas/customer.schema");
const router = express_1.default.Router();
const service = new customer_service_1.CustomerService();
router.get("/", findMany);
router.get("/", (req, res, nex) => { });
router.post("/", (0, validatorHandler_1.validatorHandler)(customer_schema_1.CreateCustomerSchema), create);
router.post("/full", (0, validatorHandler_1.validatorHandler)(customer_schema_1.CreateCustomerSchema), createFullCustomer);
router.get("/", (req, res, nex) => { });
router.get("/", (req, res, nex) => { });
function findMany(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const customer = yield service.findMany();
            return res.json({
                message: "All customer",
                data: customer,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function create(req, res, nex) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        try {
            const newCustomer = yield service.create(body);
            return res.json({
                message: "Created Customer",
                data: newCustomer,
            });
        }
        catch (error) {
            nex(error);
        }
    });
}
function createFullCustomer(req, res, nex) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        try {
            const newCustomer = yield service.createFullUserCustomer(body);
            return res.status(200).json({
                message: "Customer Full create",
                data: newCustomer,
            });
        }
        catch (error) {
            nex(error);
        }
    });
}
// async function create(req: Request, res: Response, nex: NextFunction) {}
exports.default = router;
//# sourceMappingURL=customer.route.js.map