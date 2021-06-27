enum KeyEvent { KeyDown, KeyUp }
type Status = "Active" | "NonActive";


const letters: { [key: string]: string }[] = [
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
]

const words: { [key: number]: string[]} = {
    1: ['автор', '著者、作者', ''],
    2: ['адрес', '住所、番地', ''],
    3: ['белый','①白い ②淡色の',''],
    4: ['давно','①ずっと以前に ②長い間',''],
    5: ['живот','腹、お腹',''],
    6: ['камень','石、岩石',''],
    7: ['шаг','歩調/足音',''],
    8: ['наука','科学/学問',''],
    9: ['фирма','会社',''],
    10: ['начало','はじめ',''],
}

class Keylist {
    topElement: HTMLDivElement;
    keyElement: NodeList;

    constructor(){
        this.topElement = document.getElementById('keyboard')! as HTMLDivElement;
        this.keyElement = this.topElement.querySelectorAll('.key')! as NodeList;
    }

    // キリル文字と英字キーをそれぞれ配列に変換
    RuskeysToArray(): string[]{
        let arrRusKey: string[] = [];
        this.keyElement.forEach(function (e) {
            let oneRusKey = e.textContent.split('')[0]
            // キリル文字を配列にして取得
            arrRusKey.push(oneRusKey);
        });
        return arrRusKey
    }

    EngkeysToArray(): string[]{
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
function returnCorrespondentLetter(pressedCode): string{
    let letterInfo = letters.filter(e => e.code == pressedCode.code)
    return letterInfo[0].keyRus
}

function pushedMotion(pressedKey: string, eventType: KeyEvent){
    let keyboardClass: HTMLCollection = document.getElementsByClassName('key');
    let indexOfRusKey: number = RusKeyArray.indexOf(pressedKey);
    if(eventType === KeyEvent.KeyDown){
        keyboardClass[indexOfRusKey].classList.add("pushed");
    }
    if(eventType === KeyEvent.KeyUp){
        keyboardClass[indexOfRusKey].classList.remove("pushed");
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

class Game {
    status: Status;
    time: number;
    timelabel: HTMLSpanElement;
    targetElement: HTMLDivElement;

    constructor(){
        console.log("Game called")
        this.targetElement = document.getElementById('target')! as HTMLDivElement;
        this.timelabel = document.getElementById('timer') as HTMLSpanElement;
        this.targetElement.innerHTML = "Click here to start";
        this.time = 10;
        this.status = "NonActive";
        console.log("1:" +  this.status)
        this.targetElement.addEventListener('click', () => {
            if(this.status == "NonActive"){
                this.status = "Active"
                console.log("2:" +  this.status);
                this.SetTarget();
                this.UpdateTimer();
            }
        }, { once: true })
        this.timelabel.innerHTML = `<span>${ this.time }</span>`;
        this.status = "NonActive";

    }

    private UpdateTimer(){
        console.log("UpdateTimer called")
        let timerId = setTimeout(() =>{
            this.time --;
            this.timelabel.innerHTML = `<span>${ this.time }</span>`;
            if (this.time <= 0) {
                clearTimeout();
                new Game();
                return;
            }
            this.UpdateTimer();
        }, 1000)
    }

    private SetTarget(){
        this.targetElement.innerHTML = words[Math.floor(Math.random() * Object.keys(words).length)][0]
    }
}

const game = new Game();


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
