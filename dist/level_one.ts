let letter: { [key: string]: string }[] = [
    { code: 'KeyA', keyRus: 'ф' },
    { code: 'KeyS', keyRus: 'ы' },
    { code: 'KeyD', keyRus: 'в' },
    { code: 'KeyF', keyRus: 'а' },
    { code: 'KeyG', keyRus: 'п' },
]

function Debug(){
    return console.log("function called")
}

// 入力されたアルファベットに対応するキリル文字をreturnする
let returnCorrespondentLetter = function(pressedCode){
    let letterInfo = letter.filter(e => e.code == pressedCode.code)
    return letterInfo[0].keyRus
}


// 入力された瞬間にキーのコードを受け取る
window.addEventListener('keydown', function(pressedCode) {
    returnCorrespondentLetter(pressedCode);
    // console.log("key:" + pressedCode.key);
    // console.log("code:" + pressedCode.code);
    // console.log("keyCode:" + pressedCode.keyCode);
    // var pressing_key = e.key;
    // var where_pressing_key = alpha.indexOf(pressing_key);
    // var pressing_kiriru_number = keys_array.indexOf(kiriru[where_pressing_key])
    // keyboards[pressing_kiriru_number].classList.add("pushed")
})

class PressedMotion {
    topElement: HTMLDivElement;
    keyElement: NodeList;

    constructor(){
        this.topElement = document.getElementById('keyboard')! as HTMLDivElement;
        this.keyElement = this.topElement.querySelectorAll('.key')! as NodeList;

        this.keysToArray();
    }

    // キリル文字と英字キーをそれぞれ配列に変換
    private keysToArray(){
        let arrRusKey = [];
        let arrEngKey = [];
        this.keyElement.forEach(function (e) {
            let oneRusKey = e.textContent.split('')[0]
            let oneEngKey = e.textContent.split('')[1]
            // キリル文字を配列にして取得
            arrRusKey.push(oneRusKey);
            // 英文字を配列にして取得
            arrEngKey.push(oneEngKey);
        });
    }
}







class DebugClass {
    constructor(){
        console.log("class called");
    }
}
let debug = new DebugClass();
let pressedMotion = new PressedMotion();


