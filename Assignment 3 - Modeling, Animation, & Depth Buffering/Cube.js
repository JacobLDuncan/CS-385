//////////////////////////////////////////////////////////////////////////////
//
//  Cube.js
//
//////////////////////////////////////////////////////////////////////////////


function Cube(gl) {

    var program = initShaders(gl, "Cube-vertex-shader", "Cube-fragment-shader");

    var positions = [
        // --> Insert your vertex positions here
        -0.5, -0.5, -0.5,   // 0
        0.5, -0.5, -0.5,    // 1
        0.5, -0.5, 0.5,     // 2
        -0.5, -0.5, 0.5,    // 3
        -0.5, 0.5, -0.5,    // 4
        0.5, 0.5, -0.5,     // 5
        0.5, 0.5, 0.5,      // 6
        -0.5, 0.5, 0.5      // 7
    ];

    var indices = [
        // --> Insert you index values here
		1, 3, 0,
        1, 2, 3,
        2, 7, 3,
        2, 6, 7,
        6, 4, 7,
        6, 5, 4,
        5, 2, 1,
        5, 6, 2,
        0, 7, 4,
        0, 3, 7,
        5, 0, 4,
        5, 1, 0
    ];
	
	var edges = [
        0, 1,  // "Front" face edges
        1, 2,
        2, 3,
        3, 0,
        4, 5,  // "Back" face edges
        5, 6,
        6, 7,
        7, 4,
        0, 4,  // "Side" edges
        1, 5,
        2, 6,
        3, 7
    ];

    positions.numComponents = 3;

    positions.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW );

    indices.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, indices.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW );
	
	edges.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, edges.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(edges), gl.STATIC_DRAW );

    positions.aPosition = gl.getAttribLocation( program, "aPosition" );
    gl.enableVertexAttribArray( positions.aPosition );
	
	MV = gl.getUniformLocation(program, "MV");
	
	this.MV = mat4();  // mat4() is in MV.js

    this.render = function () {
        gl.useProgram( program );

        gl.bindBuffer( gl.ARRAY_BUFFER, positions.buffer );
        gl.vertexAttribPointer( positions.aPosition, positions.numComponents, gl.FLOAT, false, 0, 0 );
		
		// Render the wireframe version of the cube
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, edges.buffer );
        gl.drawElements( gl.LINES, edges.length, gl.UNSIGNED_SHORT, 0 );
		
		gl.uniformMatrix4fv(MV, false, flatten(this.MV));
 
		// Render the solid version of the cube
        //gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, indices.buffer );
        //gl.drawElements( gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0 );
    }
};