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
        this.container = document.getElementsByTagName("container")[0];
        this._game_active = true;
        this._wave = 0;
        this._score = 0;
        this._scoreboard = new Scoreboard();
        this._wavecounter = new WaveCounter();
        this._player_ship = new Player();
        this.projectiles = new Array();
        this.enemies = new Array();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Object.defineProperty(Game.prototype, "score", {
        get: function () { return this._score; },
        set: function (score) {
            this._score += score;
            console.log("Score: " + this._score);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "wave", {
        get: function () { return this._wave; },
        enumerable: true,
        configurable: true
    });
    Game.instance = function () {
        if (!this._instance) {
            this._instance = new Game();
        }
        return this._instance;
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        this._player_ship.update();
        this._scoreboard.update();
        this._wavecounter.update();
        this.projectiles.forEach(function (projectile) {
            projectile.update();
        });
        this.enemies.forEach(function (enemy) {
            if (enemy.hasCollision(_this._player_ship)) {
                _this.gameOver();
            }
            enemy.hasCollisions(_this.projectiles, function (enemy, projectile) {
                Game.instance().score = enemy.score;
                enemy.hit();
                projectile.remove();
            });
            enemy.update();
        });
        if (this.enemies.length <= 0) {
            this._wave += 1;
            EnemyFactory.create((5 + this._wave), window.innerWidth - 50, 20, 180);
        }
        if (this._game_active) {
            requestAnimationFrame(function () { return _this.gameLoop(); });
        }
    };
    Game.prototype.gameOver = function () {
        this._game_active = false;
        new GameOver();
    };
    return Game;
}());
window.addEventListener("load", function () {
    Game.instance();
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
        var val = false;
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var object2 = arr_1[_i];
            if (Util.checkCollision(object, object2)) {
                val = true;
            }
            else {
                val = false;
            }
        }
        return val;
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
    Util.removeFromArray = function (array, object) {
        array.splice(array.indexOf(object), 1);
    };
    return Util;
}());
var EnemyFactory = (function () {
    function EnemyFactory() {
    }
    EnemyFactory.create = function (amount, x, minY, maxY) {
        for (var index = 0; index <= amount; index++) {
            var y_pos = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
            Game.instance().enemies.push(new BasicEnemy(x, y_pos));
        }
    };
    return EnemyFactory;
}());
var Drawable = (function () {
    function Drawable(x, y, tag) {
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
    Object.defineProperty(Drawable.prototype, "x", {
        get: function () { return this._x; },
        set: function (value) { this._x = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Drawable.prototype, "y", {
        get: function () { return this._y; },
        set: function (value) { this._y = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Drawable.prototype, "width", {
        get: function () { return this._width; },
        set: function (v) { this._width = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Drawable.prototype, "height", {
        get: function () { return this._height; },
        set: function (v) { this._height = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Drawable.prototype, "div", {
        get: function () { return this._div; },
        set: function (v) { this._div = v; },
        enumerable: true,
        configurable: true
    });
    Drawable.prototype.draw = function () {
        this._div.style.transform = "translate(" + this._x + "px, " + this._y + "px)";
    };
    Drawable.prototype.remove = function () {
        this.div.remove();
    };
    return Drawable;
}());
var GameObject = (function (_super) {
    __extends(GameObject, _super);
    function GameObject(x, y, tag) {
        return _super.call(this, x, y, tag) || this;
    }
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
        if (this.x < obj.x + obj.width &&
            this.x + this.width > obj.x &&
            this.y < obj.y + obj.height &&
            this.y + this.height > obj.y) {
            return true;
        }
        else {
            return false;
        }
    };
    GameObject.prototype.hasCollisions = function (array, func) {
        for (var index = 0; index < array.length; index++) {
            var element = array[index];
            if (this.hasCollision(element)) {
                func(this, element);
                break;
            }
        }
    };
    return GameObject;
}(Drawable));
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
        this._moveBehaviour.move();
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
        if (this.outOfBounds()) {
            this.remove();
        }
        this.move();
        this.draw();
    };
    Bullet.prototype.remove = function () {
        _super.prototype.remove.call(this);
        Util.removeFromArray(Game.instance().projectiles, this);
    };
    Bullet.prototype.collide = function () {
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
    GameOver.prototype.collide = function () {
    };
    return GameOver;
}(Drawable));
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this, 100, 130, 'player') || this;
        console.log("Player created");
        _this.moveBehaviour = new PlayertMoveBehaviour(_this);
        _this.shootBehaviour = new PlayertShootBehaviour(_this);
        return _this;
    }
    Object.defineProperty(Player.prototype, "shootBehaviour", {
        get: function () { return this._shootBehaviour; },
        set: function (behaviour) { this._shootBehaviour = behaviour; },
        enumerable: true,
        configurable: true
    });
    Player.prototype.update = function () {
        this.move();
        this.keepFromOutOfBounds();
        this.draw();
    };
    return Player;
}(MoveableObject));
var Scoreboard = (function (_super) {
    __extends(Scoreboard, _super);
    function Scoreboard() {
        return _super.call(this, 10, window.innerHeight / 10, "scoreboard") || this;
    }
    Scoreboard.prototype.update = function () {
        this.div.innerHTML = "Score: " + Game.instance().score.toString();
    };
    return Scoreboard;
}(Drawable));
var WaveCounter = (function (_super) {
    __extends(WaveCounter, _super);
    function WaveCounter() {
        return _super.call(this, 10, window.innerHeight / 20, "wavecounter") || this;
    }
    WaveCounter.prototype.update = function () {
        this.div.innerHTML = "Wave: " + Game.instance().wave.toString();
    };
    return WaveCounter;
}(Drawable));
var AbstractEnemy = (function (_super) {
    __extends(AbstractEnemy, _super);
    function AbstractEnemy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AbstractEnemy.prototype, "score", {
        get: function () { return this._score; },
        enumerable: true,
        configurable: true
    });
    AbstractEnemy.prototype.hit = function () {
        Game.instance().enemies.forEach(function (e) {
            e.notify();
        });
        this.remove();
    };
    return AbstractEnemy;
}(MoveableObject));
var BasicEnemy = (function (_super) {
    __extends(BasicEnemy, _super);
    function BasicEnemy(x, y) {
        var _this = _super.call(this, x, y, 'enemy') || this;
        _this._score = 5;
        _this.moveBehaviour = new StraightMoveBehaviour(_this);
        _this.moveBehaviour.xSpeed = (-3 - Game.instance().wave);
        return _this;
    }
    Object.defineProperty(BasicEnemy.prototype, "shootBehaviour", {
        get: function () { return this._shootBehaviour; },
        enumerable: true,
        configurable: true
    });
    BasicEnemy.prototype.update = function () {
        if (this.outOfBounds()) {
            this.remove();
        }
        this.move();
        this.draw();
    };
    BasicEnemy.prototype.remove = function () {
        _super.prototype.remove.call(this);
        Util.removeFromArray(Game.instance().enemies, this);
    };
    BasicEnemy.prototype.notify = function () {
        this.moveBehaviour.xSpeed += -1;
    };
    return BasicEnemy;
}(AbstractEnemy));
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
                this._ySpeed = -5;
                this.context.div.classList.add("up");
                break;
            case 83:
                this.context.div.classList.add("down");
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
                this._ySpeed = 0;
                this.context.div.classList.remove("up");
                break;
            case 83:
                this._ySpeed = 0;
                this.context.div.classList.remove("down");
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
        window.addEventListener("keyup", function (e) { return _this.onKeyDown(e); });
        return _this;
    }
    PlayertShootBehaviour.prototype.shoot = function () {
        Game.instance().projectiles.push(new Bullet(this.context));
    };
    PlayertShootBehaviour.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case 32:
                this.shoot();
                break;
        }
    };
    return PlayertShootBehaviour;
}(ShootBehaviour));
//# sourceMappingURL=main.js.map