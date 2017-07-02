var application = (function(app, $) {

	WIDTH = 800;
	BIAS = 0.5

	app.init = function(drawboard) {
		this.context = drawboard;
		this.depth = 5;
		this.rects = [];
		this.context.setStrokeWitdh(1);
		this.context.drawRect(0, 0, WIDTH, WIDTH);
		this.rects.push(new Rect(400 + BIAS, 400 + BIAS, WIDTH));
		this.fillRandomizedRects(0);
		this.draw();
		this.draw(0);
	};

	app.fillRandomizedRects = function(depth) {
		var rects = [];

		if (depth < this.depth) {
				this.rects.forEach(function(rect) {
					var x, y, w;
					w = rect.prop.w / 4;
					var q = this.random(1, 5);
							switch (q) {
								case 1:
									x = rect.prop.x - w;
									y = rect.prop.y - w;
								break;
								case 2:
									x = rect.prop.x + w;
									y = rect.prop.y - w;
								break;
								case 3:
									x = rect.prop.x - w;
									y = rect.prop.y + w;
								break;
								case 4:
									x = rect.prop.x + w;
									y = rect.prop.y + w;
								break;
								default:
							}

							if(Math.floor(x) === x) {
								rects.push(new Rect(x + BIAS, y + BIAS, w * 2));
							} else {
								rects.push(new Rect(x, y, w * 2));
							}
							this.rects = this.rects.concat(rects);
				}
				.bind(this)
			);
			app.fillRandomizedRects(depth + 1);
		}
	};

	app.draw = function() {
				this.rects.forEach(function(rect) {
						this.drawRect(rect);
				}
				.bind(this)
			);
	};

	app.drawRect = function(rect) {
		var x = rect.prop.x;
		var y = rect.prop.y;
		var w = rect.prop.w;
		var width = (w / 2);
		this.context.beginPath();
		this.context.moveTo(x - width, y);
		this.context.lineTo(x + width, y);
		this.context.moveTo(x, y - width);
		this.context.lineTo(x, y + width);
		this.context.stroke();
	};

	app.chance = function(perc) {
		return Math.random() > perc;
	};

	app.random = function getRandomInt(min, max) {
	  min = Math.ceil(min);
	  max = Math.floor(max);
	  return Math.floor(Math.random() * (max - min)) + min;
	}

  return app;
}(application || {}, jQuery));

var drawboard = (function(canvas) {

	canvas.context = null;

	canvas.init = function() {
		var canvas = document.getElementById('drawboard');
		var ctx = canvas.getContext('2d');
		this.context = ctx;
  };

	canvas.drawRect = function(x, y, w, h) {
    canvas.context.strokeRect(x, y, w, h);
	};

	canvas.setFillColor = function(r, g, b, a) {
		canvas.context.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
	};

	canvas.setStrokeColor = function(r, g, b, a) {
		canvas.context.strokeStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
	};

	canvas.setFont = function(options) {
		canvas.context.font = options;
	};

	canvas.drawText = function(str, x, y) {
		canvas.context.fillText(str, x, y);
	}

	canvas.setStrokeWitdh = function (w) {
		canvas.context.lineWidth = w;
	};

	canvas.beginPath = function() {
		canvas.context.beginPath();
	};

	canvas.moveTo = function(x, y) {
		canvas.context.moveTo(x, y);
	};

	canvas.lineTo = function(x, y) {
		canvas.context.lineTo(x, y);
	};

	canvas.stroke = function() {
		canvas.context.stroke();
	}

  return canvas;
}(drawboard || {}));

drawboard.init();
application.init(drawboard);
