//五子棋核心类
function FiveChess() {
	this.board = new ChessBoard();
	this.chessbox = new ChessBox();
	this.isFinish = false;
	this.isYourTurn = true;
};

//游戏开始
FiveChess.prototype.start = function(first_argument) {
	// body...
};

//判断胜利
FiveChess.prototype.checkwin = function(first_argument) {
	// body...
};

FiveChess.prototype.getTurn = function(){
	return this.isYourTurn;
};

//环境初始化
FiveChess.prototype.init = function(first_argument) {
	this.board.init(this);
	this.chessbox.init(this.board);
};

//输赢判断
FiveChess.prototype.judge = function(x, y, chess) {
	
};
