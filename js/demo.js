
	
	

	$(function(){

		document.getElementById("textarea").value="留言"; 
		
		var $indexLeft = $('.aside');
		var $indexRight = $('.article');
		var $windowHeight = parseInt($(window).height());	    /*得到窗口的高度*/
		var $windowHeightHalf = $windowHeight/2;				/*得到窗口一半的高度*/
		
		var $nav = $('#nav ul li');	
		var speed = 600;        	//图片显示速速
			
		

		indexLogoOutIn.onOff = true;

		var resizeOnoff = true;

		


		indexLogoOutIn.refresh = function(){
			
			if($(window).width() < 1024){
				$('#index_logo').css('display','none');
				$('.article').css('display','none');
				$('#phoneSide').css('display','block');

			}else{
				if(IndexAnimate.onOff != false){
					$('#index_logo').css('display','block');
					$('.article').css('display','block');
					

				}

				$('#phoneSide').css('display','none');
				$(window).bind('scroll',leftrightAnimate.action);

				$(window).bind('scroll',navScroll);

				$(window).bind('scroll',indexLogoOutIn);

				$(window).bind('mousemove',indexLogo);

				$(window).bind('mouseleave',indexLogoLeave);

			}
		}

		zhezhaoAni.p =0;
		zhezhaoAni.t =0;

		/*手机端首页高度*/
		


		var mySwiper = new Swiper('.swiper-container', {
						direction : 'vertical',     /*垂直切换*/
						speed:speed,
						simulateTouch : false,
						effect : 'fade',
						onSlideChangeStart:zhezhaoAni,
					});


		

		function IndexAnimate(){};

		IndexAnimate.onOff = true;

		IndexAnimate.prototype.start = function(){
				/*开始左边动画*/	
				$indexLeft.addClass('startLeft');

				/*监听左边动画结束*/	
				$indexLeft.bind('webkitAnimationEnd',function(){
					$(this).css('width','30%')
					.removeClass('startLeft')
					.unbind('webkitAnimationEnd');
				});

				$indexLeft.bind('animationend',function(){
					$(this).css('width','30%')
					.removeClass('startLeft')
					.unbind('animationend');
				});

				/*开始右边动画*/
				$indexRight.addClass('startRight');

				/*监听右边动画结束*/	
				$indexRight.bind('webkitAnimationEnd',function(){
					$(this).css('width','70%')
					.removeClass('startRight')
					.unbind('webkitAnimationEnd');
				});

				$indexRight.bind('animationend',function(){
					$(this).css('width','70%')
					.removeClass('startRight')
					.unbind('animationend');
				});
		}

		IndexAnimate.prototype.end = function(){
				/*开始左边动画*/	
				$indexLeft.addClass('endLeft');

				/*监听左边动画结束*/	
				$indexLeft.bind('webkitAnimationEnd',function(){
					$(this).css('width','50%')
					.removeClass('endLeft');
				});

				$indexLeft.bind('animationend',function(){
					$(this).css('width','50%')
					.removeClass('endLeft');
				});

				/*开始右边动画*/
				$indexRight.addClass('endRight');


				/*监听右边动画结束*/	
				$indexRight.bind('webkitAnimationEnd',function(){
					$(this).css('width','50%')
					.removeClass('endRight');
				});

				$indexRight.bind('animationend',function(){
					$(this).css('width','50%')
					.removeClass('endRight');
				});
		}

		IndexAnimate.prototype.action = function(){

			var $scrollTop = $(window).scrollTop(); 
			
			if(IndexAnimate.onOff == true){
				if($scrollTop > $windowHeightHalf){
					IndexAnimate.prototype.start();
					IndexAnimate.onOff = false;
				}
			}else if(IndexAnimate.onOff == false){
				if($scrollTop < $windowHeightHalf){
					IndexAnimate.prototype.end();
					IndexAnimate.onOff = true;
				}
			}

		}
		

		var leftrightAnimate = new IndexAnimate();

		leftrightAnimate.action();

		navScroll();

		indexLogoOutIn();

		indexLogoOutIn.refresh();

		





		


		$(window).bind('resize',function(){
			
			if($(this).width() < 1024){
				$(window).unbind('mousemove',indexLogo);
				$(window).unbind('mouseleave',indexLogoLeave);
				$(window).unbind('scroll');

				//$phoneIndex.css('height',$(window).height()/2);
				resizeOnoff = false;

			}else{
				if(resizeOnoff !=true){
					leftrightAnimate.action();
					mySwiper.slideTo(0,speed,false);
					$(window).scrollTop(0);

					
					$nav.css('fontWeight','normal');


					$('.article').css('display','block');
					$(window).unbind('mousemove',indexLogo);
					$(window).unbind('mouseleave',indexLogoLeave);
					$(window).unbind('scroll');
					resizeOnoff = true;
				}
			}

			indexLogoOutIn.refresh();
		})




		





		
		$nav.hover(function(){
			$(this).children('div').addClass('navBorderIn').removeClass('navBorderOut');
			},function(){
			$(this).children('div').addClass('navBorderOut').removeClass('navBorderIn');
			});

	

		
		 $nav.click(function(){

		 	var $scrollToTopIndex = $(this).index()+1;
		     
		     var $scrollToTopHeight = Math.abs($('.scrollToTop').height());

		     if($('html').scrollTop == $scrollToTopHeight * $scrollToTopIndex || $('html body').scrollTop == $scrollToTopHeight * $scrollToTopIndex){
		     	return false;
		     }else{
		     	$('html').stop().animate({scrollTop : $scrollToTopHeight * $scrollToTopIndex },400);
		     	$('html body').stop().animate({scrollTop : $scrollToTopHeight * $scrollToTopIndex },400);
		     }
		 })

		



		 /*nav滚动监听*/
		
		 function navScroll(){

		 	
		 	var $documentScrollTop = $(window).scrollTop();
		 	
		 	var $scrollToTop = $('#bc .scrollToTop');

		 	var $emptyOffset = Math.abs($('.empty').offset().top-$documentScrollTop);

		 	if($emptyOffset > 0 && $emptyOffset < $windowHeightHalf){
		 		$nav.css('fontWeight','normal');
		 		mySwiper.slideTo(($scrollToTop.index(0)),speed,false);
		 	}

		 	$scrollToTop.each(function(){

		 		var $thisOffset = Math.abs(($(this).offset().top)-$documentScrollTop);
		 		if($thisOffset < $windowHeightHalf && $thisOffset >= 0){
		 			$nav.eq($(this).index()).css('fontWeight','bold')
					.siblings().css('fontWeight','normal');
		 			mySwiper.slideTo(($(this).index()+1),speed,true);
		 			}

		 		


		 		
		 	})
		 	
		 	};


		 

		 	



		/*遮罩动画*/

		function zhezhaoAni(){
			zhezhaoAni.p = $(window).scrollTop();
			if(zhezhaoAni.t<=zhezhaoAni.p){
			     	$('.zhezhao').addClass('zhezhaoAniLeft');
			     }else{
			     	$('.zhezhao').addClass('zhezhaoAniRight');
			     }

			$('.zhezhao').bind('webkitAnimationEnd',function(){						
				$(this).removeClass('zhezhaoAniLeft zhezhaoAniRight');
								
				$(this).unbind('webkitAnimationEnd');
			});

			$('.zhezhao').bind('animationend',function(){
				$(this).removeClass('zhezhaoAniLeft zhezhaoAniRight');
								
				$(this).unbind('animationend');
			}); 

			setTimeout(function(){zhezhaoAni.t = zhezhaoAni.p;},0); 
		}
		
		



		

	

	/*首页logo监听效果*/
	function indexLogo(e){

		$('body').css({backgroundPositionX:-(e.clientX/20),backgroundPositionY:-(e.clientY/20)});
		$($indexLeft).css({backgroundPositionX:-(e.clientX/20),backgroundPositionY:-(e.clientY/20)});
		$('.bc5').css({backgroundPositionX:-(e.clientX/20),backgroundPositionY:-(e.clientY/20)});


		var offset = $('#index_logo img').offset();

		var x = e.pageX - offset.left;
  		var y = e.pageY - offset.top;

  		 var centerX = $('#index_logo img').outerWidth() /2
		  var centerY = $('#index_logo img').outerHeight() /2 
		  
		  var deltaX = x - centerX
		  var deltaY = y - centerY
		  
		  var percentX = deltaX / centerX
		  var percentY = deltaY / centerY
		  
		  var deg = 8;
		  
		  
		  
		  $('#index_logo img').css({
		    transform: 'rotateX('+deg*-percentY + 'deg)'+
		    ' rotateY('+deg*percentX+'deg)'
		  });


		  

		 
		
	};


	/*首页logo离开复位*/

	function indexLogoLeave(){
		
		$('#index_logo img').css({
		    transform: ''
		  });


	};


	/*首页logo进入退出*/
	function indexLogoOutIn(){
		var $documentScrollTop = $(window).scrollTop();
		
		if($(window).width()>1100){

			if(indexLogoOutIn.onOff == true){

			
			if($documentScrollTop>$windowHeightHalf){

				$('#index_logo').removeClass('indexLogoIn')
				.addClass('indexLogoOut');

				$('#index_logo').bind('webkitAnimationEnd',function(){
					$(this).removeClass('indexLogoOut')
					.css('display','none')
					.unbind('webkitAnimationEnd');
				});

				$('#index_logo').bind('animationend',function(){
					$(this).removeClass('indexLogoOut')
					.css('display','none')
					.unbind('animationend');
				});

				indexLogoOutIn.onOff = false;
			}



		}else if(indexLogoOutIn.onOff == false){
			if($documentScrollTop<$windowHeightHalf){
				$(window).unbind('mousemove',indexLogo);
				$('#index_logo').addClass('indexLogoIn').css('display','block');
				
				

				$('#index_logo').bind('webkitAnimationEnd',function(){
					$(this).css('display','block')
						   
						   .unbind('webkitAnimationEnd');
					$(window).bind('mousemove',indexLogo);
				});

				$('#index_logo').bind('animationend',function(){
					$(this).css('display','block')
						   
						   .unbind('animationend');
					$(window).bind('mousemove',indexLogo);
				});	

				indexLogoOutIn.onOff = true;
			}

		}
	}else{
		$('#index_logo').css('display','none')
	}

			
	
		


	}

	

					
		


		





	


	

	






	function demoAnimate(){};

	demoAnimate.$gray = $('#gray');
	demoAnimate.$swiperContainer = $('.swiper-container');
	demoAnimate.$demoShow = $('.demoShow');
	demoAnimate.$html = $('html');
	



	demoAnimate.Start = function(){

			demoAnimate.$gray.css('display','block');
			demoAnimate.$swiperContainer.css('display','none');
			demoAnimate.$demoShow.eq($(this).index()).css('display','block');
			demoAnimate.$html.css('overflow','hidden');


			$indexLeft.addClass('demoLeftStart shadow')
			.bind('webkitAnimationEnd',function(){
				$(this).css('width','45%')
				.removeClass('demoLeftStart')
				.unbind('webkitAnimationEnd');
			}).bind('animationend',function(){
				$(this).css('width','45%')
				.removeClass('demoLeftStart')
				.unbind('animationend');
			}).css('overflowY','scroll');


			$indexRight.addClass('demoRightStart')
			.bind('webkitAnimationEnd',function(){

				$(this).css('width','55%')
				.removeClass('demoRightStart')
				.unbind('webkitAnimationEnd');
			}).bind('animationend',function(){

				$(this).css('width','55%')
				.removeClass('demoRightStart')
				.unbind('animationend');
			})

			$(window).unbind('mousemove',indexLogo);

	}

	demoAnimate.End = function(){
			
			demoAnimate.$gray.css('display','none');
			demoAnimate.$demoShow.css('display','none');
			demoAnimate.$html.css('overflow','visible');



			$indexLeft.addClass('demoLeftEnd')
			.bind('webkitAnimationEnd',function(){
				$(this).css('width','30%')
				.removeClass('demoLeftEnd')
				.unbind('webkitAnimationEnd');
			}).bind('animationend',function(){
				$(this).css('width','30%')
				.removeClass('demoLeftEnd')
				.unbind('animationend');
			}).css('overflowY','hidden').removeClass('shadow');


			$indexRight.addClass('demoRightEnd')
			.bind('webkitAnimationEnd',function(){

				$(this).css('width','70%')
				.removeClass('demoRightEnd')
				.unbind('webkitAnimationEnd');
			}).bind('animationend',function(){

				$(this).css('width','70%')
				.removeClass('demoRightEnd')
				.unbind('animationend');
			})

			demoAnimate.$swiperContainer.css('display','block');
			$(window).bind('mousemove',indexLogo);

	}

	



	$('.demo_img img').click(demoAnimate.Start);

	$('.demoClose').click(demoAnimate.End);

	$('#gray').click(demoAnimate.End);




	function FormTest(){
		
		this.argumentsList =[];       //参数传input的name值，然后获得这个name的dom，推进这个数组

		this.typename =[];

		

		for(var i =0;i <arguments.length;i++){
			this.typename.push(arguments[i]);
			this.argumentsList.push(document.getElementsByName(arguments[i]));

			

			$(this.argumentsList[i]).attr('testValue',$(this.argumentsList[i]).prop('value'));



		}




		

	}

	

	
	//添加离开焦点事件
	FormTest.prototype.blurFocus = function(){
		var _this = this;
		for(var i =0;i<this.argumentsList.length;i++){

			$(this.argumentsList[i]).blur(function(){

				if($(this).val() == ''){
					$(this).val($(this).attr('testValue'));

				}


				var typename =  $(this).attr('name');         //让typename等于点击的这个节点的name值	
				
				
				_this['test'+typename]($(this));

			})

			$(this.argumentsList[i]).focus(function(){

				if($(this).val() == $(this).attr('testValue')){
					$(this).val('');
				}



			})
	
		}	

		if($('form textarea')){
			$('form textarea').focus(function(){
				if($(this).val() == "留言"){
					$(this).val('');
				}
			})

			$('form textarea').blur(function(){
				if($(this).val() == ''){
					$(this).val('留言');
				}
			})


		}
				
			
	}



	FormTest.prototype.testusername = function(dom){


		var kongge = /\s/i;
		var zimu = /\d/i;
		var nameVal = dom.val();
		if(nameVal == "" || zimu.test(nameVal)==true || kongge.test(nameVal)==true || dom.attr('value')==nameVal){
			this.fail(dom);
			return false;		
		}else{
			
			this.success(dom);		
			return true;
		}


	}




	

	FormTest.prototype.testemail = function(dom){
		
		var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var kongge = /\s/i;
		var emailVal =dom.val();
		if(re.test(emailVal) == false || emailVal=='' || kongge.test(emailVal)==true || dom.attr('value')==emailVal){
			this.fail(dom);		
			return false;

		}else{
			this.success(dom);
			return true;
		}


	}


	FormTest.prototype.testphone = function(dom){
		
		var kongge = /\s/i;
		var shuzi = /[^0-9]/i;
		var num_tel =dom.val();

		if(num_tel.length > 11 || num_tel == '' || shuzi.test(num_tel)==true || kongge.test(num_tel)==true || dom.attr('value')==num_tel){
			this.fail(dom);		
			return false;
		}else{
			this.success(dom);
			
			return true;
		}
	}

	

	

	FormTest.prototype.success = function(dom){
		dom.css('borderStyle','solid');
		
	}

	FormTest.prototype.fail = function(dom){
		dom.css('borderStyle','dashed');
		
	}

	


	FormTest.prototype.submit = function(form){

		var _this = this;
		
		var successArray =[];
		form.submit(function(){
			for(var i =0;i < _this.typename.length;i++){
				

				_this['test'+_this.typename[i]]($(this).find($(_this.argumentsList[i])));

				if(_this['test'+_this.typename[i]]($(this).find($(_this.argumentsList[i]))) == true){
					successArray.push(_this['test'+_this.typename[i]]($(this).find($(_this.argumentsList[i]))));
				}

			}



			if(successArray.length!=_this.typename.length){
				successArray=[];
				return false;
			}else if(successArray.length ==_this.typename.length){
				alert('提交成功');
				return true;

			}
			
	
			
		})
		
		

		
	}

	var FormTest = new FormTest('username','phone','email');

	FormTest.blurFocus();

	FormTest.submit($('#pcForm'));

	FormTest.submit($('#phoneForm'));

	

	

	$('#phoneStartButton').click(function(){

		var $phoneAddressScrollTop = $('.phoneAddress').offset().top;
		$('html').animate({scrollTop : $phoneAddressScrollTop},400);
		$('html body').animate({scrollTop : $phoneAddressScrollTop},400);
	})

	


	



	
	


	



	

	/*map*/
	function map(){
			var map = new BMap.Map("map");    // 创建Map实例
			map.setCurrentCity("广州");          // 设置地图显示的城市 此项是必须设置的
			var point = new BMap.Point(113.290224, 23.123794);
			map.centerAndZoom(point, 20);
			var marker = new BMap.Marker(point);  // 创建标注
			map.addOverlay(marker);               // 将标注添加到地图中
			marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画  	
		}  
		map();


	





})


window.onload = function(){

			
				$('.spinner div').removeClass('bounce');
				$('.spinner').css('display','none');
				$('#loading').addClass('loadingClose');
				$('html').css('overflowY','scroll');

			
			
		

		
	}




		







































  












