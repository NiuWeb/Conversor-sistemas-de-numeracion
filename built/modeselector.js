"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModeSelector = void 0;
var ModeSelector = /** @class */ (function () {
    function ModeSelector(list, converter) {
        var _this = this;
        this.list = list;
        this.converter = converter;
        var _loop_1 = function (i) {
            var node = this_1.list[i];
            var value = this_1.getNodeValue(node);
            var callback = function () {
                _this.selectMode(node);
            };
            if (value == this_1.converter.mode) {
                callback();
            }
            node.addEventListener("click", callback);
        };
        var this_1 = this;
        for (var i = 0; i < this.list.length; i++) {
            _loop_1(i);
        }
    }
    ModeSelector.prototype.getNodeValue = function (node) {
        var val = node.getAttribute("value");
        if (val == null) {
            return null;
        }
        return parseInt(val);
    };
    ModeSelector.prototype.selectMode = function (node) {
        var value = this.getNodeValue(node);
        if (value == null) {
            return;
        }
        this.converter.mode = value;
        for (var i = 0; i < this.list.length; i++) {
            var _node = this.list[i];
            if (node == _node) {
                _node.setAttribute("class", "mode selected");
            }
            else {
                _node.setAttribute("class", "mode");
            }
        }
    };
    return ModeSelector;
}());
exports.ModeSelector = ModeSelector;
