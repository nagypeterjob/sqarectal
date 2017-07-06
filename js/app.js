var application = (function(app, $) {

	WIDTH = 800;
	BIAS = 0.5
	NUM_NODES = 4;

	app.init = function(drawboard, width, bias) {
		this.context = drawboard;
		WIDTH = width;
		BIAS = bias;
		this.depth = 5;
		this.randomness = 6;
		this.context.setStrokeColorHex('black');
		this.context.setStrokeWitdh(1);
		this.context.setStrokeColor(90, 90, 90, 1);
		app.redraw();
	};

	app.redraw = function() {
		this.context.clearRect(0, 0, WIDTH, WIDTH);
		if (WIDTH === 600)
			this.context.drawRect(BIAS, BIAS, WIDTH, WIDTH);
		else
			this.context.drawRect(0, 0, WIDTH, WIDTH);

		this.quadTree = new Rect(WIDTH / 2, WIDTH / 2, WIDTH);
		this.createQuadtree(app.quadTree, 0);
	};

	app.createQuadtree = function(rect, depth) {
			rect.draw(this.context);
			if (depth < this.depth) {
				if (!rect.prop.children.length) {
					var x = 0;
					var y = 0;
					for (var i = 0; i < NUM_NODES; i++) {
						var w = rect.prop.w / 2;
						switch (i) {
							case 0:
								x = rect.prop.x - w / 2 ;
								y = rect.prop.y - w / 2;
							break;
							case 1:
								x = rect.prop.x + w / 2;
								y = rect.prop.y - w / 2;
							break;
							case 2:
								x = rect.prop.x - w / 2;
								y = rect.prop.y + w / 2;
							break;
							case 3:
								x = rect.prop.x + w / 2;
								y = rect.prop.y + w / 2;
							break;
						}

						if (WIDTH === 600) {
							if (depth === 1) {
								x += BIAS;
								y += BIAS;
							} else if (depth > 3) {
								x -= BIAS;
								y -= BIAS;
							}
						} else {
							if (depth === 4) {
								x += BIAS;
								y += BIAS;
							} else if (depth === 5) {
								x -= BIAS;
								y -= BIAS;
							}
						}

						var child = new Rect(x, y, w);

						rect.prop.children.push(child);
						var rand = this.random(1,i+this.random(0,this.randomness-i));
						if(rand > 1)
						 app.createQuadtree(child, depth + 1);
					}
				}
			}
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

	app.setDept = function(depth) {
		this.depth = depth;
	};

	app.setRandomness = function(randomness) {
		this.randomness = randomness;
	}

	app.chance = function(perc) {
		return Math.random() > perc;
	};

	app.setStrokeColorHex = function (hex) {
		this.context.setStrokeColorHex(hex);
	};

	app.random = function getRandomInt(min, max) {
	  min = Math.ceil(min);
	  max = Math.floor(max);
	  return Math.floor(Math.random() * (max - min)) + min;
	};

	app.downloadImage = function(link) {
		link.href = this.context.toDataUrl();
		link.download = 'Sqarectal.png';
	};

  return app;
}(application || {}, jQuery));

var drawboard = (function(canvas) {

	canvas.context = null;
	canvas.canvasBoard = null;

	canvas.init = function() {
		var canvas = document.getElementById('drawboard');
		var ctx = canvas.getContext('2d');
		this.context = ctx;
		this.canvasBoard = canvas;
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

	canvas.setStrokeColorHex = function(hex) {
		canvas.context.strokeStyle = hex;
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
	};

	canvas.clearRect = function (x, y, w, h) {
		canvas.context.clearRect(x, y, w, h);
	};

	canvas.toDataUrl = function() {
		return canvas.canvasBoard.toDataURL();
	};

  return canvas;
}(drawboard || {}));

var Rect = (function(ox, oy, w) {


  var params = {
    x: ox,
    y: oy,
    w: w,
		children: []
	};

  return {
    prop: params,
		draw: function(context) {
			var x = params.x + BIAS;
			var y = params.y + BIAS;
			var w = params.w;
			var width = Math.floor(w / 2);
			context.beginPath();
			context.moveTo(x - width, y);
			context.lineTo(x + width, y);
			context.moveTo(x, y - width);
			context.lineTo(x, y + width);
			context.stroke();
		}
  };
});


drawboard.init();

if ($(window).height() < 800) {
	$('canvas')
		.width(600)
		.height(600);
	application.init(drawboard, 600, 0.25);
} else {
	application.init(drawboard, 800, 0.5);
}

$('.js-redraw-btn').on('click', function() {
	application.redraw();
});

$('.js-randomness-range').on('change', function(e) {
	 var val = $(e.target).val();
	 $(this).parent().find('.value').html(val-4);
	 application.setRandomness(val);
});

$('.js-depth-range').on('change', function(e) {
	 var val = $(e.target).val();
	 $(this).parent().find('.value').html(val);
	 application.setDept(val);
});

$('.tile').on('click', function(e) {
		var elem = $(e.target);
		var color = elem.data('color');
		application.setStrokeColorHex(color);
});

document.getElementById('download').addEventListener('click', function() {
	application.downloadImage(this);
}, this);

$('#about').on('mouseover', function() {
	$('.about-modal').toggleClass('hidden');
	$('.contact-modal').addClass('hidden');
});

$('#about').on('mouseleave', function() {
	$('.about-modal').toggleClass('hidden');
});

$('#contact').on('mouseover', function() {
	$('.contact-modal').toggleClass('hidden');
	$('.about-modal').addClass('hidden');
});

$('.contact-modal h1').on('click', function() {
	$('.contact-modal').toggleClass('hidden');
});
