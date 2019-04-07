(function(){
    var drag = document.getElementsByClassName('bar')[0];
    var scroll = document.getElementsByClassName('scroll')[0];
    var container = document.getElementsByClassName('container')[0];
    var content = document.getElementsByClassName('contents')[0];
    var ulscroll = document.getElementsByTagName('ul')[0];

    var contentH = content.offsetHeight;
    var containerH = container.offsetHeight;
    var dragH = Math.floor(containerH / contentH * scroll.offsetHeight);
    drag.style.height = dragH + 'px';

    init();

    function init() {
        // 拖拽滑动
        scrollDrag(drag, scroll);
        // 鼠标滚轮滑动
        scrollWheel(container, drag);
        // 点击滑动
        scrollBtn(ulscroll, drag);
    }

    function scrollDrag(item, scroll) {
        item.onmousedown = function(e) {
            e = e || window.event;
            e.preventDefault();
            var topY = e.pageY;
            document.onmousemove = function(e2) {
                e2 = e2 || window.event;
                e2.preventDefault();
                var moveY = e2.pageY - topY;

                console.log(moveY)

                if(moveY > 0) {
                    item.style.top = moveY + item.offsetTop + 'px';
                    if(moveY + item.offsetHeight + item.offsetTop >= scroll.offsetHeight){
                        item.style.top = scroll.offsetHeight - item.offsetHeight + 'px';
                    }
                }else {
                    item.style.top = moveY + item.offsetTop + 'px';
                    if(moveY + item.offsetTop <= 0) {
                        item.style.top = 0 + 'px';
                    }
                }

                topY = e.pageY;

                var scale = item.offsetTop / (scroll.offsetHeight - item.offsetHeight);
                var scrollContents = scale * (contentH - containerH);
                content.style.top = -scrollContents + 'px';
                
            }

            document.onmouseup = function(e3) {
                document.onmousemove = null;
            }
            
        }
    }

    // 鼠标滚轮部分
    function scrollWheel(box, item) {
        box.onmousewheel = function(e) {
            e = e || window.event;
            e.preventDefault();
            if(e.wheelDeltaY > 0) {
                item.style.top = item.offsetTop + 10 + 'px';
                if(item.offsetHeight + item.offsetTop >= scroll.offsetHeight){
                    item.style.top = scroll.offsetHeight - item.offsetHeight + 'px';
                }
            }else {
                item.style.top = item.offsetTop - 10 + 'px';
                if(item.offsetTop <= 0) {
                    item.style.top = 0 + 'px';
                }
            }
            var scale = item.offsetTop / (scroll.offsetHeight - item.offsetHeight);
            var scrollContents = scale * (contentH - containerH);
            content.style.top = -scrollContents + 'px';
        }
    }

    //点击滑动
    function scrollBtn(ulscroll, item) {
        ulscroll.onclick = function(e) {
            var icoName = e.target.parentNode.className;
            if(icoName === 'ico up') {
                item.style.top = item.offsetTop + 10 + 'px';
                if(item.offsetHeight + item.offsetTop >= scroll.offsetHeight){
                    item.style.top = scroll.offsetHeight - item.offsetHeight + 'px';
                }
            }else if(icoName === 'ico down') {
                item.style.top = item.offsetTop - 10 + 'px';
                if(item.offsetTop <= 0) {
                    item.style.top = 0 + 'px';
                }
            }
            var scale = item.offsetTop / (scroll.offsetHeight - item.offsetHeight);
            var scrollContents = scale * (contentH - containerH);
            content.style.top = -scrollContents + 'px';
        }
    }

    function runScroll(item) {

    }
})();