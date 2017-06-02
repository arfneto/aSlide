(
var tButton = document.getElementById("btnT");
var bButton = document.getElementById("btnB");

tButton.addEventListener(
	"click",
	function()
	{
		console.log("TOP click TOP");
	}
);
 
bButton.addEventListener(
	"click",
	function()
	{
		console.log("BOTTOM click BOTTOM");
	}
);

