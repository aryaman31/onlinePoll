var myCanvas = document.getElementById("myCanvas");
myCanvas.width = document.getElementById("graph-block").clientWidth - 20;
myCanvas.height = document.getElementById("graph-block").clientHeight - 20;
var displayGraph = false

var ctx = myCanvas.getContext("2d");

function drawLine(ctx, startX, startY, endX, endY, color) {
	ctx.save();
	ctx.strokeStyle = color;
	ctx.beginPath();
	ctx.moveTo(startX, startY);
	ctx.lineTo(endX, endY);
	ctx.stroke();
	ctx.restore();
}

function drawBar(ctx, ulX, ulY, width, height, color) {
	ctx.save();
	ctx.fillStyle = color;
	ctx.fillRect(ulX, ulY, width, height);
	ctx.restore();
}

var Barchart = function(options) {

	this.options = options;
	this.canvas = options.canvas;
	this.ctx = this.canvas.getContext("2d");
	this.colors = options.colors;

	this.draw = function() {
		// var maxValue = 0;
		// for (var categ in this.options.data) {
		// 	maxValue = Math.max(maxValue, this.options.data[categ]);
		// }

		var canvasActualHeight = this.canvas.height - this.options.padding * 2;
	    var canvasActualWidth = this.canvas.width - this.options.padding * 2;

	    var gridValue = 0;
	    for (var i = 0; i <= this.options.maxValue + 1; i += this.options.gridScale) {
	    	var gridY = canvasActualHeight * (1 - i/12) + this.options.padding;
	    	drawLine(this.ctx, 0, gridY, this.canvas.width, gridY, this.options.gridColor);

	    	this.ctx.save();
	        this.ctx.fillStyle = this.options.gridColor;
	        this.ctx.font = "bold 10px Arial";
	        this.ctx.fillText(gridValue, 0,gridY - 2);
	        this.ctx.restore();

	        gridValue+=this.options.gridScale;
	    }

	    var barIndex = 0;
	    var numberOfBars = Object.keys(this.options.data).length;
	    var barSize = canvasActualWidth/numberOfBars;

	    for (categ in this.options.data) {
	    	var val = this.options.data[categ];
	    	var barHeight = Math.round(canvasActualHeight * val/this.options.maxValue);
	    	drawBar(
	    		this.ctx, 
	    		this.options.padding + barIndex * barSize + 5,
                this.canvas.height - barHeight - this.options.padding,
                barSize,
                barHeight,
                this.colors[barIndex%this.colors.length]
            );

            barIndex++;
	    }
	}
}

function draw() {
	ref = database.ref("counters");
	ref.on('value', function (snap) {
	if (displayGraph) {
		var temp = snap.val();
		var scores = {
			"maneesh": temp.maneesh,
			"shruti": temp.shruti,
			"deppali": temp.deppali,
			"shrey": temp.shrey,
			"sharon": temp.sharon,
			"neville": temp.neville,
			"ajay": temp.ajay,
			"shilpa": temp.shilpa,
			"puja": temp.puja,
			"mayank": temp.mayank,
			"vaishali": temp.vaishali,
			"mayur": temp.mayur,
			"rajni": temp.rajni,
			"deepesh": temp.deepesh
		}
		ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
		var myBarchart = new Barchart(
	    {
	        canvas:myCanvas,
	        padding:10,
	        gridScale:2,
	        maxValue: 12,
	        gridColor:"#C0BAAF",
	        data:scores,
	        colors:["#618985","#BCB6FF","#f2e3bc","#c19875", "#9BC53D","#764248","#716A5C","#bf0603", "#5DB7DE", "#fffd82", "#F7B1AB", "#e84855", "#CC5A71", "#CB904D"]
	    }
		);
		myBarchart.draw();
	}
	}, function (err) {
		alert("error" + err);
	})
}

function drawEmpty() {
	var scores = {
		"maneesh": 0,
		"shruti": 0,
		"deppali": 0,
		"shrey": 0,
		"sharon": 0,
		"neville": 0,
		"ajay": 0,
		"shilpa": 0,
		"puja": 0,
		"mayank": 0,
		"vaishali": 0,
		"mayur": 0,
		"rajni": 0,
		"deepesh": 0
	}
	ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
	var myBarchart = new Barchart(
    {
        canvas:myCanvas,
        padding:10,
        gridScale:2,
        maxValue: 12,
        gridColor:"#C0BAAF",
        data:scores,
        colors:["#618985","#BCB6FF","#f2e3bc","#c19875", "#9BC53D","#764248","#716A5C","#bf0603", "#5DB7DE", "#fffd82", "#F7B1AB", "#e84855", "#CC5A71", "#CB904D"]
    }
	);
	myBarchart.draw();
}

function drawGraph() {
	ref = database.ref("displayGraph");
	ref.on('value', function (snap) {
		displayGraph = snap.val()
		console.log(displayGraph)
		if (displayGraph == true) {
			draw()
		} else {
			console.log("ran draw drawEmpty")
			drawEmpty()
		}
	}, function (e) {
		alert("Error" + e);
	})

	
}

drawGraph();


