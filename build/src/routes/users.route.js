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
const user_service_1 = require("../services/user.service");
const validatorHandler_1 = require("../middlewares/validatorHandler");
const user_schema_1 = require("../schemas/user.schema");
const router = express_1.default.Router();
const service = new user_service_1.UserService();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield service.findMany();
    return res.status(200).json({
        message: "All users",
        data: users,
    });
}));
router.get("/:id", (0, validatorHandler_1.validatorHandler)(user_schema_1.getUserSchema), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield service.findOne(id);
        return res.status(200).json({
            message: "One user",
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
}));
router.post("/", (0, validatorHandler_1.validatorHandler)(user_schema_1.CreateUserSchema), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const newUser = yield service.create(body);
        return res.json({
            message: "Created Product",
            data: newUser,
        });
    }
    catch (error) {
        next(error);
    }
}));
router.put("/", (req, res) => { });
router.get("/", (req, res) => { });
exports.default = router;
//# sourceMappingURL=users.route.js.map