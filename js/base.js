/**
 * Created by Administrator on 2017/2/18.
 */
window.mjd = {};
/*判断过渡结束的索引改变*/
mjd.transitionEnd = function(obj, callBack){
    // 1.判断当前是否是对象
    if(typeof obj != 'object') return;

    // 2. 监听事件,并回调
    obj.addEventListener('transitionEnd', function(e){
         callBack && callBack(e);
    });

    obj.addEventListener('webkitTransitionEnd', function(e){
        callBack && callBack(e);
    });
};

/*
  tap事件
*/
mjd.tap = function(obj, callBack){
    if(typeof obj != 'object') return;

    // 变量
    var startTime = 0; // 记录触摸开始时间
    var isMove = false; // 记录是否产生移动

    obj.addEventListener('touchstart',function(){
        startTime = Date.now();
    });

    obj.addEventListener('touchmove',function(){
        isMove = true;
    });

    obj.addEventListener('touchend',function(e){
        if(Date.now() - startTime < 200 && !isMove){
            //触碰时间在200ms以内,不产生移动
            callBack && callBack(e);
        }
        // 清零
        startTime = 0;
        isMove = false;
    });
};