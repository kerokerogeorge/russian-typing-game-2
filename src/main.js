"use strict";
exports.__esModule = true;
exports.UpdateGame = exports.returnCorrespondentLetter = exports.RusKeyArray = void 0;
var const_1 = require("./const");
var types_1 = require("./types");
var keylist_1 = require("./keylist");
var game_1 = require("./game");
var keyList = new keylist_1["default"]();
exports.RusKeyArray = keyList.RuskeysToArray();
var EngKeyArray = keyList.EngkeysToArray();
var returnCorrespondentLetter = function (pressedCode) {
    var letterInfo = const_1.letters.filter(function (e) { return e.code == pressedCode.code; });
    return letterInfo[0].keyRus;
};
exports.returnCorrespondentLetter = returnCorrespondentLetter;
var game = new game_1["default"]();
window.addEventListener('keydown', function (pressedCode) {
    game.pushedMotion(exports.returnCorrespondentLetter(pressedCode), types_1.KeyEvent.KeyDown);
    if (game.status == "Active") {
        // console.log("game.status == Active");
        game.ManageCount(pressedCode);
    }
    else {
        console.log("game.status == NonActive");
    }
});
window.addEventListener('keyup', function (pressedCode) {
    game.pushedMotion(exports.returnCorrespondentLetter(pressedCode), types_1.KeyEvent.KeyUp);
});
var UpdateGame = function () {
    var timerId = setTimeout(function () {
        game.time--;
        game.timelabel.innerHTML = "<span>" + game.time + "</span>";
        if (game.time <= 0) {
            clearTimeout(game.time);
            game.keyboardClass[game.indexOfNextKey].removeAttribute("id");
            game = new game_1["default"]();
            return;
        }
        exports.UpdateGame();
    }, 1000);
};
exports.UpdateGame = UpdateGame;
