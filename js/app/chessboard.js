//棋盘类
function ChessBoard() {
    //图编辑器
    this.editor = new mxEditor();
    //图
    this.graph = null;
    //棋盘大小
    this.boardSize = 19;
    //格子大小
    this.gridSize = 33;
    //起始点
    this.startPoint = new mxPoint(280, 40);
    //9个星
    this.stars = [{x:4,y:4},{x:4,y:10},{x:4,y:16},{x:10,y:4},{x:10,y:10},{x:10,y:16},{x:16,y:4},{x:16,y:10},{x:16,y:16}];
    //星的大小
    this.starWidth = 8;
};

//初始化
ChessBoard.prototype.init = function(graph) {
    if (!mxClient.isBrowserSupported()) {
        mxUtils.error('浏览器不支持maGraph控件!', 200, false);
    } else {
        this.graph = this._createGraph();
        this._loadStyle();
        this._graphConfig();
        this._draw();
    }
};

//游戏图建立
ChessBoard.prototype._createGraph = function() {
    //
    mxGraphHandler.prototype.guidesEnabled = true;
    var container = document.createElement('div');
    container.id = 'graph';
    container.style.position = 'absolute';
    container.style.overflow = 'hidden';
    container.style.left = '0px';
    container.style.top = '0px';
    container.style.right = '0px';
    container.style.bottom = '0px';
    container.style.background = '';

    document.body.appendChild(container);

    if (mxClient.IS_QUIRKS) {
        document.body.style.overflow = 'hidden';
        new mxDivResizer(container);
    }

    var graph = this.editor.graph;
    this.editor.setGraphContainer(container);

    return graph;
};

//载入样式
ChessBoard.prototype._loadStyle = function(){
    var node = mxUtils.load(mxBasePath + '/style/default.xml').getDocumentElement();
    var dec = new mxCodec(node.ownerDocument);
    dec.decode(node, this.graph.getStylesheet());
};

//图的默认配置
ChessBoard.prototype._graphConfig = function(){
    var graph = this.graph;
    //设置不允许节点改变大小
    graph.setCellsResizable(false);
    graph.dropEnabled = true;
    graph.isCellFoldable = function(cell,collapse){
        return false;
    }
   graph.isCellEditable = function(cell) {
        return false;
    };
    graph.isCellCloneable = function(cell) {
        return false;
    };
    graph.dblClick = function(evt, cell) {
        return false;
    };
    graph.isCellMovable = function(cell) {
        return false;
    };
};

//棋盘绘制 采用19*19的标准围棋棋盘
ChessBoard.prototype._draw = function() {
    this.graph.getModel().beginUpdate();
    try {
        this._printPanel();
        this._printPoint();
        this._printLocation();
    } finally {
        this.graph.getModel().endUpdate();
    }
};

//绘制棋盘面板
ChessBoard.prototype._printPanel = function() {
    var graph = this.graph;
    var board = this;
    var panelWidth =  (board.boardSize - 1) * board.gridSize;
    var parent = graph.getDefaultParent();
    //背景
    var background = graph.insertVertex(parent,null,'',this.startPoint.x-this.gridSize,this.startPoint.y-this.gridSize,panelWidth+this.gridSize*2,panelWidth+this.gridSize*2,'boardbg',null);
    for (var i = 0; i < board.boardSize; i++) {
        //横向线
        var rowGeo = new mxGeometry();
        rowGeo.setTerminalPoint(new mxPoint(board.startPoint.x, board.startPoint.y + i * board.gridSize), true);
        rowGeo.setTerminalPoint(new mxPoint(board.startPoint.x + panelWidth, board.startPoint.y + i * board.gridSize), false);
        rowGeo.relative = 1;
        var rowEdge = new mxCell('', rowGeo, 'edgeStyle=none;endArrow=none;');
        rowEdge.edge = 1;
        graph.addEdge(rowEdge, parent, null, null, i);
        //纵向线
        var columnGeo = new mxGeometry();
        columnGeo.setTerminalPoint(new mxPoint(board.startPoint.x + i * board.gridSize, board.startPoint.y), true);
        columnGeo.setTerminalPoint(new mxPoint(board.startPoint.x + i * board.gridSize, board.startPoint.y + panelWidth), false);
        columnGeo.relative = 1;
        var columnEdge = new mxCell('', columnGeo, 'edgeStyle=none;endArrow=none;');
        columnEdge.edge = 1;
        graph.addEdge(columnEdge, parent, null, null, board.boardSize+i);
    };
    //排序
   graph.orderCells(true,[background]);
};

//绘制点
ChessBoard.prototype._printPoint = function() {
    var parent = this.graph.getDefaultParent();
    for (var i = 0; i < this.stars.length; i++) {
        var star = this.graph.insertVertex(parent, null, '', this.startPoint.x + (this.stars[i].x-1) * this.gridSize - this.starWidth / 2, this.startPoint.y + (this.stars[i].y-1) * this.gridSize - this.starWidth / 2, this.starWidth, this.starWidth, 'star', null);
    }
};

//绘制落棋位置
ChessBoard.prototype._printLocation = function() {
    var board = this;
    var parent = this.graph.getDefaultParent();
    for (var i = 0; i < board.boardSize; i++) {
        for (var j = 0; j < board.boardSize; j++) {
            var locationX = board.startPoint.x+i*this.gridSize - board.gridSize/2;
            var locationY = board.startPoint.y+j*this.gridSize - board.gridSize/2;
            var loaction = board.graph.insertVertex(parent,null,'',locationX,locationY,board.gridSize,board.gridSize,'location',null);
        }
    }
};



//棋盘重绘
ChessBoard.prototype.redraw = function() {

};