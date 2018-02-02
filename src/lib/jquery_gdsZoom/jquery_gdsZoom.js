;(function($){
    $.fn.gdsZoom=function(options){
        var defaults={
            // 放大区域的宽高
            width:400,
            height:300,
            // 显示位置
            position:'right',
            // 小图与大图的间距
            gap:15
        }
        return this.each(function(){
            var opt=$.extend({},defaults,options); 
            var $small=$(this);
            var $smallImg=$small.find('img');
            // 设置样式
            $small.addClass('gds-zoom');
            init();
            // 初始化 (获取元素 创建节点 绑定事件)
            function init(){
                // 创建大图
                var $big=$('<div/>').addClass('gds-zoom-big');
                $big.css({
                    width:opt.width,
                    height:opt.height
                })
                console.log($big)
                $big.appendTo($('body'));

                // 创建大图片
                var $bigImg=$('<img/>').attr('src',$smallImg.attr('data-big')||$smallImg.attr('src'));
                $bigImg.appendTo($big);

                // $big大图的位置
                var bleft,btop;
                if(opt.position === 'right'){
                    bleft = $small.offset().left + $small.outerWidth() + opt.gap;
                    btop = $small.offset().top;
                }else if(opt.position === 'left'){
                    bleft = $small.offset().left - opt.width - opt.gap;
                    btop = $small.offset().top;
                }else if(opt.position === 'top'){
                    bleft = $small.offset().left;
                    btop = $small.offset().top - opt.height - opt.gap;
                }else if(opt.position === 'bottom'){
                    bleft = $small.offset().left;
                    btop = $small.offset().top + $small.outerHeight() + opt.gap;
                } 
                $big.css({
                    left:bleft,
                    top:btop
                })

                // 创建小放大镜
                var $minzoom = $('<span/>').addClass('minzoom');
                $minzoom.appendTo($small);   
                // 大图与小图的比例（图片加载完之后才能获取到）
                var ratio;
                // 鼠标移入移出
                $small.on('mouseenter',function(){
                    // 再次判断图片
                    $bigImg.attr('src',$smallImg.attr('data-big')||$smallImg.attr('src'));
                    $minzoom.show();
                    $big.show();
                    // 计算比例
                    // 大图没有设置大小 就是本身图的大小 而小图在css里面设置好
                    ratio=$bigImg.innerWidth()/$smallImg.innerWidth();
                    // 根据比例设置好小放大镜的尺寸
                    $minzoom.css({
                        width:opt.width/ratio,
                        height:opt.height/ratio
                    })        
                }).on('mousemove',function(e){
                    // 小的放大镜算上边框+
                    var minleft=e.pageX-$smallImg.offset().left-$minzoom.outerWidth()/2;
                    var mintop=e.pageY-$smallImg.offset().top-$minzoom.outerHeight()/2;
                    // 边界条件
                    if(minleft<0){minleft=0}
                    if(minleft>$smallImg.innerWidth()-$minzoom.outerWidth()){
                        minleft=$smallImg.innerWidth()-$minzoom.outerWidth();
                    }
                    if(mintop<0){mintop=0}
                    if(mintop>$smallImg.innerHeight()-$minzoom.outerHeight()){
                        mintop=$smallImg.innerHeight()-$minzoom.outerHeight();
                    }
                    $minzoom.css({
                        left:minleft,
                        top:mintop
                    })
                    $bigImg.css({
                        left:-minleft*ratio,
                        top:-mintop*ratio
                    })
                }).on('mouseleave',function(){
                    $minzoom.hide();
                    $big.hide();
                })
            }
        
        })

    }
})(jQuery)