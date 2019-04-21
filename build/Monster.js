"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Entity_1 = require("./Entity");
var Monster = /** @class */ (function (_super) {
    __extends(Monster, _super);
    function Monster(player, x, y, r) {
        var _this = _super.call(this, x, y, r) || this;
        _this.player = player;
        return _this;
    }
    return Monster;
}(Entity_1.Entity));
exports.Monster = Monster;
//# sourceMappingURL=Monster.js.map