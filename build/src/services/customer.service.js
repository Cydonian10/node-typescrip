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
exports.CustomerService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class CustomerService {
    constructor() { }
    findMany() {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield prisma.customer.findMany({
                include: {
                    user: true,
                    order: true,
                },
            });
            return customer;
        });
    }
    findOne() { }
    createFullUserCustomer(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // const newUser = await prisma.user.create({ data: { ...data.user } });
            // const newCustomer = await prisma.customer.create({
            //   data: { userId: newUser.id, lastName: data.lastName, name: data.name },
            // });
            const newCustomer = yield prisma.customer.create({
                data: {
                    lastName: data.lastName,
                    name: data.name,
                    user: {
                        create: Object.assign({}, data.user),
                    },
                },
            });
            return newCustomer;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCustomer = yield prisma.customer.create({ data });
            return newCustomer;
        });
    }
}
exports.CustomerService = CustomerService;
//# sourceMappingURL=customer.service.js.map