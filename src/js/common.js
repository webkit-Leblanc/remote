/*
	* 封装常用方法
	* 提取公共代码
 */

/**
 * [生成一个范围内的随机整数]
 * @param  {Number} min [范围最小值]
 * @param  {Number} max [范围内最大值]
 * @return {Number}     [返回随机整数]
 */

function randomNumber(min,max){
	return parseInt(Math.random()*(max-min+1)) + min
}


// randomNumber(10,20);
/**
 * [生成4位随机数字验证码]
 * @return {String} [返回随机4位数字的字符串]
 */
function vCode(){
	var res = '';
	for(var i=0;i<4;i++){
		res += parseInt(Math.random()*10);//'' + 8=>'8'+6=>'86'+5=>'865'+0=>'8650'
	}

	return res;
}
// for循环阶乘
function fac1(n){
           
            var jiecheng=1;
            for(var i=2;i<=n;i++){
                jiecheng*=i;  
            }
            return jiecheng;
}
// 递归法阶乘
function fac2(n){
    if(n<=1){return 1;}
    return n*fac2(n-1);
}
// 求分数和
 function sum(num){
        var res=0;
        var i=num%2===0?2:1;
        for(;i<=num;i++){
            res+=1/i;
        }
        return res;
    }
// 生成随机颜色
function randomColor(){
        // 随机r,g,b
        // 字符串拼接
        var r=parseInt(Math.random()*256);        
        var g=parseInt(Math.random()*256);
        var b=parseInt(Math.random()*256);
        var res='';
        res='rgb('+r+','+g+','+b+')';
        console.log(res);
        return res;         
        }
// 递归实现斐波那契数列
 function fib(n){
                if(n<=2){return 1;}
                return fib(n-1)+fib(n-2);
            }
// 所有传入参数的和
function sumNumber(){
            var res=0;
            for(var i=0;i<arguments.length;i++){
                res+=arguments[i];
            }
            return res;
        }

function yanzhengma(){
    var code='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var res='';
    for(var i=0;i<4;i++){
        var idx=parseInt(Math.random()*String(code).length);
        res+=code[idx];
    }
    return res;

}
// 节点关系获取比较适合浏览器兼容性
// 创建一个对象执行函数，可获取传入数组的元素节点、获取子元素、获取上一个元素、获取上一个元素
var element={
    // 获取元素节点：
    get:function(nodeArr){
        var res=[];
        for(var i=0;i<nodeArr.length;i++){
            if(nodeArr[i].nodeType===1){
                res.push(nodeArr[i]);
            }
        }
        return res;
    },
    // 传入一个元素节点，获取子元素
    children:function(ele){
        var nodeArr=ele.childNodes;
        return element.get(nodeArr);
    },
    // 传入一个元素节点，获取上一个元素
    prev:function(ele){
        var before=ele.previousSibling;
        var pararr=ele.parentNode.childNodes;
        for(var i=0;i<pararr.length;i++){
            if(before.nodeType===1){
                return before;                  
            }else{before=before.previousSibling;    
            }
        }
    },
    // 传入一个元素节点，获取下一个元素
    next:function(ele){
        var nex=ele.nextSibling;
        var pararr=ele.parentNode.childNodes;
        for(var i=0;i<pararr.length;i++){
            if(nex.nodeType===1){
                return nex;                  
            }else{nex=nex.nextSibling; 
            }
        }
    }
}

// 获取CSS样式
function getCss(ele,attr){
    // 兼容的思路：判断当前浏览器是否支持这个方法
    // 而不是判断当前时什么浏览器
    if(window.getComputedStyle){
        return getComputedStyle(ele)[attr]
    }else if(ele.currentStyle){
        return ele.currentStyle[attr];
    }else{
        // 如果以上两个都不支持，则直接返回内联样式
        return ele.style[attr];
    }
}

// getCss(box,'font-size');//30


