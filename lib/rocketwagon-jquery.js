;(function ($) {

	//CLASSES
	/**
	 * The star system we're going to create
	 * Stars coordinate system is 0 through 1000, and then mapped onto the coordinate system of our canvas
	 * @param  {number} x
	 * @param  {number} y
	 * @param  {number} radius
	 * @param  {string} hexadecimal color string beginning with #
	 */
	var Star = function (x, y, radius, color) {
		function getRandomId() {
			var id = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

			for (var i = 0; i < 5; i++)
				id += possible.charAt(Math.floor(Math.random() * possible.length));

			return id;
		};

		this.id = getRandomId();
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
	};

	Star.prototype.mapXYToCanvasCoordinates = function (canvasWidth, canvasHeight) {
		var canvasX = Math.round((this.x / 1000) * canvasWidth);
		var canvasY = Math.round((this.y / 1000) * canvasHeight);
		return {
			x: canvasX,
			y: canvasY
		}
	};

	Star.prototype.getId = function () {
		return this.id;
	}

	Star.prototype.getX = function () {
		return this.x;
	}

	Star.prototype.setX = function (x) {
		this.x = x;
	}

	Star.prototype.getY = function () {
		return this.y;
	}

	Star.prototype.setY = function (y) {
		this.y = y;
	}

	var StarFactory = {
		getRandomStar: function () {
			var x = Math.floor(Math.random() * 1001);
			var y = Math.floor(Math.random() * 1001);
			var radius = this._getWeightedRandomRadius();
			var color = this._getWeightedRandomColor();
			return new Star(x, y, radius, color);
		},

		_getWeightedRandomRadius: function () {
			var list = [0.5, 0.8, 1];
			var weight = [0.6, 0.3, 0.1];
			return this._getWeightedRandom(list, weight);
		},

		_getWeightedRandomColor: function () {
			var list = ['#FFBD6F', '#FFDDB4', '#FFF4E8', '#FBF8FF', '#CAD8FF', '#AABFFF', '#9BB0FF'];
			var weight = [0.05, 0.05, 0.05, 0.7, 0.05, 0.05, 0.05];
			return this._getWeightedRandom(list, weight);
		},
		_getWeightedRandom: function (list, weight) {

			var rand = function (min, max) {
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
		}
	};

	var Starfield = {};

	$.fn.rocketwagon = function (numStars) {
		$this = $(this);

		var width = $this.width();
		var height = $this.height();

		var deltaX, deltaY;

		var canvas = $('<canvas id="rocketwagon-canvas">')
			.css('position', 'absolute')
			.css('left', '0')
			.css('top', '0')
			.attr('width', $this.width())
			.attr('height', $this.height())
			.prependTo($this);

		for (var i = 0; i < numStars; i++) {
			var star = StarFactory.getRandomStar();
			Starfield[star.getId()] = star;
		}

		// ANIMATION HANDLER
		var recalcMovement = function () {
			if (deltaX === undefined) {
				return;
			}
			$.each(Starfield, function (key, star) {
				var newX = star.getX() - deltaX;
				var newY = star.getY() - deltaY;

				if (newX < 0) { newX += 1000 }
				if (newY < 0) { newY += 1000 }
				if (newX > 1000) {newX -= 1000}
				if (newY > 1000) {newY -= 1000}

				star.setX(newX);
				star.setY(newY);
			});
		};

		setInterval(recalcMovement, 1000/60);

		var draw = function () {
			//get raw DOM element
			var canvas = document.getElementById('rocketwagon-canvas');
			var width = canvas.width;
			var height = canvas.height;

			if (canvas.getContext) {
				var ctx = canvas.getContext('2d');

				// clear canvas
				ctx.clearRect(0, 0, width, height);
				ctx.fillStyle = "black";
				ctx.fillRect(0, 0, width, height);

				// iterate stars and draw them
				$.each(Starfield, function (id, star) {
					var coords = star.mapXYToCanvasCoordinates(width, height);

					ctx.beginPath();
					ctx.fillStyle = star.color;
					ctx.arc(coords.x, coords.y, star.radius, 0, 2 * Math.PI);
					ctx.fill();
				});
			}
		};

		// EVENT HANDLERS
		$(window).resize(function () {
			console.log('resize event fired.');
			width = $this.width();
			height = $this.height();

			canvas.attr('width', width)
				.attr('height', height);

			draw();
		});

		$this.mousemove(
			function (e) {
				var $this = $(this);

				var offset = $this.offset();

				var centerX = width / 2;
				var centerY = height / 2;

				var distanceX = ((e.pageX - offset.left) - centerX);
				var distanceY = ((e.pageY - offset.top) - centerY);

				deltaX = distanceX >> 7;
				deltaY = distanceY >> 7;

				if(deltaX === undefined){
					recalcMovement();
				}
			}
		);

		(function animloop(){
			requestAnimationFrame(animloop);
			if(deltaX !== undefined){
				draw();
			}
		})();

		draw();

		return this;
	};

}(jQuery));