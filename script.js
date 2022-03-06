'use strict'
// // 1行目に記載している 'use strict' は削除しないでください

// function test(actual, expected) {
//     if (JSON.stringify(actual) === JSON.stringify(expected)) {
//         console.log("Yay! Test PASSED.");
//     } else {
//         console.error("Test FAILED. Keep trying!");
//         console.log("    actual: ", actual);
//         console.log("  expected: ", expected);
//         console.trace();
//     }
// }

//ボタンのidをセットする
const buttons = [];
const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let lengthOfButtons = 11;
for (let i = 0; i < lengthOfButtons; i++) {
    for (let j = 0; j < lengthOfButtons; j++) {
        buttons.push(alphabet[i] + j);
    }
}

// const buttons = [
//     "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9",
//     "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9",
//     "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9",
//     "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9",
//     "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9",
//     "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9",
//     "g0", "g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8", "g9",
//     "h0", "h1", "h2", "h3", "h4", "h5", "h6", "h7", "h8", "h9",
//     "i0", "i1", "i2", "i3", "i4", "i5", "i6", "i7", "i8", "i9",
//     "j0", "j1", "j2", "j3", "j4", "j5", "j6", "j7", "j8", "j9"
// ];

//ボタンのidのx座標をセットする
const xPosition = {};
for (let i = 0; i < lengthOfButtons; i++) {
    for (let j = 0; j < lengthOfButtons; j++) {
        xPosition[alphabet[i] + j] = j;
    }
}

// const xPosition = {
//     "a0": 0, "a1": 1, "a2": 2, "a3": 3, "a4": 4, "a5": 5, "a6": 6, "a7": 7, "a8": 8, "a9": 9,
//     "b0": 0, "b1": 1, "b2": 2, "b3": 3, "b4": 4, "b5": 5, "b6": 6, "b7": 7, "b8": 8, "b9": 9,
//     "c0": 0, "c1": 1, "c2": 2, "c3": 3, "c4": 4, "c5": 5, "c6": 6, "c7": 7, "c8": 8, "c9": 9,
//     "d0": 0, "d1": 1, "d2": 2, "d3": 3, "d4": 4, "d5": 5, "d6": 6, "d7": 7, "d8": 8, "d9": 9,
//     "e0": 0, "e1": 1, "e2": 2, "e3": 3, "e4": 4, "e5": 5, "e6": 6, "e7": 7, "e8": 8, "e9": 9,
//     "f0": 0, "f1": 1, "f2": 2, "f3": 3, "f4": 4, "f5": 5, "f6": 6, "f7": 7, "f8": 8, "f9": 9,
//     "g0": 0, "g1": 1, "g2": 2, "g3": 3, "g4": 4, "g5": 5, "g6": 6, "g7": 7, "g8": 8, "g9": 9,
//     "h0": 0, "h1": 1, "h2": 2, "h3": 3, "h4": 4, "h5": 5, "h6": 6, "h7": 7, "h8": 8, "h9": 9,
//     "i0": 0, "i1": 1, "i2": 2, "i3": 3, "i4": 4, "i5": 5, "i6": 6, "i7": 7, "i8": 8, "i9": 9,
//     "j0": 0, "j1": 1, "j2": 2, "j3": 3, "j4": 4, "j5": 5, "j6": 6, "j7": 7, "j8": 8, "j9": 9
// };

//ボタンのidのx座標をセットする

const yPosition = {};
for (let i = 0; i < lengthOfButtons; i++) {
    for (let j = 0; j < lengthOfButtons; j++) {
        yPosition[alphabet[i] + j] = i;
    }
}

