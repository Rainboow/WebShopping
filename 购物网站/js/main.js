window.onload = function() {
    toSel();
    toRun();
};


//getClass
function getByClass(oParent, sClass) {
    var aEle = oParent.getElementsByTagName('*');
    var arr = [];

    for (var i = 0; i < aEle.length; i++) {
        if (aEle[i].className == sClass) {
            arr.push(aEle[i]);
        }
    }

    return arr;
}

//移动
function moveLeft(obj,old,now){
	
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		
		var iSpeed = (now - old)/10;
		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
		
		if(now == old){
			clearInterval(obj.timer);
		}
		else{
			old += iSpeed;
			obj.style.left = old + 'px';
		}
		
	},30);
	
}
//sell下拉选择
function toSel() {
    var oSel = document.getElementById('sell');
    var aDd = oSel.getElementsByTagName('dd');
    var aUl = oSel.getElementsByTagName('ul');
    var aH2 = oSel.getElementsByTagName('h2');

    for (var i = 0; i < aDd.length; i++) {
        aDd[i].index = i;
        aDd[i].onclick = function(ev) {
            var ev = ev || window.event;
            var This = this;

            for (var i = 0; i < aUl.length; i++) {
                aUl[i].style.display = 'none';
            }

            aUl[this.index].style.display = 'block';

            document.onclick = function() {
                aUl[This.index].style.display = 'none';
            };

            ev.cancelBubble = true;

        };

    }

    for (var i = 0; i < aUl.length; i++) {

        aUl[i].index = i;

        (function(ul) {

            var aLi = ul.getElementsByTagName('li');

            for (var i = 0; i < aLi.length; i++) {
                aLi[i].onmouseover = function() {
                    this.className = 'active';
                };
                aLi[i].onmouseout = function() {
                    this.className = '';
                };
                aLi[i].onclick = function(ev) {
                    var ev = ev || window.event;
                    aH2[this.parentNode.index].innerHTML = this.innerHTML;
                    ev.cancelBubble = true;
                    this.parentNode.style.display = 'none';
                };
            }

        })(aUl[i]); //闭包
    }

}

//左右滑动 移动图片
function toRun() {
    var oRun = document.getElementById('run1');
    var oUl = oRun.getElementsByTagName('ul')[0];
    var aLi = oUl.getElementsByTagName('li');

    var oPrev = getByClass(oRun, 'prev1')[0];
    var oNext = getByClass(oRun, 'next1')[0];

    var iNow = 0;

    oUl.innerHTML += oUl.innerHTML;

    oUl.style.width = aLi.length * aLi[0].offsetWidth + 'px';

    oPrev.onclick = function() {

        if (iNow == 0) {
            iNow = aLi.length / 2;
            oUl.style.left = -oUl.offsetWidth / 2 + 'px';
        }

        moveLeft(oUl, -iNow * aLi[0].offsetWidth, -(iNow - 1) * aLi[0].offsetWidth);

        iNow--;

    };

    oNext.onclick = function() {

        if (iNow == aLi.length / 2) {
            iNow = 0;
            oUl.style.left = 0;
        }

        moveLeft(oUl, -iNow * aLi[0].offsetWidth, -(iNow + 1) * aLi[0].offsetWidth);

        iNow++;

    };


}
