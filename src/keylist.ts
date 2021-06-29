export default class Keylist {
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
