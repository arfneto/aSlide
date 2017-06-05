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
	var _Width = canvas.width;
	var _Height = canvas.height;
	var _wheelStep = Math.floor(_Width * 0.02); // pixels

	console.log("slide(2017 arfneto@y7mail.com) image size [" +
		 _Width + "x" + _Height + "] wheel step = " + _wheelStep +
		" Wheel Up goes " + _WheelUp +
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
		if((delta<1) || (delta>_Width))	{ return; }
		out.drawImage(iBottomCanvas,0, 0, _Width, _Height); // reset bg
		out.save();
		out.translate(delta,0);
		out.drawImage(iTopCanvas,delta, 0, (_Width - delta), _Height, 0, 0, (_Width - delta), _Height);
		out.restore();
		dvdr = delta;
	}
}	// end function aSlide();


