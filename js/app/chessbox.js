//棋盒
function ChessBox() {
	this.blackchess = 'blackchess';
	this.whitechess = 'whitechess';
	//0 黑子  1 白子
	this.whoisturn = 0;
	this.container = '';
};

//棋盒初始化
ChessBox.prototype.init = function(board) {
	//初始化盒子
	$('#'+this.whitechess).addClass('disable');
};
