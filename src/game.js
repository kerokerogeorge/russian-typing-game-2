"use strict";
exports.__esModule = true;
var const_1 = require("./const");
var types_1 = require("./types");
var main_1 = require("./main");
var Game = /** @class */ (function () {
    function Game() {
        var _this = this;
        this.targetElement = document.getElementById('target');
        this.timelabel = document.getElementById('timer');
        this.settedWord = "Click here to start";
        this.targetElement.innerHTML = this.settedWord;
        this.time = 10;
        this.status = "NonActive";
        this.currentWordLocation = 0;
        this.score = 0;
        this.keyboardClass = document.getElementsByClassName('key');
        this.indexOfNextKey = 0;
        this.targetElement.addEventListener('click', function () {
            if (_this.status == "NonActive") {
                _this.status = "Active";
                _this.SetTarget();
                main_1.UpdateGame();
                _this.GetTargetLetter();
            }
            else {
                console.log("already active!!!!");
                return;
            }
        });
        this.timelabel.innerHTML = "<span>" + this.time + "</span>";
        this.status = "NonActive";
    }
    Game.prototype.SetTarget = function () {
        this.settedWord = const_1.words[Math.floor(Math.random() * Object.keys(const_1.words).length)][0];
        this.targetElement.innerHTML = this.settedWord;
        this.currentWordLocation = 0;
    };
    Game.prototype.ManageCount = function (pressedcode) {
        if (main_1.returnCorrespondentLetter(pressedcode) === this.settedWord[this.currentWordLocation]) {
            // console.log("正解です");
            this.AddCount();
        }
        else {
            // console.log("間違えたキーを押しています");
        }
    };
    Game.prototype.AddCount = function () {
        console.log("in AddCount()：現在のキー：" + this.settedWord[this.currentWordLocation]);
        this.currentWordLocation++;
        console.log("in AddCount()；次のキー；" + this.settedWord[this.currentWordLocation]);
        this.DecorateCorrectWord();
        if (this.currentWordLocation === this.settedWord.length && this.status == "Active") {
            this.SetTarget();
            this.AddScore();
        }
    };
    Game.prototype.DecorateCorrectWord = function () {
        var decoratedWord = this.settedWord.slice(0, this.currentWordLocation);
        this.targetElement.innerHTML = "<span class=\"correct\">" + decoratedWord + "</span>" + this.settedWord.substring(this.currentWordLocation);
    };
    Game.prototype.AddScore = function () {
        this.score++;
        console.log(this.score);
    };
    Game.prototype.pushedMotion = function (pressedKey, eventType) {
        var indexOfRusKey = main_1.RusKeyArray.indexOf(pressedKey);
        this.indexOfNextKey = main_1.RusKeyArray.indexOf(this.settedWord[this.currentWordLocation]);
        if (eventType === types_1.KeyEvent.KeyDown) {
            if (this.status == "Active") {
                this.keyboardClass[this.indexOfNextKey].removeAttribute("id");
            }
            this.keyboardClass[indexOfRusKey].classList.add("pushed");
        }
        if (eventType === types_1.KeyEvent.KeyUp) {
            this.keyboardClass[indexOfRusKey].classList.remove("pushed");
            if (this.status == "Active") {
                this.keyboardClass[this.indexOfNextKey].setAttribute("id", "next-key");
            }
        }
    };
    // 対象のキーボードの色を変更する:最初
    Game.prototype.GetTargetLetter = function () {
        this.indexOfNextKey = main_1.RusKeyArray.indexOf(this.settedWord[this.currentWordLocation]);
        this.keyboardClass[this.indexOfNextKey].setAttribute("id", "next-key");
    };
    return Game;
}());
exports["default"] = Game;
