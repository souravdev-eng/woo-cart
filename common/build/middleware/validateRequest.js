"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
var express_validator_1 = require("express-validator");
var requestValidation_1 = require("../errors/requestValidation");
var validateRequest = function (req, res, next) {
    var errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new requestValidation_1.RequestValidationError(errors.array());
    }
    next();
};
exports.validateRequest = validateRequest;