// const yPosition = {
//     "a0": 0, "a1": 0, "a2": 0, "a3": 0, "a4": 0, "a5": 0, "a6": 0, "a7": 0, "a8": 0, "a9": 0,
//     "b0": 1, "b1": 1, "b2": 1, "b3": 1, "b4": 1, "b5": 1, "b6": 1, "b7": 1, "b8": 1, "b9": 1,
//     "c0": 2, "c1": 2, "c2": 2, "c3": 2, "c4": 2, "c5": 2, "c6": 2, "c7": 2, "c8": 2, "c9": 2,
//     "d0": 3, "d1": 3, "d2": 3, "d3": 3, "d4": 3, "d5": 3, "d6": 3, "d7": 3, "d8": 3, "d9": 3,
//     "e0": 4, "e1": 4, "e2": 4, "e3": 4, "e4": 4, "e5": 4, "e6": 4, "e7": 4, "e8": 4, "e9": 4,
//     "f0": 5, "f1": 5, "f2": 5, "f3": 5, "f4": 5, "f5": 5, "f6": 5, "f7": 5, "f8": 5, "f9": 5,
//     "g0": 6, "g1": 6, "g2": 6, "g3": 6, "g4": 6, "g5": 6, "g6": 6, "g7": 6, "g8": 6, "g9": 6,
//     "h0": 7, "h1": 7, "h2": 7, "h3": 7, "h4": 7, "h5": 7, "h6": 7, "h7": 7, "h8": 7, "h9": 7,
//     "i0": 8, "i1": 8, "i2": 8, "i3": 8, "i4": 8, "i5": 8, "i6": 8, "i7": 8, "i8": 8, "i9": 8,
//     "j0": 9, "j1": 9, "j2": 9, "j3": 9, "j4": 9, "j5": 9, "j6": 9, "j7": 9, "j8": 9, "j9": 9
// };

const startButtonColorNumber = 140;

