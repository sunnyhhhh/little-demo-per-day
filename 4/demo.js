
var imgArea = $('.imgArea');
var imgW = parseInt(imgArea.css('width'));
var imgH = parseInt(imgArea.css('height'));
var cellW = imgW / 3;
var cellH = imgH / 3;
var originArr = [];
var randomArr = [];
var flag = true;
var imgCell;

init();

function init() {
    imgSplit();
    gameState();
}

function imgSplit() {
    var cell;
    for(var i = 0; i < 3; i++) {
        for(var j = 0; j < 3; j++) {
            originArr.push(i * 3 + j);
            cell = $('<div class="imgCell"></div>');
            cell.css({
                'width': cellW,
                'height': cellH,
                'left': cellW * j,
                'top': cellH * i,
                'backgroundPosition': (-cellW) * j + 'px ' + (-cellH) * i + 'px'
            });
            imgArea.append(cell);
        }
    }
    imgCell = $('.imgCell');
}

function gameState() {
    $('.start').on('click', function () {
        if(flag) {
            $(this).text('复原');
            flag = false;
            ranArr();
            cellOrder(randomArr);
            imgCell.on('mousedown', function(e) {
                var index1 = $(this).index();
                var left = e.pageX - imgCell.eq(index1).offset().left;
                var top = e.pageY - imgCell.eq(index1).offset().top;
                $(document).on('mousemove', function(e2) {
                    imgCell.eq(index1).css({
                        'z-index': '40',
                        'left': e2.pageX - left - imgArea.offset().left,
                        'top': e2.pageY - top - imgArea.offset().top
                    })
                }).on('mouseup', function(e3) {
                    var left = e3.pageX - imgArea.offset().left;
                    var top = e3.pageY - imgArea.offset().top;
                    var index2 = changeIndex(left, top, index1);
                    if(index1 === index2) {
                        cellReturn(index1);
                    }else {
                        cellChange(index1, index2);
                    }
                    $(document).off('mousemove').off('mouseup');
                })
            });
        }else {
            $(this).text('开始');
            flag = true;
            cellOrder(originArr);
        }
    })
}

function ranArr() {
    randomArr = [];
    var order;
    var len = originArr.length;
    for(var i = 0; i < len; i++) {
        order = Math.floor(Math.random() * len);
        if(randomArr.length > 0) {
            while($.inArray(order, randomArr) > -1) {
                order = Math.floor(Math.random() * len);
            }
        }
        randomArr.push(order);
    }
}

function cellOrder(arr) {
    var len = arr.length;
    for(var i = 0; i < len; i++) {
        imgCell.eq(i).animate({
            'left': arr[i] % 3 * cellW,
            'top': Math.floor(arr[i] / 3) * cellH
        })
    }
}

function changeIndex(x, y, i) {
    if(x < 0 || x > imgW || y < 0 || y > imgW) {
        return i;
    }
    var row = Math.floor(y / cellW);
    var col = Math.floor(x / cellH);
    var l = row * 3 + col;
    var i = 0, len = randomArr.length;
    while(i < len && randomArr[i] !== l) {
        i++;
    }
    return i;
}

function cellReturn(index) {
    var row = Math.floor(randomArr[index] / 3);
    var col = randomArr[index] % 3;
    imgCell.eq(index).animate({
        'left': cellW * col,
        'top': cellH * row
    }, 400, function() {
        $(this).css('z-index','10');
    });
}

function cellChange(from, to) {
    var fromRow = Math.floor(randomArr[from] / 3);
    var fromCol = randomArr[from] % 3;
    var toRow = Math.floor(randomArr[to] / 3);
    var toCol = randomArr[to] % 3;

    var temp = randomArr[from];

    imgCell.eq(from).animate({
        'left': cellW * toCol,
        'top': cellH * toRow
    },400, function() {
        $(this).css('z-index', '10');
    });
    imgCell.eq(to).animate({
        'left': cellW * fromCol,
        'top': cellH * fromRow
    },400, function() {
        $(this).css('z-index', '10');
        randomArr[from] = randomArr[to];
        randomArr[to] = temp;
        check();
    });
}

function check() {
    if(originArr.toString() === randomArr.toString()) {
        alert('right');
        $('.start').text('开始');
        flag = true;
    }
}