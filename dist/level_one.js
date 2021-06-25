var letter = [
    { code: 'KeyA', keyRus: 'ф' },
    { code: 'KeyS', keyRus: 'ы' },
    { code: 'KeyD', keyRus: 'в' },
    { code: 'KeyF', keyRus: 'а' },
    { code: 'KeyG', keyRus: 'п' },
];
function Debug() {
    return console.log("function called");
}
// 入力されたアルファベットに対応するキリル文字をreturnする
var returnCorrespondentLetter = function (pressedCode) {
    var letterInfo = letter.filter(function (e) { return e.code == pressedCode.code; });
    return letterInfo[0].keyRus;
};
// 入力された瞬間にキーのコードを受け取る
window.addEventListener('keydown', function (pressedCode) {
    returnCorrespondentLetter(pressedCode);
    // console.log("key:" + pressedCode.key);
    // console.log("code:" + pressedCode.code);
    // console.log("keyCode:" + pressedCode.keyCode);
    // var pressing_key = e.key;
    // var where_pressing_key = alpha.indexOf(pressing_key);
    // var pressing_kiriru_number = keys_array.indexOf(kiriru[where_pressing_key])
    // keyboards[pressing_kiriru_number].classList.add("pushed")
});
var PressedMotion = /** @class */ (function () {
    function PressedMotion() {
        this.topElement = document.getElementById('keyboard');
        this.keyElement = this.topElement.querySelectorAll('.key');
        this.recievePushedKey();
    }
    PressedMotion.prototype.recievePushedKey = function () {
        var arrRusKey = [];
        var arrEngKey = [];
        this.keyElement.forEach(function (e) {
            var oneRusKey = e.textContent.split('')[0];
            var oneEngKey = e.textContent.split('')[1];
            // キリル文字を配列にして取得
            arrRusKey.push(oneRusKey);
            // 英文字を配列にして取得
            arrEngKey.push(oneEngKey);
        });
        console.log(arrEngKey);
        console.log(arrRusKey);
    };
    return PressedMotion;
}());
var DebugClass = /** @class */ (function () {
    function DebugClass() {
        console.log("class called");
    }
    return DebugClass;
}());
var debug = new DebugClass();
var pressedMotion = new PressedMotion();
