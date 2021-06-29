import { letters, words } from "./const"
import { Status, KeyEvent } from "./types"
import KeyList from "./keylist"
import Game from "./game"

const keyList = new KeyList();
export let RusKeyArray: string[] = keyList.RuskeysToArray();
let EngKeyArray: string[] = keyList.EngkeysToArray();

export const returnCorrespondentLetter = (pressedCode: KeyboardEvent): string => {
    let letterInfo = letters.filter(e => e.code == pressedCode.code)
    return letterInfo[0].keyRus
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

export const UpdateGame = () => {
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
