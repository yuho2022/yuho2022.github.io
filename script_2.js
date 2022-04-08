'use strict';
// please do not delete the 'use strict' line above

document.getElementById('color-button').addEventListener('click', changeColor);
document.getElementById('reset').addEventListener('click', reset);
document.getElementById('auto-on').addEventListener('click', autoOnColor);
document.getElementById('auto-off').addEventListener('click', colorStop);
document.getElementById('move-off').addEventListener('click', stopOtherMove);
document.getElementById('move-on').addEventListener('click', moveOn);
document.getElementById('roulette').addEventListener('click', roulette);
document.getElementById('drop').addEventListener('click', drop);
document.getElementById('pulse').addEventListener('click', pulse);
document.getElementById('balloon').addEventListener('click', balloon);
document.getElementById('gradation').addEventListener('click', gradation);
document.getElementById('clock').addEventListener('click', clock);

function changeColor() {
  gradationOff();
  console.log('Button clicked!'); // feel free to change/delete this line
  let red = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);
  let randomColor = "rgb(" + red + ", " + green + " , " + blue + ")";
  document.getElementById('body').style.backgroundColor = randomColor;
}

/////////////////////////////////////////////////////////////
//ボタン順番決定
/////////////////////////////////////////////////////////////
const buttonId = ["color-button", "auto-on", "gradation", "auto-off", "reset", "move-off",
"move-on", "roulette", "drop", "pulse", "balloon", "clock"];

//各ボタンのpositionをabsoluteに設定
function buttonIdSet() {
  for (const element of buttonId) {
    document.getElementById(element).style.position = "absolute";
  }
}
buttonIdSet();

/////////////////////////////////////////////////////////////
//各種動作設定～基本の考え方
//ボタンがクリックされたら
//１．最初に呼ばれた関数が不要な動きを止めて、
//    setInerval()で動きを決める関数を呼び出す
//２．動きを計算、documentに反映
//リセット、ストップがかかったら動きを止める
/////////////////////////////////////////////////////////////

let intervalID = 0;

function autoOnColor() {
  console.log('Auto-on clicked! ' + intervalID);
  if (intervalID === 0) {
    intervalID = setInterval(changeColor, 1500);
    buttonColorOn("auto-on");
  }
}

let intervalID2 = 0;
let rotateAngle = 0;
const originTop = 400;
const originWidth = 325;
const radius = 300;
const rewritePeriod = 15;
const rotatePeriod = 10000;
document.getElementById('body').style.backgroundColor = "rgb(255,255,255)";
calculateCoordinate();

function moveOn() {
  stopOtherMove("move-on");
  if (intervalID2 === 0) {
    intervalID2 = setInterval(calculateCoordinate, rewritePeriod);
    buttonColorOn("move-on");
  }
}

function calculateCoordinate() {
  for (let i = 0; i < buttonId.length; i++) {
    document.getElementById(buttonId[i]).style.top = `${originTop - radius * (0.8 + 0.2 * Math.cos(rotateAngle)) * Math.cos(2 * Math.PI / buttonId.length * i + rotateAngle)}px`;
    document.getElementById(buttonId[i]).style.left = `${originWidth - radius * (0.8 + 0.2 * Math.cos(rotateAngle)) * Math.sin(2 * Math.PI / buttonId.length * i + rotateAngle)}px`;
  }
  rotateAngle -= 2 * Math.PI / rotatePeriod * rewritePeriod;
}

/////////////////////////////////////////////////////////////

let intervalID3 = 0; //roulette()用
let speedConst = 25;

function roulette() {
  if (intervalID3 === 0) {
    stopOtherMove("roulette");
    intervalID3 = setInterval(calculateRoulette, rewritePeriod);
    buttonColorOn("roulette");
  }
}

function calculateRoulette() {
  if (speedConst > 0) {
    for (let i = 0; i < buttonId.length; i++) {
      document.getElementById(buttonId[i]).style.top = `${originTop - radius * Math.cos(2 * Math.PI / buttonId.length * i + rotateAngle)}px`;
      document.getElementById(buttonId[i]).style.left = `${originWidth - radius * Math.sin(2 * Math.PI / buttonId.length * i + rotateAngle)}px`;
    }
    rotateAngle -= 2 * Math.PI / rotatePeriod * rewritePeriod * speedConst;
    speedConst -= 0.1;
  } else {
    rouletteOff();
  }
}

/////////////////////////////////////////////////////////////

let intervalID4 = 0; //drop()用
let moveTime = 0;
let topShift = 0;
function drop() {
  stopOtherMove("drop");
  moveTime = 0;
  console.log('drop clicked!');
  if (intervalID4 === 0) {
    intervalID4 = setInterval(calculateDrop, rewritePeriod);
    buttonColorOn("drop");
  }
}

let topValue;
function calculateDrop() {
  if (topShift < 2000) {
    for (let i = 0; i < buttonId.length; i++) {
      if (buttonId[i] !== "reset") {
        topValue = Number(document.getElementById(buttonId[i]).style.top.slice(0, -2));
        leftValue = Number(document.getElementById(buttonId[i]).style.left.slice(0, -2));
        if (topValue + topShift < 760) {
          document.getElementById(buttonId[i]).style.top = `${topValue + topShift}px`;
        } else {
          document.getElementById(buttonId[i]).style.top = "760 px";
        }
      }
    }
    topShift = 0.5 * 9.8 * moveTime ** 2;
    moveTime += 0.1;
  } else {
    dropOff();
  }
}

/////////////////////////////////////////////////////////////

let intervalID5 = 0;
let magnification = 1;

function pulse() {
  stopOtherMove("pulse");
  moveTime = 0;
  console.log('pulse clicked!');
  if (intervalID5 === 0) {
    intervalID5 = setInterval(calculatePulse, rewritePeriod);
    buttonColorOn("pulse");
  }
}

function calculatePulse() {
  if (speedConst > 0) {
    for (let i = 0; i < buttonId.length; i++) {
      document.getElementById(buttonId[i]).style.top = `${originTop - radius * magnification * Math.cos(2 * Math.PI / buttonId.length * i + rotateAngle)}px`;
      document.getElementById(buttonId[i]).style.left = `${originWidth - radius * magnification * Math.sin(2 * Math.PI / buttonId.length * i + rotateAngle)}px`;
    }
    magnification = Math.abs(Math.cos(2 * Math.PI / 3000 * moveTime));
    moveTime += rewritePeriod;
  }
}

/////////////////////////////////////////////////////////////

let intervalID6 = 0;
let shiftSpeed;

function balloon() {
  stopOtherMove("balloon");
  shiftSpeed = 5 * (Math.random() - 0.5);
  moveTime = 0;
  console.log('balloon clicked!');
  if (intervalID6 === 0) {
    intervalID6 = setInterval(calculateBalloon, rewritePeriod);
    buttonColorOn("balloon");
  }
}

let leftValue;
let shiftedLeft;
const leftLimit = 0
const rightLimit = originWidth * 2;

function calculateBalloon() {
  if (topShift < 2000) {
    for (let i = 0; i < buttonId.length; i++) {
      if (buttonId[i] !== "reset") {
        topValue = Number(document.getElementById(buttonId[i]).style.top.slice(0, -2));
        if (topValue - topShift > 0) {
          document.getElementById(buttonId[i]).style.top = `${topValue - topShift}px`;
          leftValue = Number(document.getElementById(buttonId[i]).style.left.slice(0, -2));
          shiftedLeft = leftValue + shiftSpeed;
          if (shiftedLeft >= leftLimit && shiftedLeft <= rightLimit) {
            document.getElementById(buttonId[i]).style.left = `${shiftedLeft}px`;
          } else if (shiftedLeft < leftLimit) {
            shiftedLeft = leftLimit;
          } else if (shiftedLeft > rightLimit) {
            shiftedLeft = rightLimit;
          }
        } else {
          document.getElementById(buttonId[i]).style.top = "50 px";
        }
      }
    }
    topShift = 3; //定数にすると雰囲気が出た
    moveTime += 0.1; //共用化できていない、改良必要
  } else {
    balloonOff();
  }
}

/////////////////////////////////////////////////////////////

let intervalID7 = 0;
let currentRGB = [];
let targetRGB = [];
let deltaRGB = [];
let colorTime = 0; //moveTimeと共存できるように色専用時間を設定
const gradatePeriod = 3000;
function gradation() {
  autoOffColor();
  colorTime = 0;
  //開始時のRGBを取得
  currentRGB = document.getElementById('body').style.backgroundColor.slice(4).slice(0, -1).split(",").map(x => Number(x));
  //変化するRGBを決める
  for (let i = 0; i < 3; i++) {
    targetRGB.push(Math.floor(Math.random() * 255));
  }
  console.log(targetRGB[0], targetRGB[1], targetRGB[2]);
  //ステップごとのRGB変化代を計算
  for (let i = 0; i < 3; i++) {
    deltaRGB[i] = (targetRGB[i] - currentRGB[i]) / (gradatePeriod / rewritePeriod);
    console.log("target", targetRGB[0], targetRGB[1], targetRGB[2]);
  }
  if (intervalID7 === 0) {
    intervalID7 = setInterval(calculateGradation, rewritePeriod);
    buttonColorOn("gradation");
  }
}

