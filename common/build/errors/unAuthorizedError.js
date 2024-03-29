"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnAuthorizedError = void 0;
var customError_1 = require("./customError");
var UnAuthorizedError = /** @class */ (function (_super) {
    __extends(UnAuthorizedError, _super);
    function UnAuthorizedError(message) {
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.statusCode = 401;
        Object.setPrototypeOf(_this, UnAuthorizedError.prototype);
        return _this;
    }
    UnAuthorizedError.prototype.serializeErrors = function () {
        return [{ message: this.message }];
    };
    return UnAuthorizedError;
}(customError_1.CustomError));
exports.UnAuthorizedError = UnAuthorizedError;
