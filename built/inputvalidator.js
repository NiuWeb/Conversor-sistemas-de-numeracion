"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputValidator = void 0;
var InputValidator = /** @class */ (function () {
    /**
     * Crea un nuevo validador que escuche y controle los cambios de
     * contenido de un <input>
     * @param input El elemento <input> a validar
     * @param converter El convertidor a manejar
     */
    function InputValidator(input, converter) {
        var _this = this;
        this.input = input;
        this.converter = converter;
        // método de validación sin perder el this
        var call = function () {
            _this.validate();
        };
        // reconocer cambios de valor en el input
        this.input.addEventListener("keyup", call);
        this.input.addEventListener("keydown", call);
        this.input.addEventListener("keypress", call);
        this.input.addEventListener("change", call);
    }
    /**
     * Limpiar caracteres inválidos
     */
    InputValidator.prototype.validate = function () {
        var _this = this;
        // convertir a mayúsculas
        var str = this.input.value.toUpperCase();
        // buscar solo caracteres que estén en el set de símbolos del convertidor
        var valid = str.split('').filter(function (c) {
            return _this.converter.symbols.indexOf(c) >= 0 || c == '.';
        });
        // unir caracteres
        this.input.value = valid.join("");
        // establecer como valor del convertidor
        this.converter.input = this.input.value;
    };
    return InputValidator;
}());
exports.InputValidator = InputValidator;
