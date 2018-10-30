var canvas = document.getElementById("tet");
var context = canvas.getContext('2d');
var Coordinate;
var a = new Array(20);
for (var i = 0; i < 20; i++) {
    a[i] = new Array(10);
}
function isfull() {
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 10; j++) {
            if (a[i][j] === 0) {
                break;
            }
        }
        if (j === 10) {
            clearline(i);
        }
    }
}
function fillline(i) {
    for (var j = i; j > 0; j--) {
        for (var q = 0; q < 10; q++) {
            a[j][q] = a[j - 1][q];
        }
    }
}
function clearline(i) {
    for (var j = 0; j < 10; j++) {
        a[i][j] = 0;
    }
    fillline(i);
}
function getrandom1() {
    return Math.floor(Math.random() * 20);
}
function getrandom2() {
    return Math.floor(Math.random()*10);
}
function getfood() {
    Coordinate = [getrandom1(), getrandom2()];
    while (a[Coordinate[0]][Coordinate[1]]===1) {
        Coordinate = [getrandom1(), getrandom2()];
    }
    a[Coordinate[0]][Coordinate[1]] = 2;
}
function checkfood() {
    if (a[Coordinate[0]][Coordinate[1]] === 1) {
        gg.fill();
    }
}
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "black";  //画布的填充色
    context.fillRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 10; j++) {
            if (a[i][j] === 1) {
                context.fillStyle = "red";  //画布的填充色
                context.fillRect(j * canvas.height / 20, i * canvas.width / 10, canvas.height / 20, canvas.width / 10);
            }
            if (a[i][j] === 2) {
                context.fillStyle = "green";  //画布的填充色
                context.fillRect(j * canvas.height / 20 + canvas.height / 20 / 4, i * canvas.width / 10 + canvas.width / 10/4, canvas.height / 20/2, canvas.width /10/2);
            }
        }
    }
}
class Snake {
    drawsnake() {
        a[this.head[0]][this.head[1]] = 1;
        a[this.body1[0]][this.body1[1]] = 1;
        a[this.body2[0]][this.body2[1]] = 1;
        a[this.tail[0]][this.tail[1]] = 1;
    }
    clearsnake() {
        a[this.head[0]][this.head[1]] = 0;
        a[this.body1[0]][this.body1[1]] = 0;
        a[this.body2[0]][this.body2[1]] = 0;
        a[this.tail[0]][this.tail[1]] = 0;
    }
    newsnake() {
        this.head = [0, 3];
        this.body1 = [0, 2];
        this.body2 = [0, 1];
        this.tail = [0, 0];
        this.Direction = 0;//0向右   1向下  2 向左  3向上 
        this.drawsnake();
    }
    move() {
        this.clearsnake();
        if (this.Direction === 0 && this.checkmove()) {
            this.tail = this.body2;
            this.body2 = this.body1;
            this.body1 = this.head;
            this.head = [this.head[0], this.head[1] + 1];
        }
        if (this.Direction === 1 && this.checkmove()) {
            this.tail = this.body2;
            this.body2 = this.body1;
            this.body1 = this.head;
            this.head = [this.head[0]+1, this.head[1]];
        }
        if (this.Direction === 2 && this.checkmove()) {
            this.tail = this.body2;
            this.body2 = this.body1;
            this.body1 = this.head;
            this.head = [this.head[0], this.head[1] -1];
        }
        if (this.Direction === 3 && this.checkmove()) {
            this.tail = this.body2;
            this.body2 = this.body1;
            this.body1 = this.head;
            this.head = [this.head[0]-1, this.head[1]];
        }
        this.drawsnake();
    }
    fill() {
        this.clearsnake();
        if (this.head[0] < 19 && this.body1[0] < 19 && this.body2[0] < 19 && this.tail[0] < 19 && (a[this.head[0] + 1][this.head[1]] !== 1 || [this.head[0] + 1, this.head[1]] === this.body1 || [this.head[0] + 1, this.head[1]] === this.tail) && (a[this.body1[0] + 1][this.body1[1]] !== 1 || [this.body1[0] + 1, this.body1[1]] === this.body2 || [this.body1[0] + 1, this.body1[1]] === this.head) && (a[this.body2[0] + 1][this.body2[1]] !== 1 || [this.body2[0] + 1, this.body2[1]] === this.tail || [this.body2[0] + 1, this.body2[1]] === this.body1) && (a[this.tail[0] + 1][this.tail[1]] !== 1 || [this.tail[0] + 1, this.tail[1]] === this.head || [this.tail[0] + 1, this.tail[1]] === this.body2)) {
            this.head[0] += 1;
            this.body1[0] += 1;
            this.body2[0] += 1;
            this.tail[0] += 1;
            this.fill();
        }
        else {
            this.drawsnake();
            getfood();
            isfull();
            gg = new Snake();
            gg.newsnake();
            return 0;
        }
    }
    checkmove() {
        switch (this.Direction) { //0向右   1向下  2 向左  3向上 
            case 0: {
                if (this.head[1] < 9 && a[this.head[0]][this.head[1]+1]!==1)
                    return true;
                break;
            }
            case 1: {
                if (this.head[0] < 19&&a[this.head[0]+1][this.head[1]] !== 1)
                    return true;
                break;
            }
            case 2: {
                if (this.head[1] > 0 && a[this.head[0]][this.head[1] - 1] !== 1)
                    return true;
                break;
            }
            case 3: {
                if (this.head[1] > 0 && a[this.head[0]-1][this.head[1]] !== 1)
                    return true;
                break;
            }
        }
        return false;
    }
}
var gg = new Snake();
function newgame() {
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 10; j++) {
            a[i][j] = 0;
        }
    }
    gg.newsnake();
    getfood();
}
function move() {
    gg.move();
    document.getElementById("speed").innerHTML = gg.head + " " + gg.body1 + " " + gg.body2 + " " + gg.tail;
}
newgame();
document.onkeydown = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e) {
        switch (e.keyCode) {
            case 37: {//左方向键
                if (gg.Direction !== 0 && gg.body1[1] !== gg.head[1] - 1) {
                    gg.Direction = 2;
                }
                break;
            }
            case 38: {//上方向键
                if (gg.Direction !== 1 && gg.body1[0] !== gg.head[0] - 1) {
                    gg.Direction = 3;
                }
                break;
            }
            case 39: {//右方向键
                if (gg.Direction !== 2 && gg.body1[1] !== gg.head[1] + 1) {
                    gg.Direction = 0;
                }
                break;
            }
            case 40: {//下方向键
                if (gg.Direction !== 3 && gg.body1[0] !== gg.head[0] + 1) {
                    gg.Direction = 1;
                }
                break;
            }
        }
    }
}
window.setInterval(move, 300);
window.setInterval(draw, 1);
window.setInterval(checkfood, 1);