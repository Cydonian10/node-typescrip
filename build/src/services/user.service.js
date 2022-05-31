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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const boom_1 = require("@hapi/boom");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class UserService {
    constructor() { }
    findMany() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield prisma.user.findMany({
                include: {
                    customer: true,
                },
            });
            return products;
        });
    }
    /**
     * @param id string
     * recupera un usuario
     */
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({
                where: { id },
            });
            if (!user) {
                throw (0, boom_1.notFound)("User not found");
            }
            return user;
        });
    }
    /**
     * Es para crear un usuario
     * @param data {email,password}
     * @returns user
     */
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = yield prisma.user.create({ data });
            if (!newUser) {
                throw (0, boom_1.conflict)("Product not created");
            }
            return newUser;
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map