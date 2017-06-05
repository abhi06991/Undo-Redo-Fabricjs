	
  
var canvasDemo = (function(){
  var _canvasObject = new fabric.Canvas('canvas',{backgroundColor : "#f5deb3"});
	var _config = {
		canvasState             : [],
		currentStateIndex       : -1,
		undoStatus              : false,
		redoStatus              : false,
		undoFinishedStatus      : 1,
		redoFinishedStatus      : 1,
    undoButton              : document.getElementById('undo'),
		redoButton              : document.getElementById('redo'),
	};
	_canvasObject.on(
		'object:modified', function(){
	  		updateCanvasState();
		}
	);
  
  _canvasObject.on(
		'object:added', function(){
	  		updateCanvasState();
		}
	);
  
  var addObject = function(){
     var rect = new fabric.Rect({
			left   : 100,
			top    : 100,
			fill   : 'red',
			width  : 200,
			height : 200
    });
		_canvasObject.add(rect);
		_canvasObject.setActiveObject(rect);
    _canvasObject.renderAll();
  }

	var updateCanvasState = function() {
		if((_config.undoStatus == false && _config.redoStatus == false)){
			var jsonData        = _canvasObject.toJSON();
			var canvasAsJson        = JSON.stringify(jsonData);
			if(_config.currentStateIndex < _config.canvasState.length-1){
				var indexToBeInserted                  = _config.currentStateIndex+1;
				_config.canvasState[indexToBeInserted] = canvasAsJson;
				var numberOfElementsToRetain           = indexToBeInserted+1;
				_config.canvasState                    = _config.canvasState.splice(0,numberOfElementsToRetain);
			}else{
	    	_config.canvasState.push(canvasAsJson);
			}
	    _config.currentStateIndex = _config.canvasState.length-1;
      if((_config.currentStateIndex == _config.canvasState.length-1) && _config.currentStateIndex != -1){
        _config.redoButton.disabled= "disabled";
      }
		}
	}

 
	var undo = function() {
		if(_config.undoFinishedStatus){
			if(_config.currentStateIndex == -1){
	    	_config.undoStatus = false;
			}
			else{
		    if (_config.canvasState.length >= 1) {
        	_config.undoFinishedStatus = 0;
		      if(_config.currentStateIndex != 0){
			    	_config.undoStatus = true;
			      _canvasObject.loadFromJSON(_config.canvasState[_config.currentStateIndex-1],function(){
								var jsonData = JSON.parse(_config.canvasState[_config.currentStateIndex-1]);
					    	_canvasObject.renderAll();
			      		_config.undoStatus = false;
			      		_config.currentStateIndex -= 1;
								_config.undoButton.removeAttribute("disabled");
								if(_config.currentStateIndex !== _config.canvasState.length-1){
									_config.redoButton.removeAttribute('disabled');
								}
							_config.undoFinishedStatus = 1;
		      	});
		      }
		      else if(_config.currentStateIndex == 0){
 		      	_canvasObject.clear();
						_config.undoFinishedStatus = 1;
						_config.undoButton.disabled= "disabled";
						_config.redoButton.removeAttribute('disabled');
		      	_config.currentStateIndex -= 1;
		      }
		    }
			}
		}
	}
  
	var redo = function() {
		if(_config.redoFinishedStatus){
			if((_config.currentStateIndex == _config.canvasState.length-1) && _config.currentStateIndex != -1){
				_config.redoButton.disabled= "disabled";
			}else{
		  	if (_config.canvasState.length > _config.currentStateIndex && _config.canvasState.length != 0){
					_config.redoFinishedStatus = 0;
		    	_config.redoStatus = true;
		      _canvasObject.loadFromJSON(_config.canvasState[_config.currentStateIndex+1],function(){
							var jsonData = JSON.parse(_config.canvasState[_config.currentStateIndex+1]);
				    	_canvasObject.renderAll();
			    		_config.redoStatus = false;
		      		_config.currentStateIndex += 1;
							if(_config.currentStateIndex != -1){
								_config.undoButton.removeAttribute('disabled');
							}
						_config.redoFinishedStatus = 1;
            if((_config.currentStateIndex == _config.canvasState.length-1) && _config.currentStateIndex != -1){
              _config.redoButton.disabled= "disabled";
            }
		      });
		    }
			}
		}
	}
  
    
 	return {
		addObject  : addObject,
		undoButton : _config.undoButton,
		redoButton : _config.redoButton,
		undo       : undo,
		redo       : redo,
  }


  })();


  
  canvasDemo.undoButton.addEventListener('click',function(){
		canvasDemo.undo();
	});

	canvasDemo.redoButton.addEventListener('click',function(){
		canvasDemo.redo();
	});
  canvasDemo.addObject();