var Event = {
    /**
     * [绑定事件的方法，兼容所有浏览器]
     * @param  {Element}  ele       [绑定事件的元素]
     * @param  {String}  type      [事件类型]
     * @param  {Function}  handler   [事件处理函数]
     * @param  {Boolean} isCapture [是否捕获]
     */
    bind:function(ele,type,handler,isCapture){console.log(isCapture)
        // W3C标准的事件监听器
        if(ele.addEventListener){
            ele.addEventListener(type,handler,isCapture)
        }

        // IE8以下浏览器
        else if(ele.attachEvent){
            ele.attachEvent('on'+type,handler)
        }

        // DOM节点绑定方式
        else{
            ele['on' + type] = handler;
        }
    },
    remove(ele,type,handler,isCapture){
        if(ele.removeEventListener){
            ele.removeEventListener(type,handler,isCapture)
        }

        // IE8以下浏览器
        else if(ele.detachEvent){
            ele.detachEvent('on'+type,handler)
        }

        else{
            ele['on' + type] = null;
        }
    }
}

// 给元素绑定事件
// event.bind(box,'click',function(){},true);
// Event.remove(box,'click',fn,true)

// 输入行 列  生成区域对应的id 点击按钮生成表格 实现行号 以及删除 复制功能
function showForm(rows,cols,area){
    var _row = rows.value;
    var _col = cols.value;
    console.log(_row);

    var table = document.createElement('table');
    for(var i=0;i<_row;i++){
        var tr=table.insertRow(i);
        for(var j=0;j<_col;j++){
            var td=tr.insertCell(j);
            td.innerHTML='单元格'+(i+1)+'行'+(j+1)+'列';
        }
        var rowNum=tr.insertCell(0);
        rowNum.innerText=i+1;
        var rowDel=tr.insertCell(j+1);
        var rowClone=tr.insertCell(j+2);
        rowDel.innerHTML= '<button class="btn1">&times;</buton>';
        rowClone.innerHTML= '<button class="btn2">复制</buton>';
    }
    area.innerText = '';
    area.appendChild(table);
    table.onclick=function(e){
        e=e||window.event;
        var target=e.target||e.srcElement;
        if(target.className==='btn1'){
            console.log(target);
            var currentTr=target.parentNode.parentNode;
            currentTr.parentNode.removeChild(currentTr);      
        }else if(target.className==='btn2'){
            console.log(target);
            // 深复制
            var copyTr=target.parentNode.parentNode.cloneNode(true);
            console.log(copyTr);
            copyTr.children[0].innerText = table.getElementsByTagName('tr').length+1;
            table.appendChild(copyTr);          
        }
    }
}

var Event = {
    /**
     * [绑定事件的方法，兼容所有浏览器]
     * @param  {Element}  ele       [绑定事件的元素]
     * @param  {String}  type      [事件类型]
     * @param  {Function}  handler   [事件处理函数]
     * @param  {Boolean} isCapture [是否捕获]
     */
    bind:function(ele,type,handler,isCapture){console.log(isCapture)
        // W3C标准的事件监听器
        if(ele.addEventListener){
            ele.addEventListener(type,handler,isCapture)
        }

        // IE8以下浏览器
        else if(ele.attachEvent){
            ele.attachEvent('on'+type,handler)
        }

        // DOM节点绑定方式
        else{
            ele['on' + type] = handler;
        }
    },
    remove(ele,type,handler,isCapture){
        if(ele.removeEventListener){
            ele.removeEventListener(type,handler,isCapture)
        }

        // IE8以下浏览器
        else if(ele.detachEvent){
            ele.detachEvent('on'+type,handler)
        }

        else{
            ele['on' + type] = null;
        }
    }
}

// 给元素绑定事件
// event.bind(box,'click',function(){},true);
// Event.remove(box,'click',fn,true)


