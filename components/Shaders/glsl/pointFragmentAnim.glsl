attribute float opacity;
void main() {
    vec2 uv = vec2(gl_PointCoord.x, 1. - gl_PointCoord.y);
    gl_FragColor = vec4(1., 1., 1., 1.);
}

void flitch() {
    vec2 p = vUv;
    float xs = floor(gl_FragCoord.x / 0.5);
    float ys = floor(gl_FragCoord.y / 0.5);
s    float disp = texture2D(tDisp, p * seed * seed).r;
    if(p.y < distortion_x + col_s && p.y > distortion_x - col_s * seed) {
        if(seed_x > 0.) {
            p.y = 1. - (p.y + distortion_y);
        } else {
            p.y = distortion_y;
        }
    }
    if(p.x < distortion_y + col_s && p.x > distortion_y - col_s * seed) {
        if(seed_y > 0.) {
            p.x = distortion_x;
        } else {
            p.x = 1. - (p.x + distortion_x);
        }
    }
    p.x += disp * seed_x * (seed / 5.);
    p.y += disp * seed_y * (seed / 5.);
				//base from RGB shift shader
    vec2 offset = amount * vec2(cos(angle), sin(angle));
    vec4 cr = texture2D(tDiffuse, p + offset);
    vec4 cga = texture2D(tDiffuse, p);
    vec4 cb = texture2D(tDiffuse, p - offset);
    gl_FragColor = vec4(cr.r, cga.g, cb.b, cga.a);
				//add noise
    vec4 snow = 200. * amount * vec4(rand(vec2(xs * seed, ys * seed * 50.)) * 0.2);
    gl_FragColor = gl_FragColor + snow;
}