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
exports.ProductCreatedListener = void 0;
var baseListener_1 = require("../events/baseListener");
var subject_1 = require("../types/subject");
var ProductCreatedListener = /** @class */ (function (_super) {
    __extends(ProductCreatedListener, _super);
    function ProductCreatedListener() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.subject = subject_1.Subjects.ProductCreated;
        _this.queueGroupName = 'product-created-service';
        return _this;
    }
    ProductCreatedListener.prototype.onMessage = function (data, msg) {
        console.log('Event data!', data);
        msg.ack();
    };
    return ProductCreatedListener;
}(baseListener_1.Listener));
exports.ProductCreatedListener = ProductCreatedListener;
