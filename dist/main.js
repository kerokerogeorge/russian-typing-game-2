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
    1: ['автор', '著者、作者', ''],
    2: ['адрес', '住所、番地', ''],
    3: ['белый', '①白い ②淡色の', ''],
    4: ['давно', '①ずっと以前に ②長い間', ''],
    5: ['живот', '腹、お腹', ''],
    6: ['камень', '石、岩石', ''],
    7: ['шаг', '歩調/足音', ''],
    8: ['наука', '科学/学問', ''],
    9: ['фирма', '会社', ''],
    10: ['начало', 'はじめ', '']
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
function pushedMotion(pressedKey, eventType) {
    var keyboardClass = document.getElementsByClassName('key');
    var indexOfRusKey = RusKeyArray.indexOf(pressedKey);
    if (eventType === KeyEvent.KeyDown) {
        keyboardClass[indexOfRusKey].classList.add("pushed");
    }
    if (eventType === KeyEvent.KeyUp) {
        keyboardClass[indexOfRusKey].classList.remove("pushed");
    }
}
window.addEventListener('keydown', function (pressedCode) {
    pushedMotion(returnCorrespondentLetter(pressedCode), KeyEvent.KeyDown);
});
window.addEventListener('keyup', function (pressedCode) {
    pushedMotion(returnCorrespondentLetter(pressedCode), KeyEvent.KeyUp);
});
// メモ
// １キーボードの配列を取得✅ キリル文字の配列
// ２押されたキリル文字取✅ キリル文字の一文字
// ３key classを全て取得✅ class要素
// ４押されたキリル文字がキーボード配列の何番目かを要素に格納
// ５4で取得した番号をもとに何番目のkeyクラスを変更すればいいかを指定
// key down ⇒ key up
var Game = /** @class */ (function () {
    function Game() {
        var _this = this;
        console.log("Game called");
        this.targetElement = document.getElementById('target');
        this.timelabel = document.getElementById('timer');
        this.targetElement.innerHTML = "Click here to start";
        this.time = 10;
        this.status = "NonActive";
        console.log("1:" + this.status);
        this.targetElement.addEventListener('click', function () {
            if (_this.status == "NonActive") {
                _this.status = "Active";
                console.log("2:" + _this.status);
                _this.SetTarget();
                _this.UpdateTimer();
            }
        }, { once: true });
        this.timelabel.innerHTML = "<span>" + this.time + "</span>";
        this.status = "NonActive";
    }
    Game.prototype.UpdateTimer = function () {
        var _this = this;
        console.log("UpdateTimer called");
        var timerId = setTimeout(function () {
            _this.time--;
            _this.timelabel.innerHTML = "<span>" + _this.time + "</span>";
            if (_this.time <= 0) {
                clearTimeout();
                new Game();
                return;
            }
            _this.UpdateTimer();
        }, 1000);
    };
    Game.prototype.SetTarget = function () {
        console.log(Math.floor(Math.random() * Object.keys(words).length));
        this.targetElement.innerHTML = words[Math.floor(Math.random() * Object.keys(words).length)][0];
    };
    return Game;
}());
var game = new Game();
// spaceキーを押したらゲームがスタートする
// timeoutになったら終了
// 「もう一度遊ぶ」を押したらまたプロジェクトが初期化されて新しいゲームが始まる
// 初期化状態
// 時間は６０秒にセット
// press startをクリックされた瞬間に単語がランダムに表示される
// press startをクリックした瞬間タイマーがスタートする
// 単語を表示する
// 入力した文字の色が変わる（ccss classの追加）
// 次の単語が変わる
// projectを最後まで遊んだ回数が１以上なら表示される文字を変更する
// 非アクティブ の状態でクリックイベントが発生したらゲームがスタート
// 状態がアクティブの状態でクリックイベントが発生してもゲームの初期化は行われない
// タイマーを表示する際にシステムで数値変換をおこにい、加工した値を表示させる
