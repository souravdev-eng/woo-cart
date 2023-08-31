"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Listener = void 0;
var Listener = /** @class */ (function () {
    function Listener(client) {
        this.ackWait = 5 * 1000;
        this.client = client;
    }
    Listener.prototype.subscriptionOption = function () {
        return this.client
            .subscriptionOptions()
            .setDeliverAllAvailable()
            .setDurableName(this.queueGroupName)
            .setManualAckMode(true)
            .setAckWait(this.ackWait);
    };
    Listener.prototype.listen = function () {
        var _this = this;
        var subscription = this.client.subscribe(this.subject, this.queueGroupName, this.subscriptionOption());
        subscription.on('message', function (msg) {
            console.log("Message received: ".concat(_this.subject, " / ").concat(_this.queueGroupName));
            var parseData = _this.parseData(msg);
            _this.onMessage(parseData, msg);
        });
    };
    Listener.prototype.parseData = function (msg) {
        var data = msg.getData();
        return typeof data === 'string' ? JSON.parse(data) : JSON.parse(data.toString('utf8'));
    };
    return Listener;
}());
exports.Listener = Listener;