var Cookie = {
    /**
     * [写入修改cookie]
     * @param {String} name   [cookie名]
     * @param {String} val    [cookie值]
     * @param {[Object]} params [cookie参数]
        * expires {Date} 
        * path    {String}
        * domain  {String}
        * secure  {Boolean}
     */
    set:function(name,val,params){
        // params={expires,path,domain,secure}

        // cookie名与cookie值
        var cookieStr = name +'=' + val;

        params = params || {};

        // 有效期
        if(params.expires){
            cookieStr += ';expires=' + params.expires.toUTCString();
        }

        // 路径
        if(params.path){
            cookieStr += ';path=' + params.path;
        }

        // 域名
        if(params.domain){
            cookieStr += ';domain=' + params.domain;
        }


        // 安全性
        if(params.secure){
            cookieStr += ';secure';
        }


        document.cookie = cookieStr;
    },
    /**
     * [获取cookie]
     * @param  {String} name [description]
     * @return {[type]}      [description]
     */
    get:function(name){
        var cookies = document.cookie;

        // 如果cookie不存在，直接返回空字符串
        if(cookies.length===0){
            return '';
        }

        var res = '';

        cookies = cookies.split('; ');
        for(var i=0;i<cookies.length;i++){
            var arr = cookies[i].split('=');
            if(arr[0] === name){
                res = arr[1];
                break;
            }
        }


        return res;
    },
    /**
     * [删除cookie]
     * @param  {String} name [删除cookie]
     */
    remove:function(name){
        var now = new Date();
        now.setDate(now.getDate()-10);

        // document.cookie = name + '=x;expires=' + now.toUTCString(); 
        this.set(name,'x',{expires:now});
    }
}

// 需求驱动开发
// Cookie.set('goodslist',JSON.stringify(goodslist),null,'')
// Cookie.set('top','200px')
// now = new Date()
// now.setDate(now.getDate()+7)
// Cookie.set('left','100px',{expires:now,path:'/'})
// Cookie.get('top');//得到top的cookie值
// Cookie.remove('top');


/**
 * [动画函数]
 * @param  {Element} ele    [动画元素]
 * @param  {String} attr   [动画属性]
 * @param  {Number} target [目标值]
 */
function animate_jianban(ele,attr,target){
    var timername = attr + 'timer';//toptimer,lefttimer
    clearInterval(ele[timername]);
    ele[timername] = setInterval(()=>{
        // 获取当前值
        let current = getComputedStyle(ele)[attr];//'100px,50deg,0.3'

        //提取单位
        let unit = current.match(/[a-z]+$/);//px,deg,null

        // 
        unit = unit ? unit[0] : '';

        // 提取值
        current = parseFloat(current);

        // 计算缓冲速度
        let speed = Math.floor((target-current)/10);//-32->20->10->5.5->0.5

        // 计算top值
        current += speed;

        if(current === target || speed === 0){
            clearInterval(ele[timername]);

            // 重置current值
            current = target;
        }

        ele.style[attr] = current + unit;

    },30);
}
// animation(元素节点,一个对象包含属性：属性值，回调函数)
function animate(ele,opt,callback){
    // opt= {left:100,top:200,fontSize:40}
    // 属性（动画）数量
    ele.timerLen = 0;

    // 遍历设置定时器（动画）
    for(var attr in opt){
        // 遍历过程设定动画数量
        ele.timerLen++;

        // 匿名函数传递attr
        (function(attr){
            var timername = attr + 'timer';
            var target = opt[attr];

            // 清除同名timer
            clearInterval(ele[timername]);

            ele[timername] = setInterval(function(){
                // 获取当前值
                var current = getCss(ele,attr);//100px,45deg,0.3

                // 提取单位
                var unit = current.match(/[a-z]+$/);//[px],[deg],null

                unit = unit ? unit[0] : '';

                // 提取值
                current = parseFloat(current);

                // 计算缓冲速度
                var speed = (target-current)/10;//-0.5,10,0.2

                // 避免速度变成0

                // 有单位
                speed = speed<0 ? Math.floor(speed) : Math.ceil(speed);

                if(attr === 'opacity'){
                    speed = speed<0 ? -0.02 : 0.02;
                }

                current += speed;

                // 当到达目标值时
                if(current === target || speed === 0){
                    clearInterval(ele[timername]);
                    current = target;

                    ele.timerLen--;

                    // 执行回到函数
                    // if(typeof callback === 'function'){
                    //  callback();
                    // }

                    // 动画完成后执行回掉函数
                    if(ele.timerLen === 0){
                        typeof callback === 'function' && callback();
                    }

                }
                ele.style[attr] = current + unit;
            },30);

        })(attr);
    }
}