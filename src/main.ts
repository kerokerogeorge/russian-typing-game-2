enum KeyEvent { KeyDown, KeyUp }
// type KeyEvent = "KeyDown" | "KeyUp"  enum を使うかunion型を使うか迷っている
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
    0: ['автор', '著者、作者', ''],
    1: ['адрес', '住所、番地', ''],
    2: ['белый','①白い ②淡色の',''],
    3: ['давно','①ずっと以前に ②長い間',''],
    4: ['живот','腹、お腹',''],
    5: ['камень','石、岩石',''],
    6: ['шаг','歩調/足音',''],
    7: ['наука','科学/学問',''],
    8: ['фирма','会社',''],
    9: ['начало','はじめ',''],
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
            let oneRusKey = e.textContent!.split('')[0]
            // キリル文字を配列にして取得
            arrRusKey.push(oneRusKey);
        });
        return arrRusKey
    }

    EngkeysToArray(): string[]{
        let arrEngKey: string[] = [];
        this.keyElement.forEach(function (e) {
            let oneEngKey = e.textContent!.split('')[1]
            // 英文字を配列にして取得
            arrEngKey.push(oneEngKey);
        });
        return arrEngKey
    }
}
const keyList = new Keylist();
let RusKeyArray: string[] = keyList.RuskeysToArray();
let EngKeyArray: string[] = keyList.EngkeysToArray();

// 入力されたアルファベットに対応するキリル文字をreturnする
function returnCorrespondentLetter(pressedCode: KeyboardEvent): string{
    let letterInfo = letters.filter(e => e.code == pressedCode.code)
    return letterInfo[0].keyRus
}
class Game {
    status: Status;
    time: number;
    timelabel: HTMLSpanElement;
    targetElement: HTMLDivElement;
    currentWordLocation: number;
    settedWord: string;
    score: number;
    keyboardClass: HTMLCollection;
    indexOfNextKey: number;
    constructor(){
        this.targetElement = document.getElementById('target')! as HTMLDivElement;
        this.timelabel = document.getElementById('timer') as HTMLSpanElement;
        this.settedWord = "Click here to start";
        this.targetElement.innerHTML = this.settedWord;
        this.time = 10;
        this.status = "NonActive";
        this.currentWordLocation = 0;
        this.score = 0;
        this.keyboardClass = document.getElementsByClassName('key')! as HTMLCollection;
        this.indexOfNextKey = 0;
        this.targetElement.addEventListener('click', () => {
            if(this.status == "NonActive"){
                this.status = "Active"
                this.SetTarget();
                UpdateGame();
                this.GetTargetLetter();
            } else {
                console.log("already active!!!!")
                return
            }
        })
        this.timelabel.innerHTML = `<span>${ this.time }</span>`;
        this.status = "NonActive";
    }

    private SetTarget(){
        this.settedWord = words[Math.floor(Math.random() * Object.keys(words).length)][0];
        this.targetElement.innerHTML = this.settedWord;
        this.currentWordLocation = 0;
    }

    ManageCount(pressedcode: KeyboardEvent){
        if(returnCorrespondentLetter(pressedcode) === this.settedWord[this.currentWordLocation]){
            // console.log("正解です");
            this.AddCount();
        }else{
            // console.log("間違えたキーを押しています");
        }
    }

    private AddCount(){
        console.log("in AddCount()：現在のキー：" + this.settedWord[this.currentWordLocation]);
        this.currentWordLocation ++;
        console.log("in AddCount()；次のキー；" + this.settedWord[this.currentWordLocation]);
        this.DecorateCorrectWord();
        if(this.currentWordLocation === this.settedWord.length && this.status == "Active"){
            this.SetTarget();
            this.AddScore();
        }
    }

    private DecorateCorrectWord(){
        let decoratedWord = this.settedWord.slice(0, this.currentWordLocation)
        this.targetElement.innerHTML = `<span class="correct">${decoratedWord}</span>${this.settedWord.substring(this.currentWordLocation)}`;
    }

    private AddScore(){
        this.score ++;
        console.log(this.score);
    }

    pushedMotion(pressedKey: string, eventType: KeyEvent){
        let indexOfRusKey: number = RusKeyArray.indexOf(pressedKey);
        this.indexOfNextKey = RusKeyArray.indexOf(this.settedWord[this.currentWordLocation]);
        if(eventType === KeyEvent.KeyDown){
            if (this.status == "Active"){
                this.keyboardClass[this.indexOfNextKey].removeAttribute("id");
            }
            this.keyboardClass[indexOfRusKey].classList.add("pushed");
        }
        if(eventType === KeyEvent.KeyUp){
            this.keyboardClass[indexOfRusKey].classList.remove("pushed");
            if (this.status == "Active"){
                this.keyboardClass[this.indexOfNextKey].setAttribute("id","next-key");
            }
        }
    }

    // 対象のキーボードの色を変更する:最初
    GetTargetLetter(){
        this.indexOfNextKey = RusKeyArray.indexOf(this.settedWord[this.currentWordLocation]);
        this.keyboardClass[this.indexOfNextKey].setAttribute("id","next-key");
    }
}
let game = new Game();

window.addEventListener('keydown', function(pressedCode) {
    game.pushedMotion(returnCorrespondentLetter(pressedCode), KeyEvent.KeyDown);
    if(game.status == "Active"){
        // console.log("game.status == Active");
        game.ManageCount(pressedCode);
    }else{
        console.log("game.status == NonActive");
    }
})

window.addEventListener('keyup', function(pressedCode) {
    game.pushedMotion(returnCorrespondentLetter(pressedCode), KeyEvent.KeyUp);
})

function UpdateGame(){
    let timerId = setTimeout(() =>{
        game.time --;
        game.timelabel.innerHTML = `<span>${ game.time }</span>`;
        if (game.time <= 0) {
            clearTimeout(game.time);
            game.keyboardClass[game.indexOfNextKey].removeAttribute("id");
            game = new Game();
            return;
        }
        UpdateGame();
    }, 1000)
}