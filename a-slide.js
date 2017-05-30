function aSlide(idTop = "xizang", idBottom = "cama", idCanvas = "myCanvas");
{
	var sourceImage1 = document.getElementById('xizang');
	var sourceImage2 = document.getElementById('cama');

	console.log("idTop: " + idTop);
	if(!idTop)
	{
		console.log("idTop undefined");
	}
	console.log("sourceImage3 " + sourceImage3);

	var canvas = document.getElementById("myCanvas");
	canvas.setAttribute('width', 300);
	canvas.setAttribute('height', 200);
	var out = canvas.getContext('2d');
	out.drawImage(document.images[0],0, 0, 300, 200);


	var backCanvas = document.createElement("canvas");
	backCanvas.setAttribute('width', 300);
	backCanvas.setAttribute('height', 200);
	var work = backCanvas.getContext('2d');
	work.drawImage(document.images[1],0, 0, 300, 200);

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
			if(e.deltaY > 0)
			{
				slideOver(30);
			}
			else
			{
				slideOver(-30);
			}
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
	  out.drawImage(document.images[0],0, 0, 300, 200);
	  work.drawImage(document.images[1],0, 0, 300, 200);
	}

	function slideOver(delta)
	{
		delta += dvdr;
		if(delta<=0)
		{
			out.drawImage(document.images[0],0, 0, 300, 200);
			dvdr = 0;
		}
		else
		{
			if(delta>=300)
			{
				out.drawImage(document.images[1],0, 0, 300, 200);
				dvdr = 300;
			}
			else
			{
				if(dvdr>delta)
				{	// <==
					out.drawImage(document.images[0],0, 0, 300, 200); // reset bg
				}
				else
				{	// ==>
				}
				out.drawImage(document.images[0],0, 0, 300, 200); // reset bg
				out.save();
				out.translate(delta,0);
				out.drawImage(backCanvas,delta, 0, (300 - delta), 200, 0, 0, (300 - delta), 200);
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
		out.drawImage(document.images[0],0, 0, 300, 200); // reset bg
		out.save();
		out.translate(delta,0);
		out.drawImage(backCanvas,delta, 0, (300 - delta), 200, 0, 0, (300 - delta), 200);
		out.restore();
		dvdr = delta;
	}
}	// end function aSlide();