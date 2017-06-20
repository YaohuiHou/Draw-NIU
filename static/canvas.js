
// Copyright 2010 William Malone (www.williammalone.com)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var canvas;
var context;
var canvasWidth = 640;
var canvasHeight = 630;
var padding = 25;
var lineWidth = 25;
var backgroundColor = "#eef5f8"
var colorPurple = "#4e2d14";
// var colorGreen = "#659b41";
// var colorYellow = "#ffcf33";
// var colorBrown = "#986928";
var outlineImage = new Image();
var erweimaImage = new Image();
var clickX = new Array();
var clickY = new Array();
var clickColor = new Array();
var clickTool = new Array();
var clickSize = new Array();
var clickDrag = new Array();
var paint = false;
var curColor = colorPurple;
var curTool = "crayon";
var curSize = "normal";
var drawingAreaX = 0;
var drawingAreaY = 0;
var drawingAreaWidth = 640;
var drawingAreaHeight = 630;
var totalLoadResources = 8;
var curLoadResNum = 0;

//设置图片跨域访问
// outlineImage.setAttribute('crossOrigin', 'anonymous');
//  outlineImage.crossOrigin = "*"
/**
* Calls the redraw function after all neccessary resources are loaded.
*/
function resourceLoaded() {
    // if(++curLoadResNum >= totalLoadResources){
    redraw();
    // }
}

/**
* Creates a canvas element, loads images, adds events, and draws the canvas for the first time.
*/
var canvas = document.getElementById('canvasDiv');
function prepareCanvas() {
    // Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
    // canvas = document.createElement('canvas');
    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);

    // canvas.setAttribute('id', 'canvas');
    // canvasDiv.appendChild(canvas);
    if (typeof G_vmlCanvasManager != 'undefined') {
        canvas = G_vmlCanvasManager.initElement(canvas);
    }
    context = canvas.getContext("2d"); // Grab the 2d canvas context
    // Load images
    outlineImage.onload = function() {
        resourceLoaded();
    };
    erweimaImage.onload = function() {
        resourceLoaded();
    };
    // outlineImage.src = "https://s.kcimg.cn/wap/images/game/20170601/niuniu.png?v1";
    outlineImage.src = "niuniu.png";
    erweimaImage.src = "erweima.png"
    // Add mouse events
    // ----------------
    // var canvas = document.querySelector('#canvas');
    canvas.addEventListener('touchstart', function(event) {
        event.preventDefault();

        var e = event.targetTouches[0];
        // Mouse down location
        var mouseX = e.clientX - this.offsetLeft;
        var mouseY = e.clientY - this.offsetTop;

        curColor = colorPurple;
        // if(mouseY > drawingAreaY && mouseY < drawingAreaY + drawingAreaHeight)
        // {
        // 	// Mouse click location on drawing area
        // }
        paint = true;
        addClick(mouseX, mouseY, false);
        redraw();
    });

    canvas.addEventListener('touchmove', function(event) {
        event.preventDefault();
        var e = event.targetTouches[0];
        if (paint == true) {
            addClick(e.clientX - this.offsetLeft, e.clientY - this.offsetTop, true);
            redraw();
        }
    });

    canvas.addEventListener('touchend', function(e) {
        paint = false;
        redraw();
    });

}


/**
* Adds a point to the drawing array.
* @param x
* @param y
* @param dragging
*/
function addClick(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickTool.push(curTool);
    clickColor.push(curColor);
    clickSize.push(curSize);
    clickDrag.push(dragging);
}

/**
* Clears the canvas.
*/
function clearCanvas() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
}

/**
* Redraws the canvas.
*/
function redraw() {
    // Make sure required resources are loaded before redrawing
    // if(curLoadResNum < totalLoadResources){ return; }

    clearCanvas();
    // 背景色
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    var locX;
    var locY;

    if (curSize == "small") {
        locX = 467;
    } else if (curSize == "normal") {
        locX = 450;
    } else if (curSize == "large") {
        locX = 428;
    } else if (curSize == "huge") {
        locX = 399;
    }
    locY = 189;
    context.beginPath();
    context.rect(locX, locY, 2, 12);
    context.closePath();
    context.fillStyle = '#333333';
    context.fill();

    // Keep the drawing in the drawing area
    context.save();
    context.beginPath();
    context.rect(drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
    context.clip();

    var radius;
    var i = 0;
    for (; i < clickX.length; i++) {
        if (clickSize[i] == "small") {
            radius = 20;
        } else if (clickSize[i] == "normal") {
            radius = 25;
        } else if (clickSize[i] == "large") {
            radius = 10;
        } else if (clickSize[i] == "huge") {
            radius = 20;
        } else {
            alert("Error: Radius is zero for click " + i);
            radius = 0;
        }

        context.beginPath();
        if (clickDrag[i] && i) {
            context.moveTo(clickX[i - 1], clickY[i - 1]);
        } else {
            context.moveTo(clickX[i], clickY[i]);
        }
        context.lineTo(clickX[i], clickY[i]);
        context.closePath();

        if (clickTool[i] == "eraser") {
            //context.globalCompositeOperation = "destination-out"; // To erase instead of draw over with white
            context.strokeStyle = 'white';
        } else {
            //context.globalCompositeOperation = "source-over";	// To erase instead of draw over with white
            context.strokeStyle = clickColor[i];
        }
        context.lineJoin = "round";
        context.lineWidth = radius;
        context.stroke();

    }
    context.restore();

    // Overlay a crayon texture (if the current tool is crayon)
    if (curTool == "crayon") {
        context.globalAlpha = 0.4; // No IE support
        // context.drawImage(crayonTextureImage, 0, 0, canvasWidth, canvasHeight);
    }
    context.globalAlpha = 1; // No IE support

    // Draw the outline image
    context.drawImage(outlineImage, drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
    context.drawImage(erweimaImage, 550, 540, 80, 80);
}

prepareCanvas();
/**/
