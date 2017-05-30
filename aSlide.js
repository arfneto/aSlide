function aSlide(idTop = "_slide_Top", idBottom = "_slide_Bottom", idCanvas = "_slide_Canvas")
{
	var sourceImage1 = document.getElementById(idTop);
	var sourceImage2 = document.getElementById(idBottom);
	var canvas = document.getElementById(idCanvas);
	var _Width = canvas.width;
	var _Height = canvas.height;
	var _wheelStep = 15; // pixels
	var out = canvas.getContext('2d');
	out.drawImage(sourceImage1,0, 0, _Width, _Height);

	// private canvas
	var backCanvas = document.createElement("canvas");
	backCanvas.setAttribute('width', _Width);
	backCanvas.setAttribute('height', _Height);
	var work = backCanvas.getContext('2d');
	work.drawImage(sourceImage2,0, 0, _Width, _Height);

	var startX = 0;
	var endX = 0;
	var dvdr = 0;
	 
	canvas.addEventListener(
		"click",
		function(e)
		{
			if(e.button === 2)
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
			if((e.button === 0) && (e.type != "whell"))
			{
				startX = e.clientX;
			}
			else
			{
				if(e.button === 2)
				{
					startX = e.clientX;
					nowDivide(startX);
				}
			}
		}
	);


	canvas.addEventListener(
		"wheel",
		function(e)
		{
			(e.deltaY > 0) ? slideOver(_wheelStep)
				: slideOver(-_wheelStep);
		}
	);

	canvas.addEventListener(
		"mouseup",
		function(e)
		{
			if((e.button === 0) && (e.type != "wheel"))
			{
				endX = e.clientX;
				slideOver(endX - startX);
			}
		}
	);

	canvas.addEventListener(
		"mouseenter",
		function(e)
		{
			startX = 0;
			endX = 0;
		}
	);

	function draw()
	{
	  out.drawImage(document.images[0],0, 0, _Width, _Height);
	  work.drawImage(document.images[1],0, 0, _Width, _Height);
	}

	function slideOver(delta)
	{
		delta += dvdr;
		if(delta<=0)
		{
			out.drawImage(document.images[0],0, 0, _Width, _Height);
			dvdr = 0;
		}
		else
		{
			if(delta>=_Width)
			{
				out.drawImage(document.images[1],0, 0, _Width, _Height);
				dvdr = _Width;
			}
			else
			{
				if(dvdr>delta)
				{	// <==
					out.drawImage(document.images[0],0, 0, _Width, _Height); // reset bg
				}
				else
				{	// ==>
				}
				out.drawImage(document.images[0],0, 0, _Width, _Height); // reset bg
				out.save();
				out.translate(delta,0);
				out.drawImage(backCanvas,delta, 0, (_Width - delta), _Height, 0, 0, (_Width - delta), _Height);
				out.restore();
				dvdr = delta;
			}
		}
	}

	function nowDivide(delta)
	{
		if((delta<1) || (delta>299))
		{
			console.log("out of limits. returning");
			return;
		}
		out.drawImage(document.images[0],0, 0, _Width, _Height); // reset bg
		out.save();
		out.translate(delta,0);
		out.drawImage(backCanvas,delta, 0, (_Width - delta), _Height, 0, 0, (_Width - delta), _Height);
		out.restore();
		dvdr = delta;
	}
}	// end function aSlide();