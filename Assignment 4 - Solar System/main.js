
"use strict";

var gl;
var sun = undefined;
var earth = undefined;
var moon = undefined;
var t = 0.0;

function init() {
    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
   
    // Add your sphere creation and configuration code here
	sun = new Sphere();
	earth = new Sphere();
	moon = new Sphere();
	
	// Radius
	sun.radius = 30;
	earth.radius = 3;
	moon.radius = 1;
	
	// Orbit
	earth.orbit = 10 + 2 * sun.radius;
	moon.orbit = 5 + 2 * earth.radius;
	
	// Color
	sun.color = vec4(1.0, 1.0, 0.0, 1.0);
	earth.color = vec4(0.0, 0.0, 1.0, 1.0);
	moon.color = vec4(0.5, 0.5, 0.5, 1.0);
	
	// Overall Diameter
	var D = 2 * (earth.orbit + moon.orbit + moon.radius);
	
	// Near & Far Parameters
	var near = 8;
	var far = near + D;
	
	// Fovy Parameters
	var theta = (Math.asin((D/2) / (near + (D/2))) * (180/Math.PI));
	var fovy = 2 * theta;
	
	// Aspect Perameters
	var aspect = canvas.clientWidth/canvas.clientHeight;
	
	// Perspective Transformation
	var P = perspective(fovy, aspect, near, far);
	
	sun.P = P;
	earth.P = P;
	moon.P = P;
	
	requestAnimationFrame(render);

	function render() {

		// Update your motion variables here
		const HoursPerDay = 24;
		const HoursPerYear = 365.25 * HoursPerDay;
		t += 1;
		var year = t / 12;
		var day = t / HoursPerYear * 360;
		var hour = t % 360;

		gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
		
		// Add your rendering sequence here
		var ms = new MatrixStack();
		
		// Viewing Transform (from Class 6)
		var V = translate(0.0, 0.0, (-1/2*(near + far)));
		ms.load(V);
		
		// Rendering the Sun (from Class 11)
		ms.push();
		ms.scale(sun.radius);
		sun.MV = ms.current();
		sun.render();
		ms.pop();

		// Rendering the Earth (from Class 11)
		ms.push();
		ms.rotate(year, vec3(0, 0, 1));
		ms.translate(earth.orbit, 0, 0);
		ms.push();
		ms.rotate(day, vec3(0, 0, 1));
		ms.scale(earth.radius);
		earth.MV = ms.current();
		earth.render();
		ms.pop();

		// Rendering the Moon (from Class 11)
		ms.translate(moon.orbit, 0, 0);
		ms.scale(moon.radius);
		moon.MV = ms.current();
		moon.render();
		ms.pop();

		requestAnimationFrame(render);
	}
}


window.onload = init;