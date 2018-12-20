var draw = (function () {

    //Get the height and width of the main we will use this set canvas to the full
    //size of the main element.
    var mWidth = document.querySelector('main').offsetWidth;
    var mHeight = document.querySelector('main').offsetHeight;

    //Create the canvas
    var canvas = document.createElement("canvas");
    canvas.width = mWidth;
    canvas.height = mHeight;
    document.querySelector('main').appendChild(canvas);

    //Create the context
    var ctx = canvas.getContext("2d");

    //create initial bounding rectangle
    var rect = canvas.getBoundingClientRect();

    //current x and y position
    var x = 0;
    var y = 0;

    var x1 = 0;
    var x2 = 0;

    var y1 = 0;
    var y2 = 0;

    var lx = 0;
    var ly = 0;

    var strokeColor;
    var fillColor;

    var defaultColor = '#333333';

    var isDrawing = false;

    var shape = '';

    return {

        setIsDrawing: function (bool) {
            isDrawing = bool;
        },

        getIsDrawing: function () {
            return isDrawing;
        },

        //Set the x,y coords based on current event data
        setXY: function (evt) {
            lx = x;
            ly = y;

            x = (evt.clientX - rect.left); //canvas.offsetLeft;
            y = (evt.clientY - rect.top) - canvas.offsetTop;
        },

        setStroke: function (event) {
            strokeColor = event.target.value;
            //            console.log(strokeColor);
        },

        setFill: function (event) {
            fillColor = event.target.value;
            console.log(fillColor);
        },

        //Write the x,y coods to the target div
        writeXY: function () {
            document.getElementById('trackX').innerHTML = 'X: ' + x;
            document.getElementById('trackY').innerHTML = 'Y: ' + y;
        },

        //Set the x1,y1
        setStart: function () {
            x1 = x;
            y1 = y;
        },

        //Set the x2,y2
        setEnd: function () {
            x2 = x;
            y2 = y;
        },

        //Sets the shape to be drawn
        setShape: function (shp) {
            shape = shp;
        },

        getShape: function () {
            return shape;
        },

        draw: function () {
            ctx.restore();
            if (shape === 'rectangle') {
                this.drawRect();
            }
            else if (shape === 'line') {
                this.drawLine();
            }
            else if (shape === 'circle') {
                this.drawCircle();
            }
            else if (shape === 'path') {
                this.drawPath();
            }
            else if (shape === 'triangle') {
                this.drawTriangle();
            }
            else {
                alert('Please choose a shape');
            }
        },

        drawPath: function () {
            ctx.strokeStyle = strokeColor;
            ctx.beginPath();
            ctx.moveTo(lx, ly);
            ctx.lineTo(x, y);
            ctx.stroke();
        },

        drawCircle: function () {
            ctx.strokeStyle = strokeColor;
            ctx.fillStyle = fillColor;
            let a = (x1 - x2);
            let b = (y1 - y2);
            let radius = Math.sqrt(a * a + b * b);

            ctx.beginPath();
            ctx.arc(x1, y1, radius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fill();
        },

        //Draw a line
        drawLine: function () {
            //Start by using random fill colors.
            ctx.strokeStyle = strokeColor;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        },

        //Draw a triangle
        drawTriangle: function () {
            ctx.strokeStyle = strokeColor;
            ctx.fillStyle = fillColor;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineTo(x2, y1);
            ctx.lineTo(x1, y1);
            ctx.stroke();
            ctx.fill();
        },

        //Draw a rectangle
        drawRect: function () {
            //Start by using random fill colors.
            ctx.fillStyle = fillColor;
            ctx.fillRect(x1, y1, (x2 - x1), (y2 - y1));
        },

        getCanvas: function () {
            return canvas;
        },

        //Initialize the object, this must be called before anything else
        init: function () {
            canvas.width = mWidth;
            canvas.height = mHeight;
            document.querySelector('main').appendChild(canvas);

        }
    };

})();

draw.init();

//add mousemove listener to canvas
//Reports x and y position of mouse

draw.getCanvas().addEventListener('mousemove', function (evt) {
    draw.setXY(evt);
    draw.writeXY();
    if (draw.getShape() == 'path' && draw.getIsDrawing()) {
        draw.draw();
    }
}, false);

//Add a mousedown listener to the canvas
//Set the starting position
draw.getCanvas().addEventListener('mousedown', function () {
    draw.setStart();
    draw.setIsDrawing(true);
}, false);

//Add a mouseup listener to the canvas
//Set the end position and draw the rectangle
draw.getCanvas().addEventListener('mouseup', function () {
    draw.setEnd();
    draw.draw();
    draw.setIsDrawing(false);
}, false);

draw.drawRect();

document.getElementById('btnRect').addEventListener('click', function () {
    draw.setShape('rectangle');
})
document.getElementById('btnLine').addEventListener('click', function () {
    draw.setShape('line');
})
document.getElementById('btnCircle').addEventListener('click', function () {
    draw.setShape('circle');
})
document.getElementById('btnPath').addEventListener('click', function () {
    draw.setShape('path');
})
document.getElementById('btnTriangle').addEventListener('click', function () {
    draw.setShape('triangle');
})
document.getElementById('stroke').addEventListener('input', draw.setStroke, false);

document.getElementById('fill').addEventListener('input', draw.setFill, false);
