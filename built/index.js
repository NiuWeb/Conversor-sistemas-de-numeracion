"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var modeselector_1 = require("./modeselector");
var converter_1 = require("./converter");
var inputvalidator_1 = require("./inputvalidator");
// Lista de botones para cambiar base del sistema
var modes = document.querySelectorAll("#mode-list .mode");
// Entrada de número a convertir
var input = document.getElementById("input");
// Convertidor de números, con la secuencia de caracteres alfanumérica (16) y
// base decimal por defecto.
var converter = new converter_1.Converter("0123456789ABCDEF", 10);
new modeselector_1.ModeSelector(modes, converter); // Iniciar selección de modos
new inputvalidator_1.InputValidator(input, converter); // Iniciar validación de datos del input
// Cambiar valor del input cuando el convertidor realice una operación
converter.onconvert = function (result) {
    input.value = result;
};
