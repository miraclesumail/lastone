(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||   
                                      window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());

var marquee = function (canvas, data, config) {
	if (!canvas || !data) {
		return;
	}
	if (typeof canvas == 'string') {
		canvas = document.querySelector(canvas);
		marquee(canvas, data, config);
		return;
	}
    var context = canvas.getContext('2d');
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;
    var fontSize = config.fontSize;
	context.fillStyle = config.fontColor;
    context.font = fontSize + ' Microsoft YaHei';
	context.textBaseline = 'middle';
    var x = canvas.width + 10;
    var y = canvas.height / 2;
    if (config.offsetY) y = y + config.offsetY;
    var speed = config.speed;
    var dataWidth = parseInt(context.measureText(data).width);
	var draw = function () {
        x -= speed;
        if (x < -dataWidth - 100) {
            x = canvas.width + 10;
            y = canvas.height / 2;
            if (config.offsetY) y = y + config.offsetY;
        }
        context.fillText(data, x, y);
	};

	var render = function () {
		context.clearRect(0, 0, canvas.width, canvas.height);
		draw();
		requestAnimationFrame(render);
	};
	render();
};


export default marquee;