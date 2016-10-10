function FiveChessData(){
	this.data = [];
	this._EMPTY = 0; //空位
	this._BLACK = 1; //黑棋
	this._WHITE = 2; //白棋
}

FiveChessData.prototype.init = function(boradSize){
	for (var i = 0; i<boradSize; i++) {
		this.data[i] = [];
		for(var j = 0; j<boradSize; j++){
			this.data[i][j] = this._EMPTY;
		}	
	}
};

FiveChessData.prototype.changeData = function(x,y,num){
	this.data[x][y] = num;
};

FiveChessData.prototype.getData = function(x,y){
	return this.data[x][y];
};

FiveChessData.prototype.empty = function() {
	return this._EMPTY;
};

FiveChessData.prototype.black = function() {
	return this._BLACK;
};

FiveChessData.prototype.white = function(){
	return this._WHITE;
};