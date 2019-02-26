
// 随机生成字符串    从大小写英文字母及数字之间选取6个组成待识别的验证码
// 填充
// 输入验证码   点击提交  --》 进行判断  --》 正确   错误

// 64~90  97~122

let arr = [0,1,2,3,4,5,6,7,8,9];

for(let i = 65; i < 122; i++){
    if(i > 90 && i < 97){
        continue;
    }
    arr.push(String.fromCharCode(i));
}

let value;

function createCanvas(){
    // 选取要显示的字符
    let canvasStr = '';
    value = '';
    for(let i = 0; i < 6; i++){
        let a = arr[Math.floor(Math.random() * arr.length)];
        canvasStr += a + ' ';
        value += a;
    }

    console.log('canvas-str: ', canvasStr);

    // 生成验证码区域
    let myCanvas = document.getElementById('myCanvas');
    let ctx = myCanvas.getContext('2d');
    let oImg = new Image();
    oImg.src = './images/bg.jpg';
    oImg.onload = function(){
        let pattern  = ctx.createPattern(oImg, 'repeat');
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ccc';
        ctx.font = '46px Roboto Slab';
        ctx.setTransform(1, -0.12, .3, 1, 0, 12);
        ctx.fillText(canvasStr, myCanvas.width / 2, 60);
    }
}

createCanvas();

$('.submit').on('click', function(){
    showResult();
});

$('.refresh').on('click', function(){
    createCanvas();
});

function showResult(){
    let inputValue = $('.inputBox input').val();
    console.log(inputValue);
    if(value == inputValue){
        $('.inputBox span').css({
            background: 'url("./images/true.png")',
            display: 'inline-block',
            backgroundPosition: 'center center',
            backgroundSize: '100%'
        });
        $('.error').css('display', 'none');
        createCanvas();
    }else{
        $('.inputBox span').css({
            background: 'url("./images/false.png")',
            display: 'inline-block',
            backgroundPosition: 'center center',
            backgroundSize: '100%'
        });
        $('.error').css('display', 'inline-block').text("验证码错误，请重新输入");
        createCanvas();
    }
}