"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var modeselector_1 = require("./modeselector");
var converter_1 = require("./converter");
var inputvalidator_1 = require("./inputvalidator");
var modes = document.querySelectorAll("#mode-list .mode");
var input = document.getElementById("input");
var converter = new converter_1.Converter("0123456789ABCDEF", 10);
new modeselector_1.ModeSelector(modes, converter);
new inputvalidator_1.InputValidator(input, converter);
converter.onconvert = function (result) {
    input.value = result;
};
