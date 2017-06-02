//
//
//

function aSlide(
	idTop 		= "_slide_Top", 
	idBottom 	= "_slide_Bottom", 
	idCanvas 	= "_slide_Canvas",
	Options		= "RL")
{
	var sourceImage1 	= document.getElementById(idTop);
	var sourceImage2 	= document.getElementById(idBottom);
	var canvas 			= document.getElementById(idCanvas);
	var _WheelUp		= ((Options[0] === "R")||(Options[0] === "r")) ? "Right" : "Left";
	var _DivideNow		= ((Options[1] === "R")||(Options[0] === "r")) ? 2 : 0;

	if(sourceImage1 === null)
	{
		console.log(
			"slide(): could not access image with id '" +
			idTop + "'. Aborting"
		);
		return;
	}

	if(sourceImage2 === null)
	{
		console.log(
			"slide(): could not access image with id '" +
			idBottom + "'. Aborting"
		);
		return;
	}

	if(canvas === null)
	{
		console.log(
			"slide(): could not access canvas with id '" +
			idCanvas + "'. Aborting"
		);
		return;
	}

	console.log("source image ok " + sourceImage1);
	console.log("aSlide()");;
	console.log("img 1" + sourceImage1 + "size: (" + sourceImage1.width + "," + sourceImage1.height + "]");
	console.log("img 2" + sourceImage2 + "size: (" + sourceImage2.width + "," + sourceImage2.height + "]");
	console.log("screen canvas "        + "size: (" + canvas.width + "," + canvas.height + "]");

	var _Width = canvas.width;
	var _Height = canvas.height;
	var _wheelStep = Math.floor(_Width * 0.02); // pixels

	console.log("working image size [" +
		 _Width + "x" + _Height + "] step = " + _wheelStep +
		" Whell Up goes " + _WheelUp +
		" Divide Screen with mouse button " + _DivideNow 
	);

	var out = canvas.getContext('2d');

	// private canvas top and bottom
	var iTopCanvas = document.createElement("canvas");
	iTopCanvas.setAttribute('width', _Width);
	iTopCanvas.setAttribute('height', _Height);
	var workTop = iTopCanvas.getContext('2d');
	workTop.drawImage(sourceImage1,0, 0, _Width, _Height);

	var iBottomCanvas = document.createElement("canvas");
	iBottomCanvas.setAttribute('width', _Width);
	iBottomCanvas.setAttribute('height', _Height);
	var workBottom = iBottomCanvas.getContext('2d');
	workBottom.drawImage(sourceImage2,0, 0, _Width, _Height);

	console.log("top internal canvas "           + "size: (" + iTopCanvas.width + "," + iTopCanvas.height + "]");
	console.log("bottom internal canvas "        + "size: (" + iBottomCanvas.width + "," + iBottomCanvas.height + "]");

	// draw top image on screen
	out.drawImage(iTopCanvas,0, 0, _Width, _Height);

	var startX = 0;
	var endX = 0;
	var dvdr = 0;
	 
	canvas.addEventListener(
		"click",
		function(e)
		{
			if(e.button === _DivideNow)
			{
				startX = e.clientX;
				nowDivide(startX);
			}
		}
	);

	canvas.addEventListener(
		"mousedown",
		function(e)
		{
			startX = e.clientX;
			console.log("mouse down");
		}
	);

	canvas.addEventListener(
		"wheel",
		function(e)
		{
			if(_WheelUp === "Right")
			{
				(e.deltaY > 0) ? slideOver(-_wheelStep) : slideOver(_wheelStep);
			}
			else
			{
				(e.deltaY > 0) ? slideOver(_wheelStep) : slideOver(-_wheelStep);
			}	// end if
		}	//	end function()
	);

	canvas.addEventListener(
		"mouseup",
		function(e)
		{
			console.log("mouse up");
			//console.log(e);
			endX = e.clientX;
			if(e.type === "wheel"){ return };
			(e.button === _DivideNow) ? nowDivide(endX) : slideOver(endX - startX);
		}	// end fucntion()
	);

	canvas.addEventListener(
		"mouseenter",
		function(e)
		{
			startX = 0;
			endX = 0;
		}
	);

	function slideOver(delta)
	{
		//
		// drawImage(image, dx, dy, dw, dh)
		// drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
		//
		console.log("slide over: delta " + delta + " divider at " + dvdr );
		delta += dvdr;
		if(delta<=0)
		{
			out.drawImage(iTopCanvas,0, 0, _Width, _Height);
			dvdr = 0;
		}
		else
		{
			if(delta>=_Width)
			{
				out.drawImage(iBottomCanvas,0, 0, _Width, _Height);
				dvdr = _Width;
			}
			else
			{
				dvdr = delta;
				nowDivide(dvdr);
			}	// end if
		}	// end if
	}	// end function()

	function nowDivide(delta)
	{
		if((delta<1) || (delta>_Width))
		{
			console.log("out of limits (" + 1 + "..." + _Width + "). Delta=[" + delta + "] returning");
			return;
		}
		console.log("divide at " + delta);
		out.drawImage(iBottomCanvas,0, 0, _Width, _Height); // reset bg
		out.save();
		out.translate(delta,0);
		out.drawImage(iTopCanvas,delta, 0, (_Width - delta), _Height, 0, 0, (_Width - delta), _Height);
		out.restore();
		dvdr = delta;
	}
}	// end function aSlide();


