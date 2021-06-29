var KeyEvent;
(function (KeyEvent) {
    KeyEvent[KeyEvent["KeyDown"] = 0] = "KeyDown";
    KeyEvent[KeyEvent["KeyUp"] = 1] = "KeyUp";
})(KeyEvent || (KeyEvent = {}));
var letters = [
    { code: 'KeyQ', keyRus: 'й' },
    { code: 'KeyW', keyRus: 'ц' },
    { code: 'KeyE', keyRus: 'у' },
    { code: 'KeyR', keyRus: 'к' },
    { code: 'KeyT', keyRus: 'е' },
    { code: 'KeyY', keyRus: 'н' },
    { code: 'KeyU', keyRus: 'г' },
    { code: 'KeyI', keyRus: 'ш' },
    { code: 'KeyO', keyRus: 'щ' },
    { code: 'KeyP', keyRus: 'з' },
    { code: 'BracketLeft', keyRus: 'х' },
    { code: 'BracketRight', keyRus: 'ъ' },
    { code: 'KeyA', keyRus: 'ф' },
    { code: 'KeyS', keyRus: 'ы' },
    { code: 'KeyD', keyRus: 'в' },
    { code: 'KeyF', keyRus: 'а' },
    { code: 'KeyG', keyRus: 'п' },
    { code: 'KeyH', keyRus: 'р' },
    { code: 'KeyJ', keyRus: 'о' },
    { code: 'KeyK', keyRus: 'л' },
    { code: 'KeyL', keyRus: 'д' },
    { code: 'Semicolon', keyRus: 'ж' },
    { code: 'Quote', keyRus: 'э' },
    { code: 'Backslash', keyRus: 'ё' },
    { code: 'KeyZ', keyRus: 'я' },
    { code: 'KeyX', keyRus: 'ч' },
    { code: 'KeyC', keyRus: 'с' },
    { code: 'KeyV', keyRus: 'м' },
    { code: 'KeyB', keyRus: 'и' },
    { code: 'KeyN', keyRus: 'т' },
    { code: 'KeyM', keyRus: 'ь' },
    { code: 'Comma', keyRus: 'б' },
    { code: 'Period', keyRus: 'ю' },
    { code: 'Slash', keyRus: '/' },
    { code: 'Space', keyRus: ' ' },
];
var words = {
    0: ['автор', '著者、作者', ''],
    1: ['адрес', '住所、番地', ''],
    2: ['белый', '①白い ②淡色の', ''],
    3: ['давно', '①ずっと以前に ②長い間', ''],
    4: ['живот', '腹、お腹', ''],
    5: ['камень', '石、岩石', ''],
    6: ['шаг', '歩調/足音', ''],
    7: ['наука', '科学/学問', ''],
    8: ['фирма', '会社', ''],
    9: ['начало', 'はじめ', '']
};
var Keylist = /** @class */ (function () {
    function Keylist() {
        this.topElement = document.getElementById('keyboard');
        this.keyElement = this.topElement.querySelectorAll('.key');
    }
    // キリル文字と英字キーをそれぞれ配列に変換
    Keylist.prototype.RuskeysToArray = function () {
        var arrRusKey = [];
        this.keyElement.forEach(function (e) {
            var oneRusKey = e.textContent.split('')[0];
            // キリル文字を配列にして取得
            arrRusKey.push(oneRusKey);
        });
        return arrRusKey;
    };
    Keylist.prototype.EngkeysToArray = function () {
        var arrEngKey = [];
        this.keyElement.forEach(function (e) {
            var oneEngKey = e.textContent.split('')[1];
            // 英文字を配列にして取得
            arrEngKey.push(oneEngKey);
        });
        return arrEngKey;
    };
    return Keylist;
}());
var keyList = new Keylist();
var RusKeyArray = keyList.RuskeysToArray();
var EngKeyArray = keyList.EngkeysToArray();
// 入力されたアルファベットに対応するキリル文字をreturnする
function returnCorrespondentLetter(pressedCode) {
    var letterInfo = letters.filter(function (e) { return e.code == pressedCode.code; });
    return letterInfo[0].keyRus;
}
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
                UpdateGame();
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
        this.settedWord = words[Math.floor(Math.random() * Object.keys(words).length)][0];
        this.targetElement.innerHTML = this.settedWord;
        this.currentWordLocation = 0;
    };
    Game.prototype.ManageCount = function (pressedcode) {
        if (returnCorrespondentLetter(pressedcode) === this.settedWord[this.currentWordLocation]) {
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
        var indexOfRusKey = RusKeyArray.indexOf(pressedKey);
        this.indexOfNextKey = RusKeyArray.indexOf(this.settedWord[this.currentWordLocation]);
        if (eventType === KeyEvent.KeyDown) {
            if (this.status == "Active") {
                this.keyboardClass[this.indexOfNextKey].removeAttribute("id");
            }
            this.keyboardClass[indexOfRusKey].classList.add("pushed");
        }
        if (eventType === KeyEvent.KeyUp) {
            this.keyboardClass[indexOfRusKey].classList.remove("pushed");
            if (this.status == "Active") {
                this.keyboardClass[this.indexOfNextKey].setAttribute("id", "next-key");
            }
        }
    };
    // 対象のキーボードの色を変更する:最初
    Game.prototype.GetTargetLetter = function () {
        this.indexOfNextKey = RusKeyArray.indexOf(this.settedWord[this.currentWordLocation]);
        this.keyboardClass[this.indexOfNextKey].setAttribute("id", "next-key");
    };
    return Game;
}());
var game = new Game();
window.addEventListener('keydown', function (pressedCode) {
    game.pushedMotion(returnCorrespondentLetter(pressedCode), KeyEvent.KeyDown);
    if (game.status == "Active") {
        // console.log("game.status == Active");
        game.ManageCount(pressedCode);
    }
    else {
        console.log("game.status == NonActive");
    }
});
window.addEventListener('keyup', function (pressedCode) {
    game.pushedMotion(returnCorrespondentLetter(pressedCode), KeyEvent.KeyUp);
});
function UpdateGame() {
    var timerId = setTimeout(function () {
        game.time--;
        game.timelabel.innerHTML = "<span>" + game.time + "</span>";
        if (game.time <= 0) {
            clearTimeout(game.time);
            game.keyboardClass[game.indexOfNextKey].removeAttribute("id");
            game = new Game();
            return;
        }
        UpdateGame();
    }, 1000);
}
