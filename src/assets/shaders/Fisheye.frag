precision mediump float;
uniform vec2      resolution;
uniform float     time;
varying vec2 vTextureCoord;
varying vec4 vColor;
uniform sampler2D uSampler;


void main( void ) {
    float amplitude = (sin(time/2.0)/ 0.5)+0.5;

    vec2 uv = vTextureCoord.xy / resolution.xy;
    float aspectRatio = resolution.x / resolution.y;
    vec2 center = vec2(0.5, 0.5 / aspectRatio);

    vec2 centToFrag = uv - center;//vector from center to current fragment
    float r = sqrt(dot(centToFrag, centToFrag));

    vec2 realCoordOffs;



    realCoordOffs.x = ((0.3 * (vTextureCoord.x * vTextureCoord.x) * sin(amplitude)*0.3 - cos(amplitude)*0.13) + 0.14 +  0.7 * vTextureCoord.x);
    realCoordOffs.y = ((0.3 * (vTextureCoord.y * vTextureCoord.y) * cos(amplitude)*0.3 - sin(amplitude)*0.15) + 0.1 + 0.7 * vTextureCoord.y);

    vec4 color = texture2D(uSampler, realCoordOffs);
    color[0] = color.r *  sin(time * 10.0);
    color[1] = color.g * cos(time * 10.0);
    color[2] = color.b * sin(time * 10.0);

    gl_FragColor = color;
}
