var application = (function(app, $) {

	context = null;
	depth = 5;

	app.init = function(drawboard) {
		this.context = drawboard;
		this.depth = 5;
		this.context.setStrokeWitdh(1);
		this.draw(0, 0, 800, 0);
  };

	app.draw = function(x, y, w, depth) {
		if (depth < this.depth) {
			this.context.drawRect(x, y, w, w);
			var q = this.random(1, 5);
			switch (q) {
				case 1:
					break;
				case 2:
					x += w / 2;
					break;
				case 3:
					y += w / 2;
				case 4:
					x += w / 2;
					y += w / 2;
				break;
				default:
			}
			app.draw(x, y, w / 2, depth + 1);
		}
		return;
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

drawboard.init()

application.init(drawboard);