//////////////////////////////////////////////////////////////////////////////
//ボタンが押されたら、、、のスイッチを配列に入った要素のidに
//対して行えるようにする。
//ファイル読み終わり後にマウスが通過したらコンソールに表示する関数
function buttonSet(selector) {
    window.addEventListener('load', function () {
        const pushButton = document.getElementById(selector)
        pushButton.addEventListener('mousedown', function () {
            // changeColorBlack(selector);  //ボタンを押したら、関数(selector)を実行できる。
            setColor();
            perform();
            // perform2();
        })
    })
    window.addEventListener('load', function () {
        const overButton = document.getElementById(selector)
        overButton.addEventListener('mouseover', function () {
            //        changeColorBlack(selector);  //マウスが通過したら、どのタイミングで色を変えるか計算する。
            keyArray.splice(0, keyArray.length);
            valueArray.splice(0, valueArray.length);
            timingArray.splice(0, timingArray.length);
            // offColor.splice(0, offColor.length);
            // delayTime.splice(0, delayTime.length);
            measureDistance(selector);
            objectToArray(distanceObject);
            adjustOrder(keyArray, valueArray);
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
function setColor() {
    //    color = colors[Math.floor(Math.random(6) * 6)];
    let r = randomRange();
    let g = randomRange();
    let b = randomRange()
    color = "rgb(" + r + "," + g + "," + b + ")";
    let checkR = true;
    let checkG = true;
    let checkB = true;
    while (checkR || checkG || checkB) {
        if (r - 10 < startButtonColorNumber) {
            r = startButtonColorNumber;
            checkR = false;
        } else {
            r = r - 10;
        }
        if (g - 10 < startButtonColorNumber) {
            g = startButtonColorNumber;
            checkG = false;
        } else {
            g = g - 10;
        }
        if (b - 10 < startButtonColorNumber) {
            b = startButtonColorNumber;
            checkB = false;
        } else {
            b = b - 10;
        }
        offColor.push("rgb(" + r + "," + g + "," + b + ")");
        delayTime.push(startDelayTime);
        startDelayTime += 500;
    }
}

const upperRGB = 240;
const lowerRGB = 193;
function randomRange() {
    return Math.floor(Math.random() * (upperRGB - lowerRGB)) + lowerRGB;
}


//ボタンの色を変える関数
function changeColor(id) {
    // document.getElementById(id).style.backgroundColor = "red";
    // const color = colors[Math.floor(Math.random(6)*6)];
    document.getElementById(id).style.backgroundColor = color;
}
//ボタンの色を初期値に戻す関数
function changeColorInitial(id) {
    // document.getElementById(id).style.backgroundColor = "red";
    // const color = colors[Math.floor(Math.random(6)*6)];
    document.getElementById(id).style.backgroundColor = "rgb(" + startButtonColorNumber + "," + startButtonColorNumber + "," + startButtonColorNumber + ")";
}
//////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////
//呼ばれたら次々とchangeColor関数を実施する関数
function perform() {
    // const color = colors[Math.floor(Math.random(6)*6)];
    for (let i = 0; i < timingArray.length; i++) {
        timer(keyArray[i], timingArray[i]);
        offTimer(keyArray[i], timingArray[i]+700);
    }
}

//呼ばれたら次々とchangeColor関数を実施する関数
function perform2() {
    // const color = colors[Math.floor(Math.random(6)*6)];
    for (let i = 0; i < delayTime.length; i++) {
        buttons.map(function (selector) {
            setTimeout(turnOffColor, delayTime[i], selector, offColor[i]);
        })

    }
    offColor.splice(0, offColor.length);
    delayTime.splice(0, delayTime.length);
}

function turnOffColor(id, colorNext) {
    // document.getElementById(id).style.backgroundColor = "red";
    // const color = colors[Math.floor(Math.random(6)*6)];
    document.getElementById(id).style.backgroundColor = colorNext;
}



//////////////////////time経過後にchangeColorを実行する関数
function timer(selector, time) {
    setTimeout(changeColor, time, selector);
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
        console.log("element: " + element + "selector: " + selector + "x,y:" + xPosition[element] + " , " + xPosition[selector]);
        distanceObject[element] =
            Math.floor(Math.sqrt((xPosition[element] - xPosition[selector]) ** 2
                + (yPosition[element] - yPosition[selector]) ** 2) * 100) / 100;
    }
}

////distanceObjectから配列を二つ作る。
////(1)classを要素とする配列keyArray
////(2)valueを要素とする配列valueArray
const keyArray = [];
const valueArray = [];
function objectToArray(object) {
    for (const key in object) {
        keyArray.push(key);
        // console.log(object[key]);
        valueArray.push(object[key]);
    }
}

////keyArray valueArray の順番を小さい順に並べ替える。
////(1)value（距離）の小さい順番に並んでいるclass名からなる配列keyArray
////(2)value（距離）の小さい順番に並んでいるclass名からなる配列valueArray

function adjustOrder(keyArray, valueArray) {
    let moveDone = true;
    while (moveDone === true) {
        moveDone = false;
        for (let i = 0; i < valueArray.length - 1; i++) {
            if (valueArray[i] > valueArray[i + 1]) {
                let leftValue = valueArray[i + 1];
                let rightValue = valueArray[i];
                valueArray[i] = leftValue;
                valueArray[i + 1] = rightValue;
                let leftKey = keyArray[i + 1];
                let rightKey = keyArray[i];
                keyArray[i] = leftKey;
                keyArray[i + 1] = rightKey;
                moveDone = true;
            }
        }
    }
}

////valueArrayから、実施するタイミングを配列とする
const timingArray = [];
function calcInterval(anyArray) {
    for (let i = 0; i < anyArray.length; i++) {
        if (i === 0) {
            timingArray.push(0);
        } else {
            // intervalArray.push(Math.floor((anyArray[i]-anyArray[i-1])*1000));
            timingArray.push(Math.floor((anyArray[i]) * 100));
        }
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
        document.getElementById(selector).style.height = "20px";
        document.getElementById(selector).style.width = "20px";
        document.getElementById(selector).style.border = "3px";
        document.getElementById(selector).style.borderColor = "gray";
        document.getElementById(selector).style.margin = "7px";
        document.getElementById(selector).style.backgroundColor = "rgb(" + startButtonColorNumber + "," + startButtonColorNumber + "," + startButtonColorNumber + ")";
        document.getElementById(selector).style.borderRadius = "10px";
    })
}
buttonSize(buttons);









