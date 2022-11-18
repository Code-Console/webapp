attribute float opacity;
void main() {
    vec2 uv = vec2(gl_PointCoord.x, 1. - gl_PointCoord.y);
    gl_FragColor = vec4(1., 1., 1., 1.);
}