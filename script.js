'use strict'
// // 1行目に記載している 'use strict' は削除しないでください

/////////////////////////
//常数設定
/////////////////////////
//ボタンのidをセットする
const buttons = [];
const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let lengthOfButtons = 19;
for (let i = 0; i < lengthOfButtons; i++) {
    for (let j = 0; j < lengthOfButtons; j++) {
        buttons.push(alphabet[i] + j);
    }
}
//ボタンのidのx座標をセットする
const xPosition = {};
for (let i = 0; i < lengthOfButtons; i++) {
    for (let j = 0; j < lengthOfButtons; j++) {
        xPosition[alphabet[i] + j] = j;
    }
}
//ボタンのidのx座標をセットする
const yPosition = {};
for (let i = 0; i < lengthOfButtons; i++) {
    for (let j = 0; j < lengthOfButtons; j++) {
        yPosition[alphabet[i] + j] = i;
    }
}
//ボタンのデフォルトカラー設定用変数
const startButtonColorNumber = 50;
//offTimeで色を初期化するまでの時間
const initialTime = 200;
//ボタンの色が格納された配列
const colorVivid = ["rgb(255,   0,   0)", "rgb(255, 182,   1)", "rgb(152, 255,   1)",
    "rgb(  1, 255,  31)", "rgb(  1, 255, 213)", "rgb(  1, 122, 255)",
    "rgb( 61,   1, 255)", "rgb(243,   1, 255)", "rgb(255,   1,  92)"];
//自動モードの作動間隔intervalTime
const intervalTime = 1800;
//ボタン間距離を呼び出しタイミングに変換する倍率productNumber
const productNumber = 100;
//setColor2呼び出し回数管理
let times = 0;
//auto機能でのタイマー変数の初期値
let intervalID =0 ;
//setColor2()が呼び出された回数ごとの色を記録する配列。色の上書き防止用。
const colors = [];
/////////////////////////////////////////////////////////////////////
/// 関数と実行
//////////////////////////////////////////////////////////////////////
//ボタンが押されたら、色変更用の準備して色変更を実施
//ファイル読み込み後実行とすることでgetElementByIdのエラー回避
function buttonSet(selector) {
    window.addEventListener('load', function () {
        const pushButton = document.getElementById(selector)
        pushButton.addEventListener('mousedown', function () {
            valueArray.splice(0, valueArray.length);
            measureDistance(selector);
            objectToArray(distanceObject);
            setColor2(times);
            perform(times);
            times++;
        })
    })
}
//各ボタンに対しbuttonSet()を呼び出して稼働
buttons.map(buttonSet);
//スタートボタンでAutoモードを起動できるよう設定
function startButtonSet() {
    window.addEventListener('load', function () {
        const pushStartButton = document.getElementById("start")
        pushStartButton.addEventListener('mousedown', function () {
            if (intervalID === 0){
            console.log("startButton is Pushed!")
            intervalStart();
            }
        });
    })
}
//ストップボタンでAutoモードを停止できるよう設定
function stopButtonSet() {
    window.addEventListener('load', function () {
        const pushStopButton = document.getElementById("stop")
        pushStopButton.addEventListener('mousedown', function () {
            console.log("stopButton is Pushed!")
            if (intervalID !== 0){
            stopPerform();
            }
        })
    })
}
//startButtonSet()を呼び出してStartボタンを稼働
startButtonSet();
//stopButtonSet()を呼び出してストップボタンを稼働
stopButtonSet();
//オートモードで定期的にrandomPerform()を呼び出すための関数
function intervalStart(){
    intervalID = setInterval(randomPerform,intervalTime);
}
//オートモードでランダムボタンで色変更開始するための関数
function randomPerform(){
    valueArray.splice(0, valueArray.length);
    let handOverSelector = buttons[Math.floor(Math.random()*buttons.length)];
    measureDistance(handOverSelector);
    objectToArray(distanceObject);
    setColor2(times);
    perform(times);
    times++;
}

//オートモードを停止するための関数
function stopPerform(){
    clearInterval(intervalID);
    intervalID = 0 ;
}
//colors配列の中から色ランダムに選ぶ関数
function setColor2(times) {
    colors.push(colorVivid[Math.floor(Math.random() * colorVivid.length)]);
}
//cssファイルのbackgroundColor属性でボタンの色を変える関数
function changeColor(id, times) {
    document.getElementById(id).style.backgroundColor = colors[times];
}
//cssファイルのbackgroundColor属性でボタンの色を初期値に戻す関数
function changeColorInitial(id) {
    document.getElementById(id).style.backgroundColor = "rgb(" + startButtonColorNumber + "," + startButtonColorNumber + "," + startButtonColorNumber + ")";
}
//呼ばれたらすべてのボタンに対しtimer()とoffTimer()を呼び出しする関数
function perform(times) {
    for (let i = 0; i < valueArray.length; i++) {
        timer(buttons[i], valueArray[i], times); //timer()を呼び出し
        offTimer(buttons[i], valueArray[i] + initialTime); //offtimerを呼び出し
    }
}
//time経過後にchangeColorを実行する関数
function timer(selector, time, times) {
    setTimeout(changeColor, time, selector, times);
}
//time経過後にchangeColorInitialを実行する関数
function offTimer(selector, time) {
    setTimeout(changeColorInitial, time, selector);
}
//押されたボタンと各ボタンの距離計算する配列
const distanceObject = {};
function measureDistance(selector) {
    for (const element of buttons) {
        distanceObject[element] =
            Math.floor(Math.sqrt((xPosition[element] - xPosition[selector]) ** 2
                + (yPosition[element] - yPosition[selector]) ** 2) * 100) / 100;
    }
}

//distanceObjectから呼び出しタイミングを格納したvalueArrayを作る。
const valueArray = [];
function objectToArray(object) {
    for (const key in object) {
        valueArray.push(Math.floor((object[key])*productNumber));
    }
}

/////////////////////////////////////////////////////////////////////
/// スタイルシート編集
//////////////////////////////////////////////////////////////////////
function buttonSize(idArray) {
    idArray.map(function (selector) {
        document.getElementById(selector).style.height = "20px";
        document.getElementById(selector).style.width = "15px";
        document.getElementById(selector).style.border = "0px";
        document.getElementById(selector).style.borderColor = "gray";
        document.getElementById(selector).style.margin = "2px";
        document.getElementById(selector).style.backgroundColor = "rgb(" + startButtonColorNumber + "," + startButtonColorNumber + "," + startButtonColorNumber + ")";
        document.getElementById(selector).style.borderRadius = "0px";
    })
}
buttonSize(buttons);