function calculateGradation() {
  console.log("in calcGrad", currentRGB[0], currentRGB[1], currentRGB[2]);
  //RGBを取得、代入
  if (colorTime <= gradatePeriod) {
    document.getElementById('body').style.backgroundColor = "rgb(" + currentRGB[0] + ", " + currentRGB[1] + " , " + currentRGB[2] + ")";
    //RGBをインクリメント
    for (let i = 0; i < 3; i++) {
      currentRGB[i] += deltaRGB[i];
    }
    colorTime += rewritePeriod;
  } else {
    gradationOff();
    gradation();
  }
}

/////////////////////////////////////////////////////////////

let intervalID8 = 0;
const movePeriod = 500;
const stopPeriod = 500;

function clock() {
  stopOtherMove("clock");
  if (intervalID8 === 0) {
    intervalID8 = setInterval(calculateClock, rewritePeriod);
    buttonColorOn("clock");
  }
}

const rotatePeriod2 = 8590; //1step 30°にするための調整、改良必要
function calculateClock() {
  if (moveTime <= movePeriod) {
    rotateAngle -= 2 * Math.PI / buttonId.length / rotatePeriod2 * moveTime;
    for (let i = 0; i < buttonId.length; i++) {
      document.getElementById(buttonId[i]).style.top = `${originTop - radius * Math.cos(2 * Math.PI / buttonId.length * i + rotateAngle)}px`;
      document.getElementById(buttonId[i]).style.left = `${originWidth - radius * Math.sin(2 * Math.PI / buttonId.length * i + rotateAngle)}px`;
    }
  } else if (moveTime > movePeriod && moveTime <= movePeriod + stopPeriod) {
    //この間は停止。
  } else if (moveTime > movePeriod + stopPeriod) {
    moveTime = 0;
    console.log("rotateAngle",rotateAngle);
  }
  moveTime += rewritePeriod;
}

/////////////////////////////////////////////////////////////
// Functions of Stop , Off関連
/////////////////////////////////////////////////////////////

function stopOtherMove(id) {
  // if(id !== "auto-on"){
  //   autoOffColor();
  // }
  if (id !== "move-on") {
    moveOff();
  }
  if (id !== "roulette") {
    rouletteOff();
  }
  if (id !== "drop") {
    dropOff();
  }
  if (id !== "pulse") {
    pulseOff();
  }
  if (id !== "balloon") {
    balloonOff();
  }
  if (id !== "clock") {
    clockOff();
  }
}

function reset() {
  console.log('reset clicked!');
  document.getElementById('body').style.backgroundColor = "rgb(255, 255,255)"
  autoOffColor();
  gradationOff();
  stopOtherMove(undefined);
  rotateAngle = 0;
  calculateCoordinate();
}

function colorStop() {
  autoOffColor();
  gradationOff();
}


function autoOffColor() {
  console.log('Auto-off clicked!');
  // stopOtherMove(undefined);
  clearInterval(intervalID);
  intervalID = 0;
  buttonColorOff("auto-on");
}

function moveOff() {
  console.log('Move-off clicked!');
  clearInterval(intervalID2);
  intervalID2 = 0;
  buttonColorOff("move-on");
}

function rouletteOff() {
  clearInterval(intervalID3);
  intervalID3 = 0;
  buttonColorOff("roulette");
  speedConst = 25;
}

function dropOff() {
  clearInterval(intervalID4);
  intervalID4 = 0;
  buttonColorOff("drop");
  topShift = 0;
}
function pulseOff() {
  clearInterval(intervalID5);
  intervalID5 = 0;
  buttonColorOff("pulse");
  magnification = 1;
  moveTime = 0;
}

function balloonOff() {
  clearInterval(intervalID6);
  intervalID6 = 0;
  buttonColorOff("balloon");
  topShift = 0;
  moveTime = 0;
}

function gradationOff() {
  colorTime = 0;
  clearInterval(intervalID7);
  intervalID7 = 0;
  targetRGB.splice(0, 3);
  console.log("targetRGB", targetRGB);
  buttonColorOff("gradation");
}

function clockOff() {
  clearInterval(intervalID8);
  intervalID8 = 0;
  buttonColorOff("clock");
  moveTime = 0;
}
//////////////////////////////////////////////////////////////////
// ボタンカラーon/offの切り替え、共通化のため設定
//////////////////////////////////////////////////////////////////
function buttonColorOn(id) {
  document.getElementById(id).style.backgroundColor = "black";
  document.getElementById(id).style.color = "white";
}

function buttonColorOff(id) {
  document.getElementById(id).style.backgroundColor = "RGB(240,240,240)";
  document.getElementById(id).style.color = "black";
}