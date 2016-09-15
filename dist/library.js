"use strict";
var Library = (function () {
    function Library() {
        var _this = this;
        this.airports = {};
        require('../data/airports.json').map(function (a) {
            _this.airports[a.id.toLowerCase()] = a;
        });
    }
    Library.prototype.getAirports = function (mode) {
        if (mode === void 0) { mode = ''; }
        return this.prepareData(this.airports, mode);
    };
    Library.prototype.getAirport = function (id) {
        if (this.airports.hasOwnProperty(id)) {
            return this.airports[id];
        }
        return null;
    };
    Library.prototype.prepareData = function (dict, mode) {
        if (mode === 'list') {
            var result = [];
            for (var key in dict) {
                result.push(dict[key]);
            }
            return result;
        }
        else {
            return dict;
        }
    };
    return Library;
}());
exports.Library = Library;
