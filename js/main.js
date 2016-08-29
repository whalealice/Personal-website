$(function(){
	// 动态加载sub的高度
	var oH = $(window).innerHeight()
	var oW = $(window).innerWidth()
	$('.sub').css('height',oH)
});

//键盘点击的跳转
var coUp = $('#keyboard .up')
var coDown = $('#keyboard .down')
var coLeft = $('#keyboard .left')
var coRight = $('#keyboard .right')
$(document).keydown(function(event){
	if(event.keyCode==40){
		coDown.addClass('down1');
		setTimeout(function(){coDown.removeClass('down1')},300)
	}else if (event.keyCode==38) {
		coUp.addClass('up1');
		setTimeout(function(){coUp.removeClass('up1')},300)
	};
	return false;
})
//刚一刷新的时候 键盘先闪一下
function flash(){
	coUp.addClass('up1');
	coDown.addClass('down1');
	coLeft.addClass('left1');
	coRight.addClass('right1');
	setTimeout(function(){
		coUp.removeClass('up1');
		coDown.removeClass('down1');
		coLeft.removeClass('left1');
		coRight.removeClass('right1');
	},400);	
}
setTimeout(function(){flash()},1200)


//第二屏的元素获取
var desH2 = $('#design h2');
var desLine = $('#design .line');
var desShow = $('#design .show'); //图片和文字一起的
var desScroll = $('#design .scrollTools');
var desGrey = $('#design .grey');
//第三屏的元素获取
var photo = $('#portfolio .photo')
var photoText = $('#portfolio .photoText')
var pText = $('#portfolio .text')
var black = $('#portfolio .black')
//第四屏的元素获取
var abH2 = $('#about h2');
var abLine = $('#about .line');
var abMark = $('#about .mark');
var abTitle = $('#about .title');
var abInfo = $('#about .info');

//第五屏的元素获取
var awH2 = $('#awards h2');
var awLine = $('#awards .line');
var awMark = $('#awards .mark');
var awPoint = $('#awards .point');
var awMent = $('#awards .achievement')
var awFront = $('#awards .front')
var awBack = $('#awards .back')
//第六屏的元素获取
var caseH2 = $('#case h2');
var caseLine = $('#case .line');
var caseImg = $('#case .resumeBox');
var caseText = $('#case .introduction');
//第七屏的元素获取
var conH2 = $('#contact h2');
var conLine = $('#contact .line');
var conTxt = $('#contact .conList');
var conCube = $('#contact .cube');


//第二屏的自定义滚动条
var desBar = $('#design .design-bar')[0];
var oBox = $('#design .content')[0];
var desTool =  $('#design .scrollTools')[0]; //滚动的条
var desDragger = $('#design .dragger')[0];  //滚动的小块
var desCont = $('#design .container')[0];  //里面的内容
var desBox = $('#design .scroll-box')[0];  //外面的盒子
//滚动条的拖拽
desDragger.addEventListener('mousedown',function(ev){
	var ev = ev || event;
	var oLeft = ev.clientX - desDragger.offsetLeft;// 鼠标点击的位置减去自身到屏幕的距离

	document.addEventListener('mousemove',fn,false);
	document.addEventListener('mouseup',fn1,false);
	function fn(ev){
		var left = ev.clientX - oLeft;
		if (left < 0) {
			left = 0;
		}else if ( left > desTool.clientWidth - desDragger.offsetWidth) {
			 left = desTool.clientWidth - desDragger.offsetWidth;
		};
		desDragger.style.left = left + 'px';
		var scale = left/(desTool.clientWidth - desDragger.offsetWidth);
		desCont.style.left = -scale*(desCont.offsetWidth-desBox.offsetWidth)+'px';
	}
	function fn1(ev){
		document.removeEventListener('mousemove',fn);
		document.removeEventListener('mouseup',fn1);
	}
	return false;
},false)
//滚动鼠标滚轮
addWheel(desBar,function(down){
	 scroll(down);
})

function scroll( down ){
	var l = desDragger.offsetLeft;  //滚动条到父级的宽度
	var oTool = desTool.clientWidth; //导航条的宽度
	var oCont = desCont.offsetWidth; //里面的内容的宽度
	var oBox = desBox.offsetWidth; //外面的盒子的宽度
	var oDragger = desDragger.offsetWidth;
	var scale = l/(oTool-oDragger);
	if (down) {
		l-=20;
		if (l<0) {
			l =0;
		};
	}else{
		l+=20;
		if ( l > oTool-oDragger ) {
			l = oTool-oDragger;
		};
	}
	desDragger.style.left = l+'px';
	desCont.style.left = -scale*(oCont-oBox)+'px';
}
function addWheel(obj,fn){
	if(window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
		addEvent(obj,'DOMMouseScroll',evFn);
	}else{
		addEvent(obj,'mousewheel',evFn);
	}
	function evFn(ev){
		var ev = ev||event;
		var down = true;
		if(ev.wheelDelta){
			down = ev.wheelDelta > 0?true:false;
		}else{
			down = ev.detail < 0? true : false;
		}
		fn && fn(down);
		if(ev.preventDefault){
			ev.preventDefault();
		}
		if(window.event){
	        window.event.cancelBubble=true;//阻止冒泡
	    }else if(ev.preventDefault){
	    	console.log(1);
	        ev.stopPropagation();//阻止冒泡
	    }
		return false;
	}
}
function addEvent(obj,evType,evFn){
	if(obj.addEventListener){
		obj.addEventListener(evType,evFn,false);
	}else{
		obj.attachEvent('on'+evType,evFn);
	}
}
//点击滚动条上和下的时候
var timer = null;
var onOff = true;
desTool.onmousedown = function(ev){
	var ev = ev || event;
	timer = setInterval(function(){
		//判断如果onOff是true的时候 就是点击的滚动条的上方 
		//和滚动鼠标滚轮是往上还是往下的判断是一样的
		if (ev.clientX < desDragger.getBoundingClientRect().left) {
			var onOff = true;
			scroll(onOff);
		}else if (ev.clientX > desDragger.getBoundingClientRect().left+desDragger.offsetWidth) {
			var onOff = false;
			scroll(onOff);
		}else{
			clearInterval(timer)
		}
	},40)
}
desTool.onmouseup = function(){
	clearInterval(timer)
}
	


$('#fullpage').fullpage({
    'verticalCentered': false,
    'css3': true,
    anchors: ['page1', 'page2', 'page3', 'page4','page5','page6','page7'],
    navigation: true,
    navigationColor : '#000',
	navigationTooltips: ['Home','My projects', 'About me', 'My growth', 'My life', 'My skill', 'Contact me'],
    'afterLoad' : function(anchorLink,index){
		switch(index){
			case 1:			
				photo.animate({"top":"10"},800,function(){
					photoText.animate({"opacity":"1"},200);
				});
				black.animate({"opacity":"1"},600);
				pText.animate({"opacity":"1"},800);
				break;
			case 2:
				setTimeout(function(){
					desH2.animate({"opacity": "1"}, 800,function(){
						desLine.animate({"width": "120"}, 600);
					});	
				},200);
				setTimeout(function(ev){
					show(0);
					desScroll.animate({"opacity": "1"}, 800);
				},600)
				function show(n){
					desShow.eq(n).animate({"top":"0", "opacity": "1"}, 400,function(){
						if (desShow.eq(n+1)) show(n+1)
					});
				}
				//第二屏黑色的小块的鼠标移入
				desGrey.mouseenter(function(){
					$(this).stop().animate({"top": "-6"}, 200);
				}).mouseleave(function() {
					$(this).stop().animate({"top": "0"}, 200);
				});
				break;
			case 3:
				abH2.delay(200).animate({"opacity": "1"}, 500,function(){
					abLine.animate({"width": "120"}, 600);
				});
				//轨迹的显示
				abMark.eq(0).delay(600).stop().animate({"width": "0"}, 800,function(){
					abMark.eq(1).animate({"top":"150"},400,function(){
						abMark.eq(1).css("display","none");
						abMark.eq(2).animate({"width":"0"},600,function(){
							abMark.eq(3).animate({"top":"291"},400,function(){
								abMark.eq(4).animate({"width":"0"},400,function(){
									abMark.eq(5).animate({"top":"350"},300,function(){
										abMark.eq(5).css("display","none");
										abMark.eq(6).animate({"top":"500"},100)
									})
								})
							})
						})
					})
				})
				//轨迹上的小圆点的显示
				setTimeout(function(){
					var n = 0
					var timer = setInterval(function(){
						abTitle.eq(n).css('transform', 'scale(1)');
						abInfo.eq(n).css('transform', 'scale(1)');
						n++;
						if (n>9) {
							clearInterval(timer);
						};
					},250)
				},1000)
				break;
			case 4:
				//标题的显示
				awH2.delay(1000).animate({"opacity": "1"}, 500,function(){
					awLine.animate({"width": "120"}, 600);
				});
				//轨迹的显示
				awMark.eq(0).animate({"height": "0"}, 800,function(){
					awMark.eq(1).animate({"top":"110"},200,function(){
						awMark.eq(2).animate({"width":"0"},600)
					})
				})
				//小圆点的显示
				setTimeout(function(){
					var l = 0
					var timer = setInterval(function(){
						awPoint.eq(l).css('transform', 'scale(1)');
						l++;
						if (l>8) {
							clearInterval(timer);
						};
					},250)
				},1000)
				//第五屏小方块里面的数字的变化
				var awNum = [ 90,90,80,80,60 ]
				setTimeout(function(){
					awShow(0);
				},2800)
				function awShow(n){
					awMent.eq(n).animate({"left": "0", "opacity": "1"}, 400,function(){
						if (awMent.eq(n+1)) awShow(n+1);
						//里面的数字的变化
						awFront[n].m = 0 ;
						clearInterval(awFront[n].timer)
						awFront[n].timer = setInterval(function(){
							awFront[n].m++;
							//判断如果到了指定的数字就让他停止
							if ( awFront[n].m >= awNum[n] ) {
								awFront[n].m = awNum[n];
								clearInterval(awFront[n].timer)
							};
							awFront.eq(n).text(awFront[n].m+'%')
						},10)
					});
				}
				break;
			case 5:
				setTimeout(function(){
					caseImg.animate({"top": "0", "opacity": "1"}, 800,function(){
						caseH2.animate({"opacity": "1"}, 800,function(){
							caseLine.animate({"width": "120"}, 600);
						});	
					});
					caseText.animate({"top": "10", "opacity": "1"}, 800);
				},300)
				break;
			case 6:
				setTimeout(function(){
					conH2.animate({"opacity": "1"}, 800,function(){
						conLine.animate({"width": "120"}, 600);
					});
				},300)
				setTimeout(function(){moveTop(0);},400)
				function moveTop(n){
					conCube.eq(n).animate({"top": "0","opacity": "1"},400, function(){
						if (conCube.eq(n+1)) {
							moveTop(n+1);
						};
					});
				}
				setTimeout(function(){
					conCube.mouseenter(function(){
						$(this).stop().animate({"top": "-15"}, 200)
					}).mouseleave(function() {
						$(this).stop().animate({"top": "0"}, 200)
					});
				},2000)
				break;
			default:
				break;
		}
    },
    'onLeave' : function(anchorLink,index){
    	switch(index){
			case 1:
				photo.animate({"top":"200"},0);
				photoText.css("opacity","0");
				black.css("opacity","0");
				pText.css("opacity","0");
				break;	
			case 2:
				desH2.css("opacity","0");
				desLine.css("width","0");
				desScroll.css("opacity","0");
				desShow.animate({"top":"-150", "opacity": "0"}, 0)
				break;
			case 3:
				abH2.css("opacity","0");
				abLine.css("width","0");
				abMark.eq(0).css('width', '900');
				abMark.eq(1).animate({'top': '0'}, 0).css('display', 'block');
				abMark.eq(2).css('width', '680');
				abMark.eq(3).animate({'top': '138'}, 0).css('display', 'block');
				abMark.eq(4).css('width', '680');
				abMark.eq(5).animate({'top': '284'}, 0).css('display', 'block');
				abMark.eq(6).animate({'top': '350'}, 0).css('display', 'block');
				abInfo.css('transform', 'scale(0)');		
				abTitle.css('transform', 'scale(0)');		
				break;
			case 4:
				awH2.css('opacity','0');
				awLine.css('width','0');
				awMark.eq(0).css('height','600');
				awMark.eq(1).animate({"top":"40"},0);
				awMark.eq(2).css('width','900');
				awPoint.css('transform', 'scale(0)');
				//第五屏小方块里面的数字的变化
				awMent.animate({"left": "80", "opacity": "0"}, 0);
				awFront.text('0%')
				break;
			case 5:
				caseH2.css('opacity','0');
				caseLine.css('width','0');
				caseImg.animate({"top": "-500", "opacity": "0"}, 0);	
				caseText.animate({"top": "200", "opacity": "0"}, 0);
				break;
			case 6:
				conH2.css('opacity','0');
				conLine.css('width','0');
				conCube.animate({"top": "140","opacity": "0"},0)
				
				break;
			default:
				break;
		}
    }
})
