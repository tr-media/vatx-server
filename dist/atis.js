"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var client_1 = require('./client');
var Atis = (function (_super) {
    __extends(Atis, _super);
    function Atis(data) {
        _super.call(this, data);
    }
    return Atis;
}(client_1.Client));
exports.Atis = Atis;
