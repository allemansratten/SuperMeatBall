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
var Monster_1 = require("./Monster");
var FollowMonster = /** @class */ (function (_super) {
    __extends(FollowMonster, _super);
    function FollowMonster(player, x, y) {
        var _this = _super.call(this, player, x, y, FollowMonster.RADIUS) || this;
        _this.angle = 0;
        _this.angle = _this.angleToPlayer();
        return _this;
    }
    FollowMonster.angleDistance = function (a1, a2) {
        var dif1 = Math.abs(a1 - a2);
        var dif2 = Math.abs(a1 - a2 - Math.PI * 2);
        var dif3 = Math.abs(a1 - a2 + Math.PI * 2);
        return Math.min(dif1, dif2, dif3);
    };
    FollowMonster.prototype.angleToPlayer = function () {
        return Math.atan2(this.player.y - this.y, this.player.x - this.x);
    };
    FollowMonster.prototype.step = function (seconds) {
        var newAngle = this.angleToPlayer();
        var angleDif = Math.min(FollowMonster.angleDistance(newAngle, this.angle), FollowMonster.ANGLE_SPEED_MAX * seconds);
        var a1 = this.angle + angleDif;
        var a2 = this.angle - angleDif;
        if (FollowMonster.angleDistance(a1, newAngle) < FollowMonster.angleDistance(a2, newAngle)) {
            this.angle = a1;
        }
        else {
            this.angle = a2;
        }
        this.x += FollowMonster.SPEED * seconds * Math.cos(this.angle);
        this.y += FollowMonster.SPEED * seconds * Math.sin(this.angle);
    };
    FollowMonster.prototype.draw = function (context) {
        context.fillStyle = "#2fa";
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        context.fill();
    };
    FollowMonster.RADIUS = 20;
    FollowMonster.ANGLE_SPEED_MAX = Math.PI / 2;
    FollowMonster.SPEED = 100;
    return FollowMonster;
}(Monster_1.Monster));
exports.FollowMonster = FollowMonster;
//# sourceMappingURL=FollowMonster.js.map