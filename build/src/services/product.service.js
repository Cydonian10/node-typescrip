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
exports.ProductService = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
const client_1 = require("@prisma/client");
// import { getConnection } from "../lib/postgres";
// import { pool } from "../lib/postgres.pool";
// import { Pool } from "pg";
const prisma = new client_1.PrismaClient();
class ProductService {
    // private pool: Pool;
    constructor() {
        // this.pool = pool;
        // this.pool.on("error", (err) => console.error(err));
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = yield prisma.product.create({ data: Object.assign({}, data) });
            return newProduct;
        });
    }
    findMany() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield prisma.product.findMany({
                include: {
                    category: {
                        select: { name: true },
                    },
                },
            });
            return products;
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield prisma.product.findUnique({
                where: { id },
            });
            if (!product) {
                throw boom_1.default.notFound("Product not found");
            }
            return product;
        });
    }
}
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map