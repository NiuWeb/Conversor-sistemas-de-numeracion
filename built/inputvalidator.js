"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputValidator = void 0;
var InputValidator = /** @class */ (function () {
    function InputValidator(input, converter) {
        var _this = this;
        this.input = input;
        this.converter = converter;
        var call = function () {
            _this.validate();
        };
        this.input.addEventListener("keyup", call);
        this.input.addEventListener("keydown", call);
        this.input.addEventListener("keypress", call);
        this.input.addEventListener("change", call);
    }
    InputValidator.prototype.validate = function () {
        var _this = this;
        var str = this.input.value.toUpperCase();
        var valid = str.split('').filter(function (c) {
            return _this.converter.symbols.indexOf(c) >= 0;
        });
        this.input.value = valid.join("");
        this.converter.input = this.input.value;
    };
    return InputValidator;
}());
exports.InputValidator = InputValidator;
