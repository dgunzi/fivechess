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
	//黑色
	this.createDragSource(board, this.blackchess);
	//白色
	this.createDragSource(board, this.whitechess);
	//初始化盒子
	$('#'+this.whitechess).addClass('disable');
};

//拖动回调
ChessBox.prototype.createDropHandler = function(cell,imgId) {
	return function(graph, evt, target, x, y) {
		var flag = $('#'+imgId).hasClass('disable');
		if(!flag){
			if (target !== null && target.getStyle() === 'location') {
				var cells = graph.importCells([cell], target.getGeometry().x, target.getGeometry().y, target);
				if (cells != null && cells > 0) {
					graph.scrollCellToVisible(cells[0]);
					graph.setSelectionCells(cells);
				}
				$('#chessbox img').removeClass('disable');
				$('#'+imgId).addClass('disable');
			} else {
				mxUtils.alert('目标位置无法落子');
			}
		}else{
			mxUtils.alert('该对方落子，请等候');	
		}
	};
};

//建立拖动源				
ChessBox.prototype.createDragSource = function(board, imgId) {
	var imgUrl = './img/' + imgId + '.png';
	var cell = new mxCell('', new mxGeometry(0, 0, board.gridSize, board.gridSize), 'image;image=' + imgUrl);
	cell.vertex = true;
	var img = document.getElementById(imgId);
	var dragImage = img.cloneNode(true);
	dragImage.style.width = board.gridSize + 'px';
	dragImage.style.height = board.gridSize + 'px';
	mxUtils.makeDraggable(img, board.graph, this.createDropHandler(cell,imgId), dragImage);
};