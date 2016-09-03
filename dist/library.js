"use strict";
var Library = (function () {
    function Library() {
        var _this = this;
        this.airports = {};
        require('../data/airports.json').map(function (a) {
            _this.airports[a.id.toLowerCase()] = a;
        });
    }
    Library.prototype.getAirports = function () {
        return this.airports;
    };
    Library.prototype.getAirport = function (id) {
        if (this.airports.hasOwnProperty(id)) {
            return this.airports[id];
        }
        return null;
    };
    return Library;
}());
exports.Library = Library;
