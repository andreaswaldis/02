var canvas,
    gl,
    aVertexPositionId,
    buffer,
    vertexShader,fragmentShader,shaderProgram,
    VSHADER_SOURCE = "attribute vec2 aVertexPosition;"
        + "varying vec4 vColor;"
        + "void main() {"
        + "     vec4 position = vec4(aVertexPosition, 0.0, 1.0);"
        + "     gl_Position = position;"
        + "}",
    FSHADER_SOURCE = "precision mediump float;"
        + "varying vec4 vColor;"
        + "uniform vec4 uColor;"
        + "void main() {"
        + "     gl_FragColor = uColor;"
        + "}",
    colorLocation,
    vColorLocation
    ;

function startup() {
    canvas = document.getElementById("gameCanvas");
    gl = createGLContext();
    initShaders();
    gl.useProgram(shaderProgram);
    setupAttributes();
    setupBuffer();
    initGL();

    addBuffer([
        -0.2, 0.4, 0.368, 0.819, 1.0, 1.0,
        0.3, 0.4, 0.368, 0.819, 1.0, 1.0,
        -0.2, -0.4, 0.368, 0.819, 1.0, 1.0,
        0.3, -0.4, 0.368, 0.819, 1.0, 1.0,
    ]);

    draw([
        0.368,
        0.819,
        1.0,
        1.0
    ]);

    addBuffer([
        -0.9, 0.6, 0.368, 0.819, 1.0, 0.8,
        -0.6, 0.6, 0.368, 0.819, 1.0, 0.8,
        -0.9, 0.4, 0.368, 0.819, 1.0, 0.8,
        -0.6, 0.4, 0.368, 0.819, 1.0, 0.8,
    ]);

    draw([
        0.608,
        0.102,
        0.314,
        0.8
    ]);
}

function createGLContext() {
    return canvas.getContext("webgl") || alert("Failed to create GL context");
}

function draw(color) {
    gl.uniform4f(colorLocation, color[0], color[1], color[2], color[3]);

    gl.drawArrays(gl.TRIANGLE_STRIP,
        0,
        4
    );

}

function setupAttributes(){
    aVertexPositionId = gl.getAttribLocation(shaderProgram,"aVertexPosition");
    vColorLocation = gl.getAttribLocation(shaderProgram,"vColor");
    colorLocation = gl.getUniformLocation(shaderProgram, "uColor");
}

function setupBuffer(){
    buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
}

function addBuffer(vertices){
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(vertices),
        gl.STATIC_DRAW
    );
}

function initShaders() {
    vertexShader = gl.createShader(gl.VERTEX_SHADER);
    fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    shaderProgram = gl.createProgram();

    gl.shaderSource(vertexShader, VSHADER_SOURCE);
    gl.compileShader(vertexShader);

    gl.shaderSource(fragmentShader, FSHADER_SOURCE);
    gl.compileShader(fragmentShader);

    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        alert("Shader Error: " + gl.getShaderInfoLog(vertexShader));
        return;
    }

    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        alert("Shader Error: " + gl.getShaderInfoLog(fragmentShader));
        return;
    }

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Shader Error: " + gl.getShaderInfoLog(shaderProgram));
        return;
    }
}


function initGL() {
    gl.clearColor(0.608, 0.102, 0.314, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.vertexAttribPointer(
        aVertexPositionId,
        2,
        gl.FLOAT,
        false,
        24, // 6 x Float (4 Byte)
        0
    );

    gl.vertexAttribPointer(
        vColorLocation,
        4,
        gl.FLOAT,
        false,
        24,
        12
    );

    gl.enableVertexAttribArray(aVertexPositionId);

}