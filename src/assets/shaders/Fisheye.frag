precision mediump float;
uniform vec2      resolution;
uniform float     time;
varying vec2 vTextureCoord;
varying vec4 vColor;
uniform sampler2D uSampler;


void main( void ) {
    vec2 uv = vTextureCoord.xy / resolution.xy;
    float aspectRatio = resolution.x / resolution.y;
    vec2 center = vec2(0.5, 0.5 / aspectRatio);

    vec2 centToFrag = uv - center;//vector from center to current fragment
    float r = sqrt(dot(centToFrag, centToFrag));
        
    vec2 realCoordOffs;



    realCoordOffs.x = (-4.0 * (vTextureCoord.x * vTextureCoord.x)) +  4.0 * vTextureCoord.x;
    realCoordOffs.y = (-4.0 * (vTextureCoord.y * vTextureCoord.y)) +  4.0 * vTextureCoord.y;
        
    vec4 color = texture2D(uSampler, realCoordOffs);   
    
    gl_FragColor = color;
}

