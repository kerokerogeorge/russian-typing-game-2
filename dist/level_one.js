var KeyEvent;
(function (KeyEvent) {
    KeyEvent[KeyEvent["KeyDown"] = 0] = "KeyDown";
    KeyEvent[KeyEvent["KeyUp"] = 1] = "KeyUp";
})(KeyEvent || (KeyEvent = {}));
var letter = [
    { code: 'KeyA', keyRus: 'ф' },
    { code: 'KeyS', keyRus: 'ы' },
    { code: 'KeyD', keyRus: 'в' },
    { code: 'KeyF', keyRus: 'а' },
    { code: 'KeyG', keyRus: 'п' },
];
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
    var letterInfo = letter.filter(function (e) { return e.code == pressedCode.code; });
    return letterInfo[0].keyRus;
}
function pushedMotion(pressedKey, eventType) {
    var keyboardClass = document.getElementsByClassName('key');
    var indexOfRusKey = RusKeyArray.indexOf(pressedKey);
    if (eventType === KeyEvent.KeyDown) {
        keyboardClass[indexOfRusKey].classList.add("pushed");
        console.log("add");
    }
    if (eventType === KeyEvent.KeyUp) {
        keyboardClass[indexOfRusKey].classList.remove("pushed");
        console.log("remove");
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
