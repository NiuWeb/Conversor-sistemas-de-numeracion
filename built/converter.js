"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Converter = void 0;
var Converter = /** @class */ (function () {
    function Converter(symbols, mode) {
        this._input = "";
        this.onconvert = null;
        this._symbols = symbols;
        this._mode = mode;
    }
    Object.defineProperty(Converter.prototype, "symbols", {
        get: function () {
            return this._symbols.substring(0, this._mode);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Converter.prototype, "mode", {
        get: function () {
            return this._mode;
        },
        set: function (mode) {
            var _a;
            this._input = this.convert(mode);
            (_a = this.onconvert) === null || _a === void 0 ? void 0 : _a.apply(this, [this._input]);
            this._mode = mode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Converter.prototype, "result", {
        get: function () {
            return this._input;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Converter.prototype, "input", {
        set: function (input) {
            this._input = input;
        },
        enumerable: false,
        configurable: true
    });
    Converter.prototype.convert = function (to) {
        var parts = this._input.split(/\.+/);
        var res = parts[0];
        var dec = 0;
        for (var i = res.length - 1; i >= 0; i--) {
            var val = res.length - 1 - i;
            var chr = res[i];
            var pos = this._symbols.indexOf(chr);
            dec += pos * Math.pow(this._mode, val);
        }
        res = "";
        while (dec > 0) {
            var mod = dec % to;
            dec = Math.floor(dec / to);
            res = this._symbols[mod] + res;
        }
        var res2 = "";
        if (parts.length == 2) {
            dec = 0;
            res2 = parts[1];
            for (var i = 0; i < res2.length; i++) {
                var val = -1 - i;
                var chr = res2[i];
                var pos = this._symbols.indexOf(chr);
                dec += pos * Math.pow(this._mode, val);
            }
            res2 = "";
            var approx = 5;
            while (approx-- > 0) {
                dec *= to;
                var int = Math.floor(dec);
                res2 += this._symbols[int];
                dec -= int;
            }
        }
        return res + (res2 == "" ? "" : "." + res2);
    };
    return Converter;
}());
exports.Converter = Converter;
