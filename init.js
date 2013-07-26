(function() {
	var lastTime = 0,
		vendors = ['ms', 'moz', 'webkit', 'o'];

	for(var x = 0; x < vendors.length && !window.requestAnimationFrame;++x){
		window.requestAnimationFrame = window[vendors[x] + 'requestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x] + 'canvelAnimationFrame'];
	}

	if(!window.requestAnimationFrame){
		window.requestAnimationFrame = function(callback, el){
			var currTime = new Date().getTime(),
				callbackInterval = Math.max(0, 16 - (currTime - lastTime)),
				id = window.setTimeout(function(){
					callback(currTime + callbackInterval);
				}, callbackInterval);
				lastTime = currTime + callbackInterval;
				return id;
		};

		if(!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id){
			clearTimeout(id);
		};
	};
}());

var easyParallax = {
	init: function(){
		var bodyHeight = document.body.clientHeight,
			imgHeight = bodyHeight / 6,
			images = document.getElementsByClassName('parallax'),
			imageData = [],
			imagesInner = document.querySelectorAll('.parallax > .parallax-inner'),
			imagesOffset = [],
			imageLength = images.length,
			scrollTop = 0;

		for(var y = 0;y < imageLength;y++){
			imageData.push(images[y].dataset);
			imagesOffset.push(images[y].offsetTop);
		}

		for(var i = 0;i < imageLength;i++){
			console.log(imageData[i].height)
			if(imageData[i].height) images[i].style.height = imageData[i].height + 'px';
		}

		window.onscroll = function() {
			scrollTop = window.scrollY;
		};
		function parallax(){
			for(var x = 0;x < imageLength;x++){
				if(scrollTop > imagesOffset[x] - bodyHeight){
					var bpos = (scrollTop) / 2 + parseInt(imageData[x].speed);
                	imagesInner[x].style.webkitTransform = 'translate3d(0,' + bpos + 'px,0)';
                	imagesInner[x].style.transform = 'translate3d(0,' + bpos + 'px,0)';
				}
			}
			requestAnimationFrame(parallax);
		}
		parallax();
	}
}

window.onload = function(){
	easyParallax.init();
};