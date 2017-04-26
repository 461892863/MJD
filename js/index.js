/**
 * Created by Administrator on 2017/2/17.
 */
window.onload = function(){
    changeNavColor();
    banner();
    secondKill();
};

window.onresize = function(){
    setTimeout(function(){
        window.location.reload();
    }, 200);
};

/*
  导航变色
*/
function changeNavColor(){
    // 1.获取需要的标签
    var headerBox = document.getElementsByClassName('jd_header_box')[0];
    var banner = document.getElementsByClassName('jd_banner')[0];

    // 2. 求出banner的高度
    var bannerH = banner.offsetHeight;

    // 3.监听滚动
    var scrollTopH = 0;
    window.onscroll = function(){
        // 3.1 求出滚动偏离的高度
        scrollTopH = document.body.scrollTop;
        //console.log(scrollTopH);

        // 3.2 对比
        var opt = 0; // 默认透明度  rgba(201, 21, 35, 0.85)
        if(scrollTopH < bannerH){
            opt = scrollTopH / bannerH * 0.85;
        }else {
            opt = 0.85;
        }
        headerBox.style.background = 'rgba(201, 21, 35, '+ opt +')';
    }
}

/*
  焦点图
*/
function banner(){
    // 1. 获取需要的标签
    var banner = document.getElementsByClassName('jd_banner')[0];
    var bannerW = banner.offsetWidth;
    var imageBox = banner.getElementsByTagName('ul')[0]; // 图片的盒子
    var pointBox = banner.getElementsByTagName('ol')[0]; // 点的盒子
    var allPoints = pointBox.getElementsByTagName('li'); // 所有的点

    // 2. 设置过渡效果  移除过渡效果  位置改变
    var addTransition = function(){
        imageBox.style.transition = 'all .2s ease';
        /*兼容老版本的webkit内核*/
        imageBox.style.webkitTransition = 'all .2s ease';
    };

    var removeTransition = function(){
        imageBox.style.transition = 'none';
        /*兼容老版本的webkit内核*/
        imageBox.style.webkitTransition = 'none';
    };

    var changeTranslateX = function(x){
        imageBox.style.transform = 'translate(' + x +'px)';
        imageBox.style.webkitTransform = 'translate(' + x +'px)';
    };

    // 3.让图片滚动起来
    var index = 1; /*全局的索引*/
    var timer = null;
    timer = setInterval(scrollImg, 1000);
    function scrollImg(){
        index++;
        // 3.1 加过渡效果
        addTransition();
        changeTranslateX(-index * bannerW);
    }

    // 4. 每一张图片过渡结束,临界值的判断
    /*
    imageBox.addEventListener('transitionEnd', function(){
        if(index >= 9){
            index = 1;
        }else if(index <= 0){
            index = 8
        }
        // 4.1 清除过渡
        removeTransition();
        changeTranslateX(-index * bannerW);
    });
    imageBox.addEventListener('webkitTransitionEnd', function(){
        if(index >= 9){
            index = 1;
        }else if(index <= 0){
            index = 8
        }
        // 4.1 清除过渡
        removeTransition();
        changeTranslateX(-index * bannerW);
    });
    */
    mjd.transitionEnd(imageBox, function(){
        if(index >= 9){
            index = 1;
        }else if(index <= 0){
            index = 8
        }
        // 4.1 清除过渡
        removeTransition();
        changeTranslateX(-index * bannerW);

        setPoint();
    });

    // 5.让圆点滚动起来
    var setPoint = function(){
        // 5.1 清除所有的className
        for(var i=0; i<allPoints.length; i++){
            allPoints[i].className = '';
        }

        // 5.2 让圆点的索引和图片的索引保持一致
        var pointIndex = index;
        if(index >= 9){
            pointIndex = 1;
        }else if(index <= 0){
            pointIndex = 8;
        }

        // 5.3 让当前的被选中
        allPoints[pointIndex -1].className = 'current';
    };

    // 6.监听滑动
    var startX = 0, endX = 0, distanceX =0;
    imageBox.addEventListener('touchstart', function(e){
         // 6.0 清除定时器
         clearInterval(timer);
         // 6.1 求出起始位置
         startX = e.touches[0].clientX;
    });

    /*模拟器的bug, 事件丢失现象, 遵循冒泡机制,往上进行拓展, window*/
    imageBox.addEventListener('touchmove', function(e){
         // 6.3 阻止默认的事件
         e.preventDefault();
         // 6.4 获取结束位置
         endX = e.touches[0].clientX;
         // 6.5 求出移动的距离
         distanceX = startX - endX;
         // 6.6 清除过渡
         removeTransition();
         // 6.7 改变位置
         changeTranslateX(-index*bannerW - distanceX);
    });

    imageBox.addEventListener('touchend', function(e){
          // 6.8 满足1/3*宽度的时候 滑动一屏 && 滑动状态
          if(Math.abs(distanceX) >= 1/3 * bannerW && endX != 0){
               if(distanceX > 0){
                   index ++;
               }else {
                   index --;
               }
          }
          // 6.9 添加过渡效果,改变位置
          addTransition();
          changeTranslateX(-index * bannerW);

          // 6.10 重新开启定时器
          timer = setInterval(scrollImg, 1000);

          // 6.11 清零
          startX = 0;
          endX = 0;
          distanceX =0;
    });
}

/*
  秒杀区域
*/
function secondKill(){
    // 1. 获取需要的标签
    var senTime = document.getElementsByClassName('sec_timer')[0];
    var spans = senTime.getElementsByTagName('span');

    // 2. 倒计时
    var timer = null, time = 8 * 60 * 60;
    timer = setInterval(function(){
        // 2.1 时间-1
        time --;
        if(time < 0){
           clearInterval(timer);
        }

        // 2.2 把时间转成时分秒
        var h = Math.floor(time  / (60 * 60));
        var m = Math.floor(time % (60 * 60) / 60);
        var s = time % 60;

        // 2.3 赋值
        spans[0].innerHTML = h >= 10 ? Math.floor(h/10) : 0;
        spans[1].innerHTML = h % 10;

        spans[3].innerHTML = m >= 10 ? Math.floor(m/10) : 0;
        spans[4].innerHTML = m % 10;

        spans[6].innerHTML = s >= 10 ? Math.floor(s/10) : 0;
        spans[7].innerHTML = s % 10;
    }, 1000);
}
