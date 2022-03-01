//////////////////////////////////////////////////////////////////////////////
//
//  main.js
//
//////////////////////////////////////////////////////////////////////////////

angle = 0;

function init(){
	var canvas = document.getElementById("webgl-canvas");
	gl = canvas.getContext("webgl2");
	
	aspect = canvas.width/canvas.height
	
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clearDepth(1.0);
	gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);
	gl.cullFace(gl.BACK);
	
	cube = new Cube(gl);
	
	// For rendering bunny
	//bunny = new Bunny(gl);
	
	render();
}

function render(){
	gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
	
	angle += 1;
	
	// Cube transformations
	cube.MV = rotate(angle, [1, 1, 1]);  // rotate around the axis (x, y, z)
	cube.P = perspective(90, aspect, 1, 10);  // fovy, aspect, near, far
	cube.V = lookAt(vec3(1, 1, 2), vec3(-1, -1, -1), vec3(1, 1, 1));  // eye, at, up
	
	cube.render();
	
	// For rendering bunny
	//bunny.render();
	
	requestAnimationFrame(render);
}

window.onload = init;