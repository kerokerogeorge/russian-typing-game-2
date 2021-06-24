 (function() {
    'use strict';
    var words = [
      "автор","адрес","август","альбум","апрель","афиша","бегать","беда","бедный","бежать",
      "белый","беседа","везде","верить","верхний","весь","горло","гость","громко","грудь",
      "давно","далеко","десять","дверь","двор","дворец","дёшево","ждать","железо","живой",
      "живот","жизнь","забота","зайти","закон","замуж","занят","итак","июнь","искать",
      "камень","капля","карта","кассир","каша","лицо","лоб","любовь","мало","масло",
      "шаг","это","юмор","юбка","щека","чаше","хлеб","торт","пить","между",
      "наука","образ","около","плыть","разве","район","точно","трава","уголь","физик",
      "фирма","часть","через","шапка","шляпа","щётка","экран","эпоха","яркий","мебель",
      "начало","неделя","нельзя","облако","одеяло","поесть","размер","сидеть","сказка","случай",
      "уверен","удобно","футбол","ходить","хозяин","юность","яблоко","январь",
    ];
    var meanings = [
      "著者、作者","住所、番地","8月","アルバム","4月","ビラ、ポスター","[不定]①走る ②駆け回る","災難","①貧しい ②貧弱な","[定]走っていく",
      "①白い ②淡色の","①話し合い ②インタビュー","どこでも、いたるところで","（①+与[を]信頼する ②в+対[を]確信・信仰する）","上部の","全体の、全ての","喉","客、訪問客","大声で","胸、胸部",
      "①ずっと以前に ②長い間","遠くに","10","ドア","中庭","①宮殿 ②会館","安く","①(生/対[を]待つ) ②(+生/不定形[を/するのを])期待する","鉄","①生きている ②活発な",
      "腹、お腹","①生命 ②一生","①心づかい ②心配","（ついでに）寄る","①法則 ②法律","(за+対[に]嫁いで)","[短尾]忙しい;ふさがっている","そんなわけで","7月","①(+対)捜す ②(+対/生[（職/機会など）を])求める",
      "石、岩石","しずく","①地図 ②トランプ","レジ係","おかゆ","①顔 ②個性","ひたい","愛/愛情","わずか、少ししか・・・ない","バター/油/油絵具",
      "歩調/足音","これ、それ","ユーモア","スカート","ほお","より頻繁な/より頻繁に","パン/穀物","ケーキ","飲む","(+造)の間に",
      "科学/学問","①姿 ②タイプ ③様式","側に/①〜の周囲","①泳いでいく、来る ②船が進む","本当に〜か","①地域 ②(ロシア連邦の)州、区","正確に/まるで、あたかも","草","炭、石炭","物理学者",
      "会社","部分","(+対)①〜を横切って ②〜を介して","（つばのない）帽子","（つばのある）帽子","ブラシ、はけ","スクリーン/映画","時代/時勢","明るい、輝く、鮮明な","(集合)家具",
      "はじめ","週/１週間","〜できない,不可能だ","雲","毛布","(+対/無補語)食べる","大きさ/程度","座っている、腰掛けている/(ある場所、状態に)いる","おとぎ話","①事件 ②機会、チャンス",
      "[短語尾](в+前)[を]確信している","快適に、気持ちよく/①(+与)[にとって]快適だ、具合がいい","サッカー","[不定]①歩く ②歩き回る ③運行する","主人、支配者","青春、青春時代","りんご","1月","右側から、右に","どこにも〜ない",
    ];

    var options = [
      "","","","","男性名詞","","不定動詞","","","定動詞",
      "","","副詞","不完了体","","定動詞","","","","",
      "","","","女性名詞","","","","","","",
      "","","","完了体","","","","","男性名詞","",
      "男性名詞","女性名詞","","","","","","","","",
      "","指示代名詞","","","","形容詞/副詞","","","","前置詞",
      "","","","定動詞","","","副/接","","","",
      "","女性名詞","","","","","","","","女性名詞",
      "","","主に +完了体不定形","","","完了体","","不完了体","","",
      "","","","不完了体","","女性名詞","","男性名詞","","",
    ];

    var kiriru = ["а","б","в","г","д","е","ё","ж","з","и","й","к","л","м","н",
                  "о","п","р","с","т","у","ф","х","ц","ч","ш","щ","ъ","ы","ь",
                  "э","ю","я"];
    var alpha = [ "f", ",", "d", "u", "l", "t", "]", ";", "p", "b", "q", "r", "k", "v", "y", "j", "g", "h", "c", "n", "e", "a", "@", "w",
                  "x", "i", "o", "[", "s", "m", ":", ".", "z"];

    var keyCodeForWin = [ 192, 219, 187, 186, 221, 188, 190 ];
    var wild_keys = [ "х", "ъ", "ж", "э", "ё", "б", "ю" ];
    var pressed_key_code;
    var where_pressed_key_code;
    var where_wild_key;

    var currentWord = 'apple';
    var currentLocation;
    var score;
    var miss;
    var timer;
    var word_label = document.getElementById('words');
    var target = document.getElementById('target');
    var scoreLabel = document.getElementById('score');
    var missLabel = document.getElementById('miss');
    var accuracy_label = document.getElementById('accuracy');
    var timerLabel = document.getElementById('timer');
    var isStarted;
    var timerId;

    var finished_words_uni = [];
    var finished_words = [];
    var kiriru_in_keyboard_order = [];

    var list;
    var th;

    var mistake = [];
    var mistake_uni = [];
    var a;
    var count = 0;
    var miss_count_list = [];
    var b;

    //  キリル文字の指定
    var pressed_key;
    var where_key;
    var where_kiriru;
    var kirirukoko;

    var starter;
    var level;

    var russia = document.getElementsByClassName('north-west');

    // listNewWords();
    var new_words_table = document.getElementById('new-words-box');
    var number;
    var new_word;
    var new_word_meaning;
    var new_word_option;

    // listArrivedWords();
    var arrived_words_table = document.getElementById('arrived-words');
    var number_th;
    var arrived_word;

    // mistakenWords()
    var mistake_words_table = document.getElementById('missed-words');
    var mistake_word;
    var mistake_count;

    var words_to_delete = 0;
    var arrived_row_count = 0;
    var mistake_row_count = 0;

    function init() {
      currentWord = '<span id="starting_button" style="color:red; "> click here to start </span>';
      currentLocation = 0;
      score = 0;
      miss = 0;
      timer = 60;
      target.innerHTML = currentWord;
      starter = document.getElementById("starting_button");
        starter.addEventListener('click', function() {
          if (!isStarted) {
              isStarted = true;
              finished_words_uni = [];
              finished_words = [];
              setTarget();
              updateTimer();
          }
          if (words_to_delete != 0){
            for(var c = words_to_delete; c > 0 ; c--){
              new_words_table.deleteRow(c);
            }
            for(var d = arrived_row_count; d > 0; d--){
              arrived_words_table.deleteRow(d);
            }
            for(var e = mistake_row_count; e > 0; e--){
              mistake_words_table.deleteRow(e);
            }
            word_label.innerHTML = "";
            scoreLabel.innerHTML = "";
            missLabel.innerHTML = "";
            accuracy_label.innerHTML ="";
            words_to_delete = 0;
            arrived_row_count = 0;
            mistake_row_count = 0;
          }
        });
      timerLabel.innerHTML = timer;
      isStarted = false;
      console.log(words_to_delete);
    }
    init();

    starter.addEventListener('click', function() {
      if (!isStarted) {
        isStarted = true;
        finished_words_uni = [];
        finished_words = [];
        setTarget();
        updateTimer();
      }
    });

    function listNewWords() {
      var new_words_row = new_words_table.insertRow(-1);
      var new_word_cell  = new_words_row.insertCell(-1);
      var new_word_cell1 = new_words_row.insertCell(-1);
      var new_word_cell2  = new_words_row.insertCell(-1);
      var new_word_cell3  = new_words_row.insertCell(-1);
      number  = document.createTextNode(list + 1);
      new_word  = document.createTextNode(finished_words_uni[list]);
      var where_meaning = words.indexOf(finished_words_uni[list]);
      var where_option = words.indexOf(finished_words_uni[list]);
      var show_meaning = meanings[where_meaning];
      var show_option = options[where_option];
      new_word_meaning = document.createTextNode(show_meaning);
      new_word_option = document.createTextNode(show_option);
      new_word_cell.appendChild(number);
      new_word_cell1.appendChild(new_word);
      new_word_cell2.appendChild(new_word_meaning);
      new_word_cell3.appendChild(new_word_option);
      words_to_delete++;
    }

    function listArrivedWords() {
      var arrived_words_row = arrived_words_table.insertRow(-1);
      var arrived_word_cell  = arrived_words_row.insertCell(-1);
      var arrived_word_cell1 = arrived_words_row.insertCell(-1);
      number_th  = document.createTextNode(th + 1);
      arrived_word  = document.createTextNode(finished_words[th]);
      arrived_word_cell.appendChild(number_th);
      arrived_word_cell1.appendChild(arrived_word);
      arrived_row_count++;
    }

    function mistakenWords() {
      var mistake_words_row = mistake_words_table.insertRow(-1);
      var mistake_word_cell1  = mistake_words_row.insertCell(-1);
      var mistake_word_cell2 = mistake_words_row.insertCell(-1);
      mistake_word  = document.createTextNode(mistake_uni[a]);
      mistake_count  = document.createTextNode(miss_count_list[a] + "回");
      mistake_word_cell1.appendChild(mistake_word);
      mistake_word_cell2.appendChild(mistake_count);
      mistake_row_count++;
    }

    function updateTimer() {
      timerId = setTimeout(function() {
        timer--;
        timerLabel.innerHTML = timer;
        if (timer <= 0) {
          var accuracy = (score + miss) === 0 ? '0.00' : ((score / (score + miss)) * 100).toFixed(2);
          for(list=0; list <= finished_words_uni.length - 1; list++){
            listNewWords();
          }
          for(th=0; th <= finished_words.length - 1; th++){
            listArrivedWords();
          }
          for(a = 0; a <= mistake_uni.length - 1; a++){
            for(b = 0; b <= miss; b++) {
              if(mistake_uni[a] == mistake[b]){
                count++;
              }
            }
            miss_count_list.push(count);
            count = 0;
            mistakenWords();
          }
            swal({
              title: "конец！",
              text: 'total : '+ finished_words.length + 'words \n'
                    + 'correct : '+ score + ' letters \n'
                    + ' mistake : ' + miss + ' letters \n'
                    + 'accuracy : ' + accuracy + '% accuracy',
              button: 'OK',
              confirmButtonColor: 'red',
            });
            word_label.innerHTML = finished_words.length;
            scoreLabel.innerHTML = score;
            missLabel.innerHTML = miss;
            accuracy_label.innerHTML = accuracy + "%";
            clearTimeout(timerId);
            init();
            return;
          }
          updateTimer();
        }, 1000);
      }

    function setTarget() {
      currentWord = words[Math.floor(Math.random() * words.length)];
      target.innerHTML = currentWord;
      currentLocation = 0;
    }

    function addCount() {
      currentLocation++;
      var placeholder = '';
      for (var i = 0; i < currentLocation; i++) {
        placeholder += '<span class="correct">' + currentWord[i] + '</span>';
      }
      target.innerHTML = placeholder + currentWord.substring(currentLocation);
      console.log('score!');
      score++;
      // scoreLabel.innerHTML = score;
      if (currentLocation === currentWord.length) {
        if(finished_words_uni.indexOf(currentWord) == -1) {
          finished_words_uni.push(currentWord);
        }
        finished_words.push(currentWord);
        setTarget();
      }
    }
    // キリル文字のクラスをキーボード順にすべて取得
    var keyboard_key = document.getElementsByClassName('north-west');
    // キーボード自体をすべて取得
    var keyboards = document.getElementsByClassName('key');
    // キリル文字をキーボード順に並べた配列
    var keys_array = []
    for (var i = 0; i < keyboard_key.length; i++) {
      keys_array.push(keyboard_key[i].textContent)
    }
    window.addEventListener('keydown', function(e) {
      var pressing_key = e.key;
      var where_pressing_key = alpha.indexOf(pressing_key);
      var pressing_kiriru_number = keys_array.indexOf(kiriru[where_pressing_key])
      keyboards[pressing_kiriru_number].classList.add("pushed")
    })
    // 以下はキーボードが押された時に発火する
    window.addEventListener('keyup', function(e) {
      if (!isStarted) {
        return;
      }
      pressed_key = e.key;
      pressed_key_code = e.keyCode;
      where_pressed_key_code = keyCodeForWin.indexOf(pressed_key_code);
      where_wild_key = wild_keys[where_pressed_key_code];
      // 文字列の何番めか取得
      // where_keyは数字を返す(押されたkeyがalphaの何番目にあるのか)
      // kiriru[where_key]はキリル文字を返す
      where_key = alpha.indexOf(pressed_key);
      // console.log("where_key is " + where_key);
      // ↓押されたキーに対応するキーボード順のキリル文字の番号を返す
      var kiriru_number = keys_array.indexOf(kiriru[where_key])
      keyboards[kiriru_number].classList.remove("pushed")
      // キリル文字か英語か判断
      if (where_key == -1) {
        // キリル文字が入力された時にここが呼び出される
        console.log("ロシア語キー");
        where_kiriru = kiriru[where_key];
        kirirukoko = kiriru.indexOf(where_kiriru);
        if (pressed_key == currentWord[currentLocation]){
          addCount();
        } else if (where_pressed_key_code != -1 && where_wild_key == currentWord[currentLocation]) {
          // for windows キーコードでキーを取得
          addCount();
        } else {

          if(mistake.indexOf(currentWord[currentLocation]) == -1 ) {
            mistake_uni.push(currentWord[currentLocation]);
          }
          mistake.push(currentWord[currentLocation]);
          miss++;
        }
      } else {
        // 英語の時にここが呼び出される
        // console.log("英語キー");
        where_kiriru = kiriru[where_key];
        kirirukoko = kiriru.indexOf(where_kiriru);
        if ( where_key === kirirukoko && currentWord[currentLocation] == where_kiriru) {
          addCount();
        } else {
          if(mistake.indexOf(currentWord[currentLocation]) == -1 ) {
            mistake_uni.push(currentWord[currentLocation]);
          }
          mistake.push(currentWord[currentLocation]);
          miss++;
        }
      }
    });
  })();