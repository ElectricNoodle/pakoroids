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

    vec2 realCoordOffsR;

    realCoordOffsR.x = ((0.3 * (vTextureCoord.x * vTextureCoord.x) * sin(amplitude)*0.3 - cos(amplitude)*0.13) + 0.14 +  0.7 * vTextureCoord.x);
    realCoordOffsR.y = ((0.3 * (vTextureCoord.y * vTextureCoord.y) * cos(amplitude)*0.3 - sin(amplitude)*0.15) + 0.1 + 0.7 * vTextureCoord.y);

    vec2 realCoordOffsG;

    realCoordOffsG.x = ((0.3 * (vTextureCoord.x * vTextureCoord.x) * sin(amplitude)*0.2 - cos(amplitude)*0.13) + 0.14 +  0.7 * vTextureCoord.x);
    realCoordOffsG.y = ((0.3 * (vTextureCoord.y * vTextureCoord.y) * cos(amplitude)*0.5 - sin(amplitude)*0.15) + 0.1 + 0.7 * vTextureCoord.y);

    vec2 realCoordOffsB;

    realCoordOffsB.x = ((0.3 * (vTextureCoord.x * vTextureCoord.x) * sin(amplitude)*0.1 - cos(amplitude)*0.13) + 0.14 +  0.7 * vTextureCoord.x);
    realCoordOffsB.y = ((0.3 * (vTextureCoord.y * vTextureCoord.y) * cos(amplitude)*0.4 - sin(amplitude)*0.15) + 0.1 + 0.7 * vTextureCoord.y);


    vec4 colorR = texture2D(uSampler, realCoordOffsR);
    vec4 colorG = texture2D(uSampler, realCoordOffsB);
    vec4 colorB = texture2D(uSampler, realCoordOffsG);

    colorR.r = colorR.r * sin(time * 10.0);
    colorR.g = colorG.g * sin((time * 10.0) + 1.57);
    colorR.b = colorB.b * sin((time * 10.0) + 0.7);

    gl_FragColor = colorR;
}
