/**
 * Created by Administrator on 2017/2/20.
 */
window.onload = function(){
     deleteProduct();
};

function deleteProduct(){
    // 1. 获取标签
    var panel = document.querySelector('.panel');
    var panelContent = panel.getElementsByClassName('panel_content')[0];
    var panelFooter = panel.getElementsByClassName('panel_footer')[0];
    var trashs = document.getElementsByClassName('con_detail_deal_right');
    var cancel = panelFooter.getElementsByClassName('cancel')[0];
    var cartCheckBox = document.getElementsByClassName('cart_check_box');

    // 2. 监听点击
    // 2.1 垃圾盖
    var up;
    for(var i=0; i<trashs.length; i++){
        (function(index){
            mjd.tap(trashs[index], function(){
                /*alert('点击了第' + index + '个垃圾篓!');*/
                up = trashs[index].firstElementChild;

                // 2.2 设置过渡效果
                up.style.transition = 'all .2s ease';
                up.style.webkitTransition = 'all .2s ease';

                up.style.transformOrigin = '0 5px';
                up.style.webkitTransformOrigin = '0 5px';

                up.style.transform = 'rotate(-45deg)';
                up.style.webkitTransform = 'rotate(-45deg)';

                // 2.3 面板出现
                panel.style.display = 'block';
                panelContent.className = 'panel_content jump';
            });
        })(i);
    }

    // 3. 点击取消按钮
    mjd.tap(cancel, function(){
        panel.style.display = 'none';
        up.style.transform = 'none';
        up.style.webkitTransform = 'none';
    });

    // 4. 切换选中状态
    for(var i=0; i<cartCheckBox.length; i++){
        mjd.tap(cartCheckBox[i], function(e){
             //console.log(e.target);
            if(e.target.hasAttribute('checked')){
                e.target.removeAttribute('checked');
                console.log(e.target);
            }else {
                e.target.setAttribute('checked', '');
                console.log(e.target);
            }
        });
    }
}