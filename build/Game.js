"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Player_1 = require("./Player");
var FollowMonster_1 = require("./FollowMonster");
var Util_1 = require("./Util");
var howler_1 = require("howler");
var Game = /** @class */ (function () {
    function Game(width, height) {
        this.width = width;
        this.height = height;
        this.monsters = [];
        this.score = 0;
        this.player = new Player_1.Player(width / 2, height / 2);
        for (var i = 0; i < 5; i++) {
            this.addMonsterRandom();
        }
        this.loadSounds();
    }
    Game.prototype.loadSounds = function () {
        var DEATH_SOUND_PERIOD = 2000;
        var DEATH_SOUND_LENGTH = 500;
        var sprite = {};
        for (var i = 0; i < Game.DEATH_SOUND_N; i++) {
            sprite[i] = [i * DEATH_SOUND_PERIOD, DEATH_SOUND_LENGTH];
        }
        this.deathSounds = new howler_1.Howl({
            src: ['../assets/au2.mp3'],
            sprite: sprite,
        });
    };
    Game.prototype.gameOver = function () {
        var sound = new howler_1.Howl({
            src: ['../assets/ugh1.mp3'],
            volume: 0.5,
            rate: Math.random() * 0.4 + 0.9
        });
        this.monsters = [];
        sound.play();
        this.score = 0;
    };
    Game.prototype.evaluateCollisions = function () {
        var _this = this;
        this.monsters = this.monsters.filter(function (entity) {
            if (_this.player.checkSwordCollision(entity)) {
                _this.monsterDead();
                _this.score++;
                return false;
            }
            else {
                return true;
            }
        });
        this.monsters.forEach(function (monster) {
            if (Util_1.hypot(_this.player.x - monster.x, _this.player.y - monster.y) < monster.r + _this.player.r) {
                _this.gameOver();
            }
        });
    };
    Game.prototype.addMonsterRandom = function () {
        var oldSize = this.monsters.length;
        do {
            var x = Math.random() * this.width;
            var y = Math.random() * this.height;
            if (Util_1.hypot(this.player.x - x, this.player.y - y) > this.width / 2)
                this.monsters.push(new FollowMonster_1.FollowMonster(this.player, x, y));
        } while (oldSize == this.monsters.length);
    };
    Game.prototype.monsterDead = function () {
        var i = Math.floor(Math.random() * Game.DEATH_SOUND_N);
        this.deathSounds.play("" + i);
        // var sound = new Howl({
        //     src: ['../assets/au1.mp3'],
        //     volume: 0.5,
        //     rate: Math.random() * 0.4 + 0.9
        // })
        //
        // sound.play()
    };
    Game.prototype.step = function (seconds) {
        this.player.step(seconds);
        this.monsters.forEach(function (entity) { return entity.step(seconds); });
        this.evaluateCollisions();
        var wantMonsters = 5 + Math.floor(this.score / 10);
        while (this.monsters.length < wantMonsters) {
            this.addMonsterRandom();
        }
    };
    Game.prototype.drawAll = function (context) {
        context.clearRect(0, 0, this.width, this.height);
        context.font = "60px Arial";
        context.fillStyle = 'rgb(240,200,200)';
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText("" + this.score, this.width / 2, this.height / 2);
        this.player.draw(context);
        this.monsters.forEach(function (entity) { return entity.draw(context); });
    };
    Game.prototype.handleMouseMove = function (x, y) {
        this.player.targetX = x;
        this.player.targetY = y;
    };
    Game.prototype.handleMouseDown = function (x, y) {
        if (this.player.attackProgress === null) {
            this.player.attackProgress = 0;
        }
    };
    Game.DEATH_SOUND_N = 8;
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=Game.js.map