let drawBoard = {
    canvas: document.getElementById('canvas'),
    ctx: canvas.getContext('2d'),
    btnContainer: document.getElementsByTagName('ul')[0],
    colorBtn: document.getElementById('colorBoard'),
    lineRuler: document.getElementById('lineRuler'),
    imgsArr: [],
    isdraw: false,
    init: function () {
        this.ctx.lineCap = 'round'; //线条起始和结尾样式
        this.ctx.lineJoin = 'round'; //转弯
        this.drawing();
        this.btnsAllFn()
    },
    drawing: function () {
        let self = this,
            canvas = this.canvas,
            c_left = canvas.offsetLeft,
            c_top = canvas.offsetTop;


        canvas.onmousedown = function (e) {
            self.isdraw = true;

            let c_x = e.pageX - c_left,
                c_y = e.pageY - c_top;

            self.ctx.beginPath();
            self.ctx.moveTo(c_x, c_y);

            let img = self.ctx.getImageData(0, 0, canvas.offsetWidth, canvas.offsetHeight);
            self.imgsArr.push(img);
            console.log(self.imgsArr);
        }

        canvas.onmousemove = function (e) {
            if (self.isdraw) {
                self.ctx.lineTo(e.pageX - c_left, e.pageY - c_top);
                self.ctx.stroke();
            }
        }

        canvas.onmouseup = function (e) {
            if(self.isdraw){
                self.ctx.closePath();
                self.isdraw = false;
            }
        }

        canvas.onmouseleave = function (e) {
            if(self.isdraw){
                self.ctx.closePath();
                self.isdraw = false;
            }
        }
    },
    btnsAllFn: function () {
        let self = this;
        self.btnContainer.onclick = function (e) {
            switch (e.target.id) {
                case 'clean':
                    self.canvas.clearRect(0, 0, self.canvas.offsetWidth, self.canvas.offsetHeight);
                    break;
                case 'erase':
                    self.ctx.strokeStyle = '#ffffff';
                    break;
                case 'back':
                    if (self.imgsArr.length > 0) {
                        self.ctx.putImageData(self.imgsArr.pop(), 0, 0);
                    }
                    break;
                default:
                    break;
            }
        };

        self.colorBtn.onchange = function () {
            self.ctx.strokeStyle = this.value;
            console.log(this.value);
        };

        self.lineRuler.onchange = function () {
            self.ctx.lineWidth = this.value;
            console.log(this.value);
        };
    }
}

drawBoard.init();