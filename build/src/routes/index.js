"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerApi = void 0;
const express_1 = __importDefault(require("express"));
const products_route_1 = __importDefault(require("./products.route"));
const users_route_1 = __importDefault(require("./users.route"));
const customer_route_1 = __importDefault(require("./customer.route"));
const category_route_1 = __importDefault(require("./category.route"));
const order_route_1 = __importDefault(require("./order.route"));
function routerApi(app) {
    const router = express_1.default.Router();
    app.use("/api/v1", router);
    router.use("/products", products_route_1.default);
    router.use("/users", users_route_1.default);
    router.use("/customers", customer_route_1.default);
    router.use("/categories", category_route_1.default);
    router.use("/orders", order_route_1.default);
}
exports.routerApi = routerApi;
//# sourceMappingURL=index.js.map