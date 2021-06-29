import { letters, words } from "./const"
import { Status, KeyEvent } from "./types"
import KeyList from "./keylist"

const keyList = new KeyList();
let RusKeyArray: string[] = keyList.RuskeysToArray();
let EngKeyArray: string[] = keyList.EngkeysToArray();

// 入力されたアルファベットに対応するキリル文字をreturnする
const  returnCorrespondentLetter = (pressedCode: KeyboardEvent): string => {
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

const UpdateGame = () => {
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
