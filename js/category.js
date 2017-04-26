/**
 * Created by Administrator on 2017/2/18.
 */
window.onload = function(){
   leftCategory();
};

function leftCategory(){
    // 1. 获取需要的标签
    var parentBox = document.getElementsByClassName('category_main_left')[0];
    var childBox = parentBox.getElementsByTagName('ul')[0];
    var parentH = parentBox.offsetHeight;
    var childH = childBox.offsetHeight;
    //console.log(parentH, childH);

    // 2. 确定合理的滚动区间
    var maxY = 0, minY = -(childH - parentH);

    // 3. 缓冲区间
    var buffer = 150;

    // 4. 过渡效果\清除过渡效果\位置的改变
    var addTransition = function(){
        childBox.style.transition = 'all .2s ease';
        /*兼容老版本的webkit内核*/
        childBox.style.webkitTransition = 'all .2s ease';
    };

    var removeTransition = function(){
        childBox.style.transition = 'none';
        /*兼容老版本的webkit内核*/
        childBox.style.webkitTransition = 'none';
    };

    var changeTranslateY = function(y){
        childBox.style.transform = 'translateY(' + y +'px)';
        childBox.style.webkitTransform = 'translateY(' + y +'px)';
    };

    // 5.监听滑动
    var startY = 0, endY = 0, moveY = 0;
    var currentY = 0; // 记录当前y轴上的滚动位置

    childBox.addEventListener('touchstart', function(e){
          // 5.1 获取起始位置
          startY = e.touches[0].clientY;
    });

    childBox.addEventListener('touchmove', function(e){
          // 5.2 获取结束位置
          endY = e.touches[0].clientY;
          // 5.3 求出移动距离
          moveY = startY - endY;
          // 5.4 移除过渡效果
          if((currentY-moveY) < (maxY + buffer) && (currentY-moveY) > (minY - buffer)){
              removeTransition();
              changeTranslateY(currentY - moveY);
          }
    });

    childBox.addEventListener('touchend', function(e){
           // 1.向下滑动
           if((currentY - moveY) > maxY){
               currentY = maxY;
               // 加过渡效果
               addTransition();
               // 改变位置
               changeTranslateY(currentY);
           }else if((currentY - moveY) < minY){
               currentY = minY;
               // 加过渡效果
               addTransition();
               // 改变位置
               changeTranslateY(currentY);
           }else {
               currentY = currentY - moveY;
           }

           // 2.清零
           startY = 0;
           endY = 0;
           moveY = 0;
    });

    // 6. 监听tap事件
    var listLi = childBox.getElementsByTagName('li');
    mjd.tap(childBox, function(e){
         // 6.1 清除所有的className
         for(var i=0; i<listLi.length; i++){
             listLi[i].className = '';
             // 6.2 绑定索引
             listLi[i].index = i;
         }

         // 6.2 当前的li被选中
         var li = e.target.parentNode;
         li.className = 'current';

         // 6.3 求出滚动距离
         var distance = -(li.index * 50);

         // 6.4 判断
         if(distance > minY){ // 会产生滚动
             addTransition();
             changeTranslateY(distance);
             currentY = distance;
         }else { // 不会产生滚动
             changeTranslateY(minY);
             currentY = minY;
         }

         // 6.5 模拟数据
         var rightContent = document.getElementsByClassName('category_main_right')[0];
         rightContent.style.transition = 'all .2s ease';
         rightContent.style.webkitTransition = 'all .2s ease';
         rightContent.style.opacity = 0;
         setTimeout(function(){
             rightContent.style.opacity = 1;
         }, 200);
    });

}