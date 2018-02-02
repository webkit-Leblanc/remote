/*在这个文件里面实现将配置好的文件 加载*/
require(['config'],function(){
    require(['keCarousel','jquery','common','define_self'],function(ca,$,com,self){
        $('.box').keCarousel({
                imgs:['img/001.jpg','img/002.jpg','img/003.jpg','img/004.jpg'],
                width:810,
                height:320,
                type:'horizontal',
                // type:'vertical',
                duration:3000,
                page:true
                // marquee:false
        });
        $('.bg').css('backgroundColor',randomColor());
        setInterval(function(){
            $('.bg').css('backgroundColor',self.randomColor());     
        },2000)
        console.log(com) /*undefined说明为模块没有返回值*/
        console.log(self.randomColor());             

    })
})