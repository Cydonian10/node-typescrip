"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boomErrorHandler = exports.errorHandler = exports.logHandler = void 0;
function logHandler(err, req, res, next) {
    console.error(err);
    next(err);
}
exports.logHandler = logHandler;
function errorHandler(err, req, res, next) {
    res.status(500).json({
        message: err.message,
        stack: err.stack,
    });
}
exports.errorHandler = errorHandler;
function boomErrorHandler(err, req, res, next) {
    if (err.isBoom) {
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
    }
    next(err);
}
exports.boomErrorHandler = boomErrorHandler;
//# sourceMappingURL=error.handles.js.map