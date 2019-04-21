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
var Util_1 = require("./Util");
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(x, y) {
        var _this = _super.call(this, x, y, Player.RADIUS) || this;
        _this.targetX = 0;
        _this.targetY = 0;
        _this.swordAngle = 0;
        _this.attackProgress = null;
        return _this;
    }
    Player.prototype.drawImageCenter = function (context, x, y, cx, cy, scale, rotation) {
        context.save();
        context.setTransform(scale, 0, 0, scale, x, y); // sets scale and origin
        context.rotate(rotation);
        context.drawImage(Player.image, -cx, -cy);
        context.restore();
    };
    Player.prototype.draw = function (context) {
        _super.prototype.draw.call(this, context);
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.x + Player.SWORD_LENGTH * Math.cos(this.swordAngle), this.y + Player.SWORD_LENGTH * Math.sin(this.swordAngle));
        context.strokeStyle = "black";
        context.lineCap = "round";
        context.lineWidth = 5;
        context.stroke();
        this.drawImageCenter(context, this.x, this.y, Player.RADIUS, Player.RADIUS, 1, this.swordAngle);
        // context.fillStyle = "#d22"
        // context.beginPath()
        // context.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
        // context.fill()
    };
    Player.prototype.step = function (seconds) {
        if (this.attackProgress == null) {
            var dx = this.x - this.targetX;
            var dy = this.y - this.targetY;
            var lenActual = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
            var lenDesired = Player.SPEED * seconds;
            if (lenActual <= lenDesired) {
                return;
            }
            this.x -= dx * (lenDesired / lenActual);
            this.y -= dy * (lenDesired / lenActual);
            this.swordAngle = Math.atan2(dy, dx) + Math.PI / 2;
        }
        else {
            var addedAttackProgress = seconds / Player.ATTACK_TIME;
            this.swordAngle += addedAttackProgress * Player.ATTACK_ANGLE;
            this.attackProgress += addedAttackProgress;
            if (this.attackProgress >= 1) {
                this.attackProgress = null;
            }
        }
    };
    Player.prototype.checkSwordCollision = function (entity) {
        if (this.attackProgress == null)
            return false;
        for (var i = 0; i <= Player.SWORD_STEPS; i++) {
            var swordX = this.x + Math.cos(this.swordAngle) * i / Player.SWORD_STEPS * Player.SWORD_LENGTH;
            var swordY = this.y + Math.sin(this.swordAngle) * i / Player.SWORD_STEPS * Player.SWORD_LENGTH;
            if (Util_1.hypot(entity.x - swordX, entity.y - swordY) < entity.r) {
                return true;
            }
        }
        return false;
    };
    Player.RADIUS = 23;
    Player.SWORD_LENGTH = 100;
    Player.SWORD_STEPS = 10;
    Player.SPEED = 160;
    Player.ATTACK_TIME = 0.3;
    Player.ATTACK_ANGLE = Math.PI;
    Player.image = document.getElementById('meatball');
    return Player;
}(Entity_1.Entity));
exports.Player = Player;
//# sourceMappingURL=Player.js.map