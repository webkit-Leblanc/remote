define(function(){
    return{
        /*
         * [生成一个范围内的随机整数]
         * @param  {Number} min [范围最小值]
         * @param  {Number} max [范围内最大值]
         * @return {Number}     [返回随机整数]
         */
        randomNumber(min,max){
            return parseInt(Math.random()*(max-min+1)) + min
        },
        vCode(){
            var res = '';
            for(var i=0;i<4;i++){
                res += parseInt(Math.random()*10);//'' + 8=>'8'+6=>'86'+5=>'865'+0=>'8650'
            }
            return res;
        },
        randomColor(){
            // 随机r,g,b
            var r = parseInt(Math.random()*256);
            var g = parseInt(Math.random()*256);
            var b = parseInt(Math.random()*256);
            return 'rgb(' + r + ',' + g + ',' + b + ')';
        }
    }
});