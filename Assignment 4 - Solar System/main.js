
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
	sun.radius = 12;
	earth.radius = 6;
	moon.radius = 2;
	
	// Oribit
	earth.oribit = 10;
	moon.orbit = 4;
	
	// Color
	sun.color = vec4(1.0, 1.0, 0.0, 1.0);
	earth.color = vec4(0.0, 0.0, 1.0, 1.0);
	moon.color = vec4(0.5, 0.5, 0.5, 1.0);
	
	sun.P = P;
	earth.P = P;
	moon.P = P;

    requestAnimationFrame(render);
}

function render() {

    // Update your motion variables here

    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    
    // Add your rendering sequence here

    requestAnimationFrame(render);
}

window.onload = init;