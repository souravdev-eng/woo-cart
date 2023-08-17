"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
var unAuthorizedError_1 = require("../errors/unAuthorizedError");
var requireAuth = function (req, res, next) {
    if (!req.currentUser) {
        throw new unAuthorizedError_1.UnAuthorizedError('Oops. You are not logged in. Please login first.');
    }
    next();
};
exports.requireAuth = requireAuth;
