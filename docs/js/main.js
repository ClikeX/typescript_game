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
var Game = (function () {
    function Game() {
        var _this = this;
        requestAnimationFrame(function () { return _this.gameLoop(); });
        this._player_ship = new Spaceship();
        this.projectiles = new Array();
    }
    Game.getInstance = function () {
        if (!this.instance) {
            this.instance = new Game();
        }
        return this.instance;
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        this._player_ship.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
        if (this._player_ship.x == -150) {
            this.gameOver();
        }
        this.projectiles.forEach(function (projectile) {
            projectile.update();
        });
    };
    Game.prototype.gameOver = function () {
        new GameOver();
    };
    Game.container = document.getElementById("container");
    return Game;
}());
window.addEventListener("load", function () {
    Game.getInstance();
});
var UI = (function () {
    function UI() {
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
    Util.clamp = function (num, min, max) {
        return num <= min ? min : num >= max ? max : num;
    };
    return Util;
}());
var GameObject = (function () {
    function GameObject(x, y, tag) {
        this._x = 0;
        this._y = 0;
        this._width = 0;
        this._height = 0;
        this._x = x;
        this._y = y;
        this._parent = document.getElementsByTagName("container")[0];
        this._div = document.createElement(tag);
        this._parent.appendChild(this._div);
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
    };
    GameObject.prototype.outOfBounds = function () {
        var h = parent.innerHeight;
        var w = parent.innerWidth;
        return (this.x <= 0 || this.x >= w) || (this.y <= 0 || this.y >= h);
    };
    GameObject.prototype.keepFromOutOfBounds = function () {
        this.x = Util.clamp(this.x, 0, (this._parent.offsetWidth - this._div.offsetWidth));
        this.y = Util.clamp(this.y, 0, (this._parent.offsetHeight - this._div.offsetHeight));
    };
    GameObject.prototype.hasCollision = function (obj) {
        return (this.x < obj.x + obj.width &&
            this.x + this.width > obj.x &&
            this.y < obj.y + obj.height &&
            this.y + this.height > obj.y);
    };
    return GameObject;
}());
var MoveBehaviour = (function () {
    function MoveBehaviour(context) {
        this._ySpeed = 0;
        this._xSpeed = 0;
        this.context = context;
    }
    Object.defineProperty(MoveBehaviour.prototype, "xSpeed", {
        get: function () { return this._xSpeed; },
        set: function (speed) { this._xSpeed = speed; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MoveBehaviour.prototype, "ySpeed", {
        get: function () { return this._ySpeed; },
        set: function (speed) { this._ySpeed = speed; },
        enumerable: true,
        configurable: true
    });
    return MoveBehaviour;
}());
var MoveableObject = (function (_super) {
    __extends(MoveableObject, _super);
    function MoveableObject(x, y, tag) {
        return _super.call(this, x, y, tag) || this;
    }
    Object.defineProperty(MoveableObject.prototype, "moveBehaviour", {
        get: function () { return this._moveBehaviour; },
        set: function (behaviour) { this._moveBehaviour = behaviour; },
        enumerable: true,
        configurable: true
    });
    MoveableObject.prototype.move = function () {
    };
    return MoveableObject;
}(GameObject));
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet(context) {
        var _this = _super.call(this, (context.x + (context.width / 2)), (context.y - (context.height / 2)), 'Bullet') || this;
        _this.moveBehaviour = new StraightMoveBehaviour(_this);
        _this.moveBehaviour.xSpeed = 5;
        return _this;
    }
    Bullet.prototype.update = function () {
        this.moveBehaviour.move();
        if (this.outOfBounds()) {
            this.remove();
        }
        this.draw();
    };
    return Bullet;
}(MoveableObject));
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
var Spaceship = (function (_super) {
    __extends(Spaceship, _super);
    function Spaceship() {
        var _this = _super.call(this, 100, 130, 'Spaceship') || this;
        console.log("Spaceship created");
        _this.moveBehaviour = new PlayertMoveBehaviour(_this);
        _this.shootBehaviour = new PlayertShootBehaviour(_this);
        return _this;
    }
    Object.defineProperty(Spaceship.prototype, "shootBehaviour", {
        get: function () { return this._shootBehaviour; },
        set: function (behaviour) { this._shootBehaviour = behaviour; },
        enumerable: true,
        configurable: true
    });
    Spaceship.prototype.update = function () {
        this.moveBehaviour.move();
        this.keepFromOutOfBounds();
        this.draw();
    };
    return Spaceship;
}(MoveableObject));
var PlayertMoveBehaviour = (function (_super) {
    __extends(PlayertMoveBehaviour, _super);
    function PlayertMoveBehaviour(context) {
        var _this = _super.call(this, context) || this;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        return _this;
    }
    PlayertMoveBehaviour.prototype.move = function () {
        this.context.x += this._xSpeed;
        this.context.y += this._ySpeed;
    };
    PlayertMoveBehaviour.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case 87:
                this.context.div.style.backgroundImage = "url('../images/starship/starship1Up.png')";
                this._ySpeed = -5;
                break;
            case 83:
                this.context.div.style.backgroundImage = "url('../images/starship/starship1Down.png')";
                this._ySpeed = 5;
                break;
            case 65:
                this._xSpeed = -5;
                break;
            case 68:
                this._xSpeed = 5;
                break;
        }
    };
    PlayertMoveBehaviour.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case 87:
                this.context.div.style.backgroundImage = "";
                this._ySpeed = 0;
                break;
            case 83:
                this.context.div.style.backgroundImage = "";
                this._ySpeed = 0;
                break;
            case 65:
                this._xSpeed = 0;
                break;
            case 68:
                this._xSpeed = 0;
                break;
        }
    };
    return PlayertMoveBehaviour;
}(MoveBehaviour));
var StraightMoveBehaviour = (function (_super) {
    __extends(StraightMoveBehaviour, _super);
    function StraightMoveBehaviour(context) {
        return _super.call(this, context) || this;
    }
    StraightMoveBehaviour.prototype.move = function () {
        this.context.x += this._xSpeed;
    };
    return StraightMoveBehaviour;
}(MoveBehaviour));
var ShootBehaviour = (function () {
    function ShootBehaviour(context) {
        this.context = context;
    }
    return ShootBehaviour;
}());
var PlayertShootBehaviour = (function (_super) {
    __extends(PlayertShootBehaviour, _super);
    function PlayertShootBehaviour(context) {
        var _this = _super.call(this, context) || this;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        return _this;
    }
    PlayertShootBehaviour.prototype.shoot = function () {
        console.log("shooting");
        Game.getInstance().projectiles.push(new Bullet(this.context));
    };
    PlayertShootBehaviour.prototype.onKeyDown = function (event) {
        console.log(event.keyCode);
        switch (event.keyCode) {
            case 32:
                this.shoot();
                break;
        }
    };
    return PlayertShootBehaviour;
}(ShootBehaviour));
//# sourceMappingURL=main.js.map