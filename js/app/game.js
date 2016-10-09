//五子棋核心类
function FiveChess() {
	this.board = new ChessBoard();
	this.chessbox = new ChessBox();
	this.isWell = false;
};

//游戏开始
FiveChess.prototype.start = function(first_argument) {
	// body...
};

//判断胜利
FiveChess.prototype.checkwin = function(first_argument) {
	// body...
};


//环境初始化
FiveChess.prototype.init = function(first_argument) {
	this.board.init();
	this.chessbox.init(this.board);
};

//输赢判断
FiveChess.prototype.judge = function(x, y, chess) {
	var count1 = 0;
	var count2 = 0;
	var count3 = 0;
	var count4 = 0;

	//左右判断
	for (var i = x; i >= 0; i--) {
		if (chessData[i][y] != chess) {
			break;
		}
		count1++;
	}
	for (var i = x + 1; i < 15; i++) {
		if (chessData[i][y] != chess) {
			break;
		}
		count1++;
	}
	//上下判断
	for (var i = y; i >= 0; i--) {
		if (chessData[x][i] != chess) {
			break;
		}
		count2++;
	}
	for (var i = y + 1; i < 15; i++) {
		if (chessData[x][i] != chess) {
			break;
		}
		count2++;
	}
	//左上右下判断
	for (var i = x, j = y; i >= 0, j >= 0; i--, j--) {
		if (chessData[i][j] != chess) {
			break;
		}
		count3++;
	}
	for (var i = x + 1, j = y + 1; i < 15, j < 15; i++, j++) {
		if (chessData[i][j] != chess) {
			break;
		}
		count3++;
	}
	//右上左下判断
	for (var i = x, j = y; i >= 0, j < 15; i--, j++) {
		if (chessData[i][j] != chess) {
			break;
		}
		count4++;
	}
	for (var i = x + 1, j = y - 1; i < 15, j >= 0; i++, j--) {
		if (chessData[i][j] != chess) {
			break;
		}
		count4++;
	}

	if (count1 >= 5 || count2 >= 5 || count3 >= 5 || count4 >= 5) {
		if (chess == 1) {
			alert("白棋赢了");
		} else {
			alert("黑棋赢了");
		}
		this.isWell = true; //设置该局棋盘已经赢了，不可以再走了
	}
};
