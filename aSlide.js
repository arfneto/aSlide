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
	var	nowMoving = false;
	var	overCanvas = false;

	// console.log("slide('17 arfneto@y7mail.com) image [" +
	// 	 _Width + "x" + _Height + "]");
	// console.log(
	// 	"  Wheel: Step = " + _wheelStep +
	// 	" Up: " + _WheelUp +
	// 	" " + _DivideNow  + " button divide screen" 
	// );

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

	var dvdr = 0;
	
	window.addEventListener(
		"keyup",
		function(e)
		{
			if(!overCanvas){ return };
			if(e.key === "Home")
			{
				out.drawImage(iTopCanvas,0, 0, _Width, _Height);
				dvdr = 0;
				return;
			}
			if(e.key === "End")
			{
				out.drawImage(iBottomCanvas,0, 0, _Width, _Height);
				dvdr = _Width;
				return;
			}
			if(e.key === "ArrowLeft")
			{
				slideOver(-_wheelStep)
				return;
			}
			if(e.key === "ArrowRight")
			{
				slideOver(_wheelStep)				
				return;
			}
			if((e.key === "ArrowUp")||(e.key === "ArrowDown"))
			{
				nowDivide(Math.floor(_Width / 2));				
				return;
			}

		}
	);

	canvas.addEventListener(
		"click",
		function(e)
		{
			if(e.button === _DivideNow)
			{
				nowDivide(e.clientX);
			}
		}
	);

	canvas.addEventListener(
		"mousemove",
		function(e)
		{
			if(nowMoving)
			{
				nowDivide(e.clientX);
			}
		}
	);

	canvas.addEventListener(
		"mousedown",
		function(e)
		{
			nowDivide(e.clientX);
			nowMoving = true;
		}
	);

	canvas.addEventListener(
		"wheel",
		function(e)
		{
			e.preventDefault();
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
			nowMoving = false;
			if(e.type === "wheel"){ return };
			if(e.button === _DivideNow){ nowDivide(e.clientX) }
		}	// end fucntion()
	);

	canvas.addEventListener(
		"mouseenter",
		function(e)
		{
			overCanvas = true;
		}	// end fucntion()
	);

	canvas.addEventListener(
		"mouseleave",
		function(e)
		{
			overCanvas = false;
		}	// end fucntion()
	);

//
// =======================================================================
//

	function dropLine(canvas, context,posX)
	{
		// code
		var h = canvas.height;
		context.fillStyle = "rgb(255,0,0)";
		context.fillRect(posX, 0, 1, h);
	}	// end function()

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


