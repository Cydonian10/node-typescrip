"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const error_handles_1 = require("./middlewares/error.handles");
const routes_1 = require("./routes");
const cors_1 = __importDefault(require("cors"));
const port = "3000";
const app = (0, express_1.default)();
app.use(express_1.default.json());
const whiteList = ["http://localhost:8080"];
const options = {
    origin: (origin, callback) => {
        if (whiteList.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("no permitido"));
        }
    },
};
app.use((0, cors_1.default)());
(0, routes_1.routerApi)(app);
/**
 * @middlewares
 */
app.use(error_handles_1.logHandler);
app.use(error_handles_1.boomErrorHandler);
app.use(error_handles_1.errorHandler);
app.listen(port, () => {
    console.log("Mi port" + port);
});
//# sourceMappingURL=index.js.map