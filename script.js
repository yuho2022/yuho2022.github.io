'use strict'
// // 1行目に記載している 'use strict' は削除しないでください

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

//setColor2呼び出し回数管理
let times = 0;
//////////////////////////////////////////////////////////////////////////////
//ファイル読み終わり後に実行することで、getElementByIdのエラー回避
//ボタンの上を横切ったら、色変更用の準備
//ボタンが押されたら、色変更を実施
function buttonSet(selector) {
    window.addEventListener('load', function () {
        const pushButton = document.getElementById(selector)
        pushButton.addEventListener('mousedown', function () {
            setColor2(times);
            perform(times);
            times++;
        })
    })
    window.addEventListener('load', function () {
        const overButton = document.getElementById(selector)
        overButton.addEventListener('mouseover', function () {
            // keyArray.splice(0, keyArray.length);
            valueArray.splice(0, valueArray.length);
            timingArray.splice(0, timingArray.length);
            measureDistance(selector);
            objectToArray(distanceObject);
            calcInterval(valueArray);
        })
    })
}
///////これがコントローラの実体///
buttons.map(buttonSet);
///////////////////////////////////////////////////////////////////////////////

//色を決定する関数
//const colors = ["red", "green", "blue", "yellow", "green", "sky-blue"]
let color;
const offColor = [];
const delayTime = [];
let startDelayTime = 3000;
// function setColor() {
//     //    color = colors[Math.floor(Math.random(6) * 6)];
//     let r = randomRange();
//     let g = randomRange();
//     let b = randomRange()
//     color = "rgb(" + r + "," + g + "," + b + ")";
//     let checkR = true;
//     let checkG = true;
//     let checkB = true;
//     while (checkR || checkG || checkB) {
//         if (r - 10 < startButtonColorNumber) {
//             r = startButtonColorNumber;
//             checkR = false;
//         } else {
//             r = r - 10;
//         }
//         if (g - 10 < startButtonColorNumber) {
//             g = startButtonColorNumber;
//             checkG = false;
//         } else {
//             g = g - 10;
//         }
//         if (b - 10 < startButtonColorNumber) {
//             b = startButtonColorNumber;
//             checkB = false;
//         } else {
//             b = b - 10;
//         }
//         offColor.push("rgb(" + r + "," + g + "," + b + ")");
//         delayTime.push(startDelayTime);
//         startDelayTime += 500;
//     }
// }

const upperRGB = 240;
const lowerRGB = 193;
function randomRange() {
    return Math.floor(Math.random() * (upperRGB - lowerRGB)) + lowerRGB;
}

const colorVivid = ["rgb(255,   0,   0)","rgb(255, 182,   1)","rgb(152, 255,   1)",
                    "rgb(  1, 255,  31)","rgb(  1, 255, 213)","rgb(  1, 122, 255)",
                    "rgb( 61,   1, 255)","rgb(243,   1, 255)","rgb(255,   1,  92)"];



const colors = [];
function setColor2(times){
    colors.push(colorVivid[ Math.floor(Math.random()*colorVivid.length)]);
}





//cssファイルのbackgroundColor属性でボタンの色を変える関数
function changeColor(id,times) {
    document.getElementById(id).style.backgroundColor = colors[times];
}
//cssファイルのbackgroundColor属性でボタンの色を初期値に戻す関数
function changeColorInitial(id) {
    document.getElementById(id).style.backgroundColor = "rgb(" + startButtonColorNumber + "," + startButtonColorNumber + "," + startButtonColorNumber + ")";
}
//////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////
//呼ばれたら次々とchangeColor関数を実施する関数
function perform(times) {
    // const color = colors[Math.floor(Math.random(6)*6)];
    for (let i = 0; i < timingArray.length; i++) {
        timer(buttons[i], timingArray[i],times);
        offTimer(buttons[i], timingArray[i]+700);
    }
}

//呼ばれたら次々とchangeColor関数を実施する関数
// function perform2() {
//     // const color = colors[Math.floor(Math.random(6)*6)];
//     for (let i = 0; i < delayTime.length; i++) {
//         buttons.map(function (selector) {
//             setTimeout(turnOffColor, delayTime[i], selector, offColor[i]);
//         })

//     }
//     offColor.splice(0, offColor.length);
//     delayTime.splice(0, delayTime.length);
// }


// function turnOffColor(id, colorNext) {
//     document.getElementById(id).style.backgroundColor = colorNext;
// }



//////////////////////time経過後にchangeColorを実行する関数
function timer(selector, time ,times) {
    setTimeout(changeColor, time, selector, times);
}
//////////////////////time経過後にchangeColorInitialを実行する関数
function offTimer(selector, time) {
    setTimeout(changeColorInitial, time, selector);
}

///////押されたボタンとそれぞれのボタンの距離を図る配列
//引数のセレクタからの距離をindexをid,valueを距離とする配列を戻り値とする関数
const distanceObject = {};
function measureDistance(selector) {
    for (const element of buttons) {
        // console.log("element: " + element + "selector: " + selector + "x,y:" + xPosition[element] + " , " + xPosition[selector]);
        distanceObject[element] =
            Math.floor(Math.sqrt((xPosition[element] - xPosition[selector]) ** 2
                + (yPosition[element] - yPosition[selector]) ** 2) * 100) / 100;
    }
}

////distanceObjectから配列を二つ作る。
////(1)ボタンidをする配列keyArray
////(2)valueを要素とする配列valueArray
// const keyArray = [];
const valueArray = [];
function objectToArray(object) {
    for (const key in object) {
        // keyArray.push(key);
        // console.log(object[key]);
        valueArray.push(object[key]);
    }
}

////valueArrayから、実施するタイミングを配列とする
const timingArray = [];
function calcInterval(anyArray) {
    for (let i = 0; i < anyArray.length; i++) {
            timingArray.push(Math.floor((anyArray[i]) * 100));
    }
}


/////////////////////////////////////////////////////////////////////
/// スタイルシートを編集
//////////////////////////////////////////////////////////////////////

// function makeLine(lengthOfButtons) {
//     for (let i = lengthOfButtons; i < lengthOfButtons; i++) {
//         newLine = document.createElement("div");
//         newLine.style.class = alphabet[i];
//         document.getElementsByClassName("upper").appendChild(newLine);
//     }
// }
// function makeButtons(lengthOfButtons) {
//     for (let i = lengthOfButtons; i < lengthOfButtons; i++) {
//         for (let j = lengthOfButtons; j < lengthOfButtons; j++) {
//             newButton = document.createElement("button");
//             newLine.style.id = alphabet[i] + j;
//             document.getElementsByClassName(alphabet[i]).appendChild(newLine);
//         }
//     }
// }
// makeLine(lengthOfButtons);
// makeButtons(lengthOfButtons);

// (buttons) => {
//     idArray.map(function (selector) {
//         document.getElementById(selector).style.height = "20px";
//         document.getElementById(selector).style.width = "20px";
//         document.getElementById(selector).style.border = "3px";
//         document.getElementById(selector).style.borderColor = "gray";
//         document.getElementById(selector).style.margin = "7px";
//         document.getElementById(selector).style.backgroundColor = "rgb(" + startButtonColorNumber + "," + startButtonColorNumber + "," + startButtonColorNumber + ")";
//     })
// };


function buttonSize(idArray) {
    idArray.map(function (selector) {
        document.getElementById(selector).style.height = "15px";
        document.getElementById(selector).style.width = "15px";
        document.getElementById(selector).style.border = "0px";
        document.getElementById(selector).style.borderColor = "gray";
        document.getElementById(selector).style.margin = "2px";
        document.getElementById(selector).style.backgroundColor = "rgb(" + startButtonColorNumber + "," + startButtonColorNumber + "," + startButtonColorNumber + ")";
        document.getElementById(selector).style.borderRadius = "0px";
    })
}
buttonSize(buttons);
