// oDiv.onclick = function(){
// 	timeMove(this,{
// 		width:200,
// 		height:300,
// 		left:200,
// 		top:300,
// 		opacity:1
// 	},4000,'backOut')
// }
// duration 总时间
// fx对应的样式 是函数Tween里面的
function timeMove(obj,json,duration,fx,callback){
	//attr,target
	//var timer = null;
	var fx = fx?fx:'linear'; //判断一下fx有没有 不传就给默认的匀速
	var j = {};
	for( var attr in json){
		j[attr] = {}
		//判断传进来的attr是不是透明度
		if (attr == 'opacity') {
			j[attr].begin = parseFloat(getStyle(obj,attr)); //起始位置  透明度的数值是小数的
		}else{
			j[attr].begin = parseInt(getStyle(obj,attr)); //起始位置 之前的是带单位的数值
		}
		j[attr].count = json[attr] - j[attr].begin; //目标点的位置 - 起始的位置
	}
	
	
	var d = duration; //总时间
	var oldDate = new Date().getTime();

	obj.timer = setInterval(function(){
		//获取运动后的时间 用现在的时间-以前的时间 就是时间差
		var newDate = new Date().getTime();
		var t = newDate - oldDate;
		//如果运动的时间大于了总时间  就让运动的时间等于总时间
		if (t > d) {
			t = duration;
		};

		for( var attr in json){
			// var v = j[attr].begin + j[attr].count*(t/d);
			// t b c d
			var v = Tween[fx](t,j[attr].begin,j[attr].count,d)
			if (attr == 'opacity') {
				obj.style.opacity = v;
				obj.style.filter = 'alpha(opacity='+ (v*100) +')';
				//透明度没有单位
			}else{
				obj.style[attr] = v+'px';
			}
		}
		
		//当运动结束后 才执行回调函数
		if (t == d) {
			clearInterval(obj.timer);
			callback && callback.call(obj); //改变this指向
		};
	},16)
}
function getStyle(obj, attr) {
    return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,0)[attr];
}
/*
* t : time 已过时间
* b : begin 起始值
* c : count 总的运动值
* d : duration 持续时间
*
* 曲线方程
*
* http://www.cnblogs.com/bluedream2009/archive/2010/06/19/1760909.html
* */

//Tween.linear();

var Tween = {
	linear: function (t, b, c, d){  //匀速
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){  //加速曲线
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){  //减速曲线
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){  //加速减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){  //加加速曲线
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){  //减减速曲线
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){    //*正弦增强曲线（弹动渐出）
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 3.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){//*
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
}