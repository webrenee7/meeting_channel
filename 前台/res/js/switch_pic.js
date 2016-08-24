(function(win){
	var switchBanner = {
		_currentTab : 0,
		autoStart : null,
		len : null,
		picWidth : null,
		bannerBox : null,
		navUl : null,
		navUlCurrent : null,
		toLeft : null,
		toRight : null,
		init : function(picWidth,len,bannerContent,bannerBox,bannerList,navUl,navUlCurrent,toLeft,toRight){
			var t = this;
			//初始化
			t.len = len;
			t.picWidth = picWidth;
			t.bannerBox =bannerBox;
			t.navUl = navUl;
			t.navUlCurrent = navUlCurrent;
			t.toLeft = toLeft;
			t.toRight = toRight;
			//添加元素
			var lastChild = $('.'+bannerList).last();
			var firstChild = $('.'+bannerList).first();
			lastChild.clone().prependTo('.'+bannerBox);
			firstChild.clone().appendTo('.'+bannerBox);
			$('.'+bannerBox).css({'width':(t.len+2)*t.picWidth + 'px','left':(-1)*t.picWidth + 'px'});
			//绑定事件
			$('.'+bannerContent).mouseover(function(){
				t.clearAuto();
			});
			$('.'+bannerContent).mouseout(function(){
				t.setAuto();
			});
			$('.'+navUl+' li').each(function(k, v) {
                $(v).click(function(){
					t._currentTab = k;
					t.switchVouch(k);	
				})
            });
			$('.'+toLeft).click(function(){
					t.leftScr();	
			});
			$('.'+toRight).click(function(){
					t.rightScr();	
			});
			//触发
			t.setAuto();
		},
		setAuto : function(){
			var t = this;
			t.autoStart = setInterval(function(){
				t.auto(t._currentTab);	
			}, 3000);
		},
		clearAuto : function(){
			var t = this;
			clearInterval(t.autoStart);	
		},
		auto : function(){
			var t = this;
			t._currentTab++;
			t.switchVouch(t._currentTab);	
		},
		switchVouch : function(value){
			var t = this;
			$('.'+ t.navUl +' li').removeClass(t.navUlCurrent);
			if(value >= t.len){
				$('.'+ t.navUl +' li').first().addClass(t.navUlCurrent);
			}else{
				$('.'+ t.navUl +' li').eq(value).addClass(t.navUlCurrent);
			}
			
			$('.'+t.bannerBox).animate({
				left : (-1-value) * t.picWidth + 'px'
			},500,function(){		
				if(value >= t.len){
					$('.'+t.bannerBox).css('left',(-1) * t.picWidth + 'px');
					t._currentTab = 0;
				}
			});	
		},
		leftScr : function(){
			var t = this;
			t._currentTab--;
			if(t._currentTab < 0){
				$('.'+t.bannerBox).css('left',(-1)*(t.len+1)*t.picWidth + 'px');
				t._currentTab = t.len - 1;
			}
			t.switchVouch(t._currentTab);		
		},
		rightScr : function(){
			var t = this;
			t._currentTab++;
			if(t._currentTab >= t.len){
				$('.'+t.bannerBox).css('left','0px');
				t._currentTab = 0;
			}
			t.switchVouch(t._currentTab);	
		}
	}
	win.switchBanner = switchBanner;
})(window)
