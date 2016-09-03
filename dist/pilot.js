"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var client_1 = require('./client');
var Pilot = (function (_super) {
    __extends(Pilot, _super);
    function Pilot(data) {
        _super.call(this, data);
    }
    return Pilot;
}(client_1.Client));
exports.Pilot = Pilot;
