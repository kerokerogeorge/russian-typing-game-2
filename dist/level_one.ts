enum KeyEvent { KeyDown, KeyUp }

let letter: { [key: string]: string }[] = [
    { code: 'KeyA', keyRus: 'ф' },
    { code: 'KeyS', keyRus: 'ы' },
    { code: 'KeyD', keyRus: 'в' },
    { code: 'KeyF', keyRus: 'а' },
    { code: 'KeyG', keyRus: 'п' },
]
class Keylist {
    topElement: HTMLDivElement;
    keyElement: NodeList;

    constructor(){
        this.topElement = document.getElementById('keyboard')! as HTMLDivElement;
        this.keyElement = this.topElement.querySelectorAll('.key')! as NodeList;
    }

    // キリル文字と英字キーをそれぞれ配列に変換
    RuskeysToArray(){
        let arrRusKey: string[] = [];
        this.keyElement.forEach(function (e) {
            let oneRusKey = e.textContent.split('')[0]
            // キリル文字を配列にして取得
            arrRusKey.push(oneRusKey);
        });
        return arrRusKey
    }

    EngkeysToArray(){
        let arrEngKey: string[] = [];
        this.keyElement.forEach(function (e) {
            let oneEngKey = e.textContent.split('')[1]
            // 英文字を配列にして取得
            arrEngKey.push(oneEngKey);
        });
        return arrEngKey
    }
}
let keyList = new Keylist();
let RusKeyArray: string[] = keyList.RuskeysToArray();
let EngKeyArray: string[] = keyList.EngkeysToArray();

// 入力されたアルファベットに対応するキリル文字をreturnする
function returnCorrespondentLetter(pressedCode){
    let letterInfo = letter.filter(e => e.code == pressedCode.code)
    return letterInfo[0].keyRus
}


function pushedMotion(pressedKey: string, eventType: KeyEvent){
    let keyboardClass: HTMLCollection = document.getElementsByClassName('key');
    let indexOfRusKey: number = RusKeyArray.indexOf(pressedKey);
    if(eventType === KeyEvent.KeyDown){
        keyboardClass[indexOfRusKey].classList.add("pushed");
        console.log("add");
    }
    if(eventType === KeyEvent.KeyUp){
        keyboardClass[indexOfRusKey].classList.remove("pushed");
        console.log("remove");
    }
}

window.addEventListener('keydown', function(pressedCode) {
    pushedMotion(returnCorrespondentLetter(pressedCode), KeyEvent.KeyDown);
})

window.addEventListener('keyup', function(pressedCode) {
    pushedMotion(returnCorrespondentLetter(pressedCode), KeyEvent.KeyUp);
})

// メモ
// １キーボードの配列を取得✅ キリル文字の配列
// ２押されたキリル文字取✅ キリル文字の一文字
// ３key classを全て取得✅ class要素
// ４押されたキリル文字がキーボード配列の何番目かを要素に格納
// ５4で取得した番号をもとに何番目のkeyクラスを変更すればいいかを指定

// key down ⇒ key up