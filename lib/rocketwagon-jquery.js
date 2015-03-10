/**
 * The star system we're going to create
 * Stars coordinate system is 0 through 1000, and then mapped onto the coordinate system of our canvas
 * @param  {number} x
 * @param  {number} y
 * @param  {number} radius
 */
var Star = function (x, y, radius) {
	this.x = x;
	this.y = y;
	this.radius = radius;
};

Star.prototype.mapXYToCanvasCoordinates = function (canvasWidth, canvasHeight) {
	var canvasX = Math.round((this.x / 1000) * canvasWidth);
	var canvasY = Math.round((this.y / 1000) * canvasHeight);
	return {
		x: canvasX,
		y: canvasY
	}
}

var StarFactory = {
	getRandomStar: function () {
		var x = Math.floor(Math.random() * 1001);
		var y = Math.floor(Math.random() * 1001);
		var radius = getWeightedRandom();
		return new Star(x, y, radius);
	}
};

var getWeightedRandom = function() {
	var list = [1, 2, 3];
	var weight = [0.6, 0.3, 0.1];

	var rand = function(min, max) {
		return Math.random() * (max - min) + min;
	};

	var total_weight = weight.reduce(function (prev, cur, i, arr) {
		return prev + cur;
	});

	var random_num = rand(0, total_weight);
	var weight_sum = 0;

	for (var i = 0; i < list.length; i++) {
		weight_sum += weight[i];
		weight_sum = +weight_sum.toFixed(2);

		if (random_num <= weight_sum) {
			return list[i];
		}
	}
};

(function ($) {
	var Starfield = [];

	function draw() {
		//get raw DOM element
		var canvas = document.getElementById('rocketwagon-canvas');
		var parent = canvas.parentNode;
		var parentWidth = parent.clientWidth;
		var parentHeight = parent.clientHeight;
		canvas.setAttribute("width", parentWidth);
		canvas.setAttribute("height", parentHeight);
		if (canvas.getContext) {
			var ctx = canvas.getContext('2d');

			// clear canvas
			ctx.clearRect(0, 0, parentWidth, parentHeight);
			ctx.fillStyle = "black";
			ctx.fillRect(0, 0, parentWidth, parentHeight);

			// iterate stars and draw them
			ctx.fillStyle = "white";
			ctx.strokeStyle = "white";
			$.each(Starfield, function(index, value){
				var coords = value.mapXYToCanvasCoordinates(parentWidth, parentHeight);
				ctx.beginPath();
				ctx.shadowColor = "white";
				ctx.shadowBlur = 1000;
				ctx.arc(coords.x, coords.y, value.radius, 0, 2 * Math.PI);
				ctx.fill();
			});
		}
	}

	$.fn.rocketwagon = function (numStars) {
		var canvas = $('<canvas id="rocketwagon-canvas">');
		for (var i = 0; i < numStars; i++) {
			Starfield.push(StarFactory.getRandomStar());
		}
		canvas.css('position', 'absolute').css('left', '0').css('top', '0').css('z-index', '-100');
		this.append(canvas);
		$(window).resize( function() {
			console.log("resize");
			draw();
		});
		draw();
		return this;
	};

}(jQuery));