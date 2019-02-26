// 如何实现两个动画： 自身的移动  自身的动作
// 两个动画的协调：自身动作越快---跑得越快
// 定时器绑定  单对象应用
// 对象的工厂模式  --- 简单应用
// 拖拽问题  代码规范

// let sheep = document.getElementsByClassName('sheep')[0];
// let num = 0;
// let cot = 0;

// let sheepAnimate = setInterval(function(){
//     num += 164;
//     if(num == 1312){
//         num = 0;
//     }
//     sheep.style.backgroundPosition = -num + 'px 0px'; 

// }, 50);

// // 自身向前移动
// let sheepRun = setInterval(function(){
//     cot = sheep.offsetLeft - 5;
//     if(cot <= -164){
//         clearInterval(sheepAnimate);
//         clearInterval(sheepRun);
//     }
//     sheep.style.left = cot + 'px';
// }, 30);

(function () {
    obj = {
        sheepAnimateNum: 0,
        sheepCotNum: 0,
        stage: document.getElementsByClassName('stage')[0],
        runSpeed: 5,
        animateFrequency: 100,
        maxSheep: 10,
        speed: 5
    }

    function SheepOrigin(data) {
        this.sheep = document.createElement('div');
        data.stage.appendChild(this.sheep);
        this.sheep.className = 'sheep';
        this.animateFrequency = Math.floor(data.animateFrequency * Math.random()) + 20;
        this.sheepAnimateNum = data.sheepAnimateNum;
        this.sheepCotNum = data.sheepCotNum;
        this.runSpeed = data.runSpeed;
        this.top = 0;
        this.sheepWidth = this.sheep.offsetWidth;
    }

    init();

    function init() {
        createSheep();
    }

    function createSheep() {
        let timer = setInterval(function () {
            let sheepNum = obj.stage.children.length;
            if (sheepNum > obj.maxSheep - 1) {
                return;
            }
            let sheep = new SheepOrigin(obj);
            sheepRun(sheep);
        }, 2000);
    }

    function sheepRun(oSheep) {

        let sheepForward = setInterval(function () {
            oSheep.sheepCotNum = oSheep.sheep.offsetLeft - oSheep.runSpeed;
            if (oSheep.sheepCotNum <= -oSheep.sheepWidth) {
                clearInterval(sheepAnimate);
                clearInterval(sheepForward);
                obj.stage.removeChild(oSheep.sheep);
            }
            oSheep.sheep.style.left = oSheep.sheepCotNum + 'px';
        }, oSheep.animateFrequency);


        let sheepAnimate = setInterval(function () {
            oSheep.sheepAnimateNum += oSheep.sheepWidth;
            if (oSheep.sheepAnimateNum == (8 * oSheep.sheepWidth)) {
                oSheep.sheepAnimateNum = 0;
            }
            oSheep.sheep.style.backgroundPosition = -oSheep.sheepAnimateNum + 'px ' + oSheep.top + 'px';

        }, oSheep.animateFrequency);

        // 拖拽事件
        oSheep.sheep.addEventListener('mousedown', function (e) {
            var event = event || e;
            oSheep.top = -128;
            oSheep.runSpeed = 0;
            oSheep.x = event.pageX;
            oSheep.y = event.pageY;

            document.addEventListener('mousemove', sheepMove);

            function sheepMove(e) {
                var event = event || e;
                oSheep.sheep.style.left = oSheep.sheep.offsetLeft + (event.pageX - oSheep.x) + 'px';
                oSheep.sheep.style.top = oSheep.sheep.offsetTop + (event.pageY - oSheep.y) + 'px';
                oSheep.x = event.pageX;
                oSheep.y = event.pageY;
            }

            oSheep.sheep.addEventListener('mouseup', function (e) {
                var event = event || e;
                oSheep.top = 0;
                oSheep.runSpeed = obj.speed;
                document.removeEventListener('mousemove', sheepMove);
            });
        });



    }

})();