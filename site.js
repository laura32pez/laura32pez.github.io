document.getElementById("nombreZona").style.display = 'none';
document.getElementById("observaciones").style.display = 'none';
document.getElementById("imagenZona").style.display = 'none';
var canvas = document.getElementById("lienzo");
if (canvas && canvas.getContext) {

	var ctx = canvas.getContext("2d");
	var img = new Image();
	img.src = "https://raw.githubusercontent.com/laura32pez/laura32pez.github.io/master/Oficina.jpg"
	

	img.onload = function () {
		ctx.drawImage(img, 0, 0, img.width, img.height);
		
	}
}

const header = document.querySelector('header');
const section = document.querySelector('section');


const requestURL = 'https://raw.githubusercontent.com/laura32pez/laura32pez.github.io/master/Oficina.json';
const request = new XMLHttpRequest();
request.open('GET', requestURL);

request.responseType = 'json';
request.send();

request.onload = function() {
	const plano = request.response;
	
	if (ctx) {
		var output = document.getElementById("output");

		canvas.addEventListener("mousemove", function (evt) {
			var mousePos = oMousePos(canvas, evt);
			showZonas(plano,mousePos.x, mousePos.y);	
		}, false);

		canvas.addEventListener("mouseout", function(evt) {
			limpiarCoords(output);
		  }, false);

	}
  }

 

  function showZonas(jsonObj,x,y) {
	document.getElementById("nombreZona").style.display = 'none';
	document.getElementById("observaciones").style.display = 'none';
	document.getElementById("imagenZona").style.display = 'none';
    esZona = false;
	const zonas = jsonObj['Zonas'];

	for(let i = 0; i < zonas.length; i++) {
		const x1 = zonas[i].x1;
		const x2 = zonas[i].x2;
		const y1 = zonas[i].y1;
		const y2 = zonas[i].y2;
	    
	  if(x1<=x && x<=x2 && y1<=y && y<=y2){
		var nombre = document.getElementById("nombreZona");
		var observaciones = document.getElementById("observaciones");
		var imagen = document.getElementById("imagenZona");
		nombre.textContent = zonas[i].nombre;
		observaciones.textContent = zonas[i].observaciones;
		imagen.src = zonas[i].imagen;
		document.getElementById("nombreZona").style.display = 'block';
		document.getElementById("observaciones").style.display = 'block';
		document.getElementById("imagenZona").style.display = 'block';
		ctx.globalAlpha = 0.2;
		ctx.fillStyle =  zonas[i].color;
		ctx.fillRect(zonas[i].x3, zonas[i].y3, zonas[i].wi, zonas[i].he);
		esZona = true;
	  }
	  
	}
	if(esZona == false){
		ctx.drawImage(img, 0, 0, img.width, img.height);
	}
  }


function oMousePos(canvas, evt) {
	var ClientRect = canvas.getBoundingClientRect();
	return { //objeto
		x: Math.round(evt.clientX - ClientRect.left),
		y: Math.round(evt.clientY - ClientRect.top)
	}
}



  
  function limpiarCoords(output) {
	output.innerHTML = "";
	output.style.top = 0 + "px";
	output.style.left = 0 + "px";
	output.style.backgroundColor = "transparent"
	output.style.border = "none";
	canvas.style.cursor = "default";
  }

