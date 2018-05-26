"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameObject = (function () {
    function GameObject(x, y, tag) {
        this._x = 0;
        this._y = 0;
        this._width = 0;
        this._height = 0;
        this._x = x;
        this._y = y;
        var parent = document.getElementsByTagName("game")[0];
        this._div = document.createElement(tag);
        parent.appendChild(this._div);
        this._width = this._div.clientWidth;
        this._height = this._div.clientHeight;
        this.draw();
    }
    Object.defineProperty(GameObject.prototype, "x", {
        get: function () { return this._x; },
        set: function (value) { this._x = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "y", {
        get: function () { return this._y; },
        set: function (value) { this._y = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "width", {
        get: function () { return this._width; },
        set: function (v) { this._width = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "height", {
        get: function () { return this._height; },
        set: function (v) { this._height = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "div", {
        get: function () { return this._div; },
        set: function (v) { this._div = v; },
        enumerable: true,
        configurable: true
    });
    GameObject.prototype.draw = function () {
        this._div.style.transform = "translate(" + this._x + "px, " + this._y + "px)";
    };
    GameObject.prototype.remove = function () {
        this.div.remove();
        self = undefined;
    };
    GameObject.prototype.outOfBounds = function () {
        var h = window.innerHeight;
        var w = window.innerWidth;
        return (this.x <= 0 || this.x >= w) || (this.x <= 0 || this.x >= w);
    };
    GameObject.prototype.hasCollision = function (obj) {
        return (this.x < obj.x + obj.width &&
            this.x + this.width > obj.x &&
            this.y < obj.y + obj.height &&
            this.y + this.height > obj.y);
    };
    return GameObject;
}());
var Car = (function (_super) {
    __extends(Car, _super);
    function Car() {
        var _this = _super.call(this, 0, 0, 'Car') || this;
        console.log("car created");
        return _this;
    }
    Car.prototype.update = function () {
        console.log("vrooom!");
    };
    return Car;
}(GameObject));
var Game = (function () {
    function Game() {
        var _this = this;
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.getInstance = function () {
        if (!this.instance) {
            this.instance = new Game();
        }
        return this.instance;
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.gameOver = function () {
        new GameOver();
    };
    Game.container = document.getElementById("container");
    return Game;
}());
window.addEventListener("load", function () {
    var game = Game.getInstance();
});
var GameOver = (function (_super) {
    __extends(GameOver, _super);
    function GameOver() {
        var _this = _super.call(this, window.innerWidth / 2 - 50, window.innerHeight / 2 - 25, "gameover") || this;
        _this.div.innerHTML = "GAME OVER";
        return _this;
    }
    GameOver.prototype.update = function () { };
    return GameOver;
}(GameObject));
var MoveBehaviour = (function () {
    function MoveBehaviour(context) {
        this.context = context;
    }
    return MoveBehaviour;
}());
var MoveableObject = (function (_super) {
    __extends(MoveableObject, _super);
    function MoveableObject(x, y) {
        var _this = _super.call(this, x, y, 'movable_object') || this;
        _this.setMoveBehaviour(_this.moveBehaviour);
        return _this;
    }
    MoveableObject.prototype.setMoveBehaviour = function (behaviour) {
        this.moveBehaviour = behaviour;
    };
    return MoveableObject;
}(GameObject));
var UI = (function () {
    function UI(game) {
        this.life = 100;
        this.coindiv = document.getElementsByTagName("counter")[0];
        this.coindiv.innerHTML = "100";
        this.lifediv = document.querySelector("lifebar progressbar");
        this.lifediv.style.width = this.life + "%";
        this.lifediv.classList.add("blinking");
    }
    UI.prototype.decreaseLife = function (amount) {
        this.life -= amount;
        this.lifediv.style.width = this.life + "%";
    };
    return UI;
}());
var Util = (function () {
    function Util() {
    }
    Util.checkCollisions = function (object, arr) {
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var object2 = arr_1[_i];
            if (Util.checkCollision(object, object2)) {
                return true;
            }
            else {
                return false;
            }
        }
    };
    Util.checkCollision = function (rect1, rect2) {
        return (rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.height + rect1.y > rect2.y);
    };
    return Util;
}());
//# sourceMappingURL=main.js.map