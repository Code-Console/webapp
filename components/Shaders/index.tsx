import { IShader } from "../../interfaces";
//Uniforms: are sent to both vertex shaders and fragment shaders and contain values that stay the same across the entire frame being rendered. A good example of this might be a light's position.
//Attributes: are values that are applied to individual vertices. Attributes are only available to the vertex shader. This could be something like each vertex having a distinct colour. Attributes have a one-to-one relationship with vertices.
//Varyings: are variables declared in the vertex shader that we want to share with the fragment shader. To do this we make sure we declare a varying variable of the same type and name in both the vertex shader and the fragment shader. A classic use of this would be a vertex's normal since this can be used in the lighting calculations.
const noise = `
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  vec4 fade(vec4 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}
  float cnoise(vec4 P, vec4 rep){
    vec4 Pi0 = mod(floor(P), rep); // Integer part modulo rep
    vec4 Pi1 = mod(Pi0 + 1.0, rep); // Integer part + 1 mod rep
    vec4 Pf0 = fract(P); // Fractional part for interpolation
    vec4 Pf1 = Pf0 - 1.0; // Fractional part - 1.0
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = vec4(Pi0.zzzz);
    vec4 iz1 = vec4(Pi1.zzzz);
    vec4 iw0 = vec4(Pi0.wwww);
    vec4 iw1 = vec4(Pi1.wwww);

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);
    vec4 ixy00 = permute(ixy0 + iw0);
    vec4 ixy01 = permute(ixy0 + iw1);
    vec4 ixy10 = permute(ixy1 + iw0);
    vec4 ixy11 = permute(ixy1 + iw1);

    vec4 gx00 = ixy00 / 7.0;
    vec4 gy00 = floor(gx00) / 7.0;
    vec4 gz00 = floor(gy00) / 6.0;
    gx00 = fract(gx00) - 0.5;
    gy00 = fract(gy00) - 0.5;
    gz00 = fract(gz00) - 0.5;
    vec4 gw00 = vec4(0.75) - abs(gx00) - abs(gy00) - abs(gz00);
    vec4 sw00 = step(gw00, vec4(0.0));
    gx00 -= sw00 * (step(0.0, gx00) - 0.5);
    gy00 -= sw00 * (step(0.0, gy00) - 0.5);

    vec4 gx01 = ixy01 / 7.0;
    vec4 gy01 = floor(gx01) / 7.0;
    vec4 gz01 = floor(gy01) / 6.0;
    gx01 = fract(gx01) - 0.5;
    gy01 = fract(gy01) - 0.5;
    gz01 = fract(gz01) - 0.5;
    vec4 gw01 = vec4(0.75) - abs(gx01) - abs(gy01) - abs(gz01);
    vec4 sw01 = step(gw01, vec4(0.0));
    gx01 -= sw01 * (step(0.0, gx01) - 0.5);
    gy01 -= sw01 * (step(0.0, gy01) - 0.5);

    vec4 gx10 = ixy10 / 7.0;
    vec4 gy10 = floor(gx10) / 7.0;
    vec4 gz10 = floor(gy10) / 6.0;
    gx10 = fract(gx10) - 0.5;
    gy10 = fract(gy10) - 0.5;
    gz10 = fract(gz10) - 0.5;
    vec4 gw10 = vec4(0.75) - abs(gx10) - abs(gy10) - abs(gz10);
    vec4 sw10 = step(gw10, vec4(0.0));
    gx10 -= sw10 * (step(0.0, gx10) - 0.5);
    gy10 -= sw10 * (step(0.0, gy10) - 0.5);

    vec4 gx11 = ixy11 / 7.0;
    vec4 gy11 = floor(gx11) / 7.0;
    vec4 gz11 = floor(gy11) / 6.0;
    gx11 = fract(gx11) - 0.5;
    gy11 = fract(gy11) - 0.5;
    gz11 = fract(gz11) - 0.5;
    vec4 gw11 = vec4(0.75) - abs(gx11) - abs(gy11) - abs(gz11);
    vec4 sw11 = step(gw11, vec4(0.0));
    gx11 -= sw11 * (step(0.0, gx11) - 0.5);
    gy11 -= sw11 * (step(0.0, gy11) - 0.5);

    vec4 g0000 = vec4(gx00.x,gy00.x,gz00.x,gw00.x);
    vec4 g1000 = vec4(gx00.y,gy00.y,gz00.y,gw00.y);
    vec4 g0100 = vec4(gx00.z,gy00.z,gz00.z,gw00.z);
    vec4 g1100 = vec4(gx00.w,gy00.w,gz00.w,gw00.w);
    vec4 g0010 = vec4(gx10.x,gy10.x,gz10.x,gw10.x);
    vec4 g1010 = vec4(gx10.y,gy10.y,gz10.y,gw10.y);
    vec4 g0110 = vec4(gx10.z,gy10.z,gz10.z,gw10.z);
    vec4 g1110 = vec4(gx10.w,gy10.w,gz10.w,gw10.w);
    vec4 g0001 = vec4(gx01.x,gy01.x,gz01.x,gw01.x);
    vec4 g1001 = vec4(gx01.y,gy01.y,gz01.y,gw01.y);
    vec4 g0101 = vec4(gx01.z,gy01.z,gz01.z,gw01.z);
    vec4 g1101 = vec4(gx01.w,gy01.w,gz01.w,gw01.w);
    vec4 g0011 = vec4(gx11.x,gy11.x,gz11.x,gw11.x);
    vec4 g1011 = vec4(gx11.y,gy11.y,gz11.y,gw11.y);
    vec4 g0111 = vec4(gx11.z,gy11.z,gz11.z,gw11.z);
    vec4 g1111 = vec4(gx11.w,gy11.w,gz11.w,gw11.w);

    vec4 norm00 = taylorInvSqrt(vec4(dot(g0000, g0000), dot(g0100, g0100), dot(g1000, g1000), dot(g1100, g1100)));
    g0000 *= norm00.x;
    g0100 *= norm00.y;
    g1000 *= norm00.z;
    g1100 *= norm00.w;

    vec4 norm01 = taylorInvSqrt(vec4(dot(g0001, g0001), dot(g0101, g0101), dot(g1001, g1001), dot(g1101, g1101)));
    g0001 *= norm01.x;
    g0101 *= norm01.y;
    g1001 *= norm01.z;
    g1101 *= norm01.w;

    vec4 norm10 = taylorInvSqrt(vec4(dot(g0010, g0010), dot(g0110, g0110), dot(g1010, g1010), dot(g1110, g1110)));
    g0010 *= norm10.x;
    g0110 *= norm10.y;
    g1010 *= norm10.z;
    g1110 *= norm10.w;

    vec4 norm11 = taylorInvSqrt(vec4(dot(g0011, g0011), dot(g0111, g0111), dot(g1011, g1011), dot(g1111, g1111)));
    g0011 *= norm11.x;
    g0111 *= norm11.y;
    g1011 *= norm11.z;
    g1111 *= norm11.w;

    float n0000 = dot(g0000, Pf0);
    float n1000 = dot(g1000, vec4(Pf1.x, Pf0.yzw));
    float n0100 = dot(g0100, vec4(Pf0.x, Pf1.y, Pf0.zw));
    float n1100 = dot(g1100, vec4(Pf1.xy, Pf0.zw));
    float n0010 = dot(g0010, vec4(Pf0.xy, Pf1.z, Pf0.w));
    float n1010 = dot(g1010, vec4(Pf1.x, Pf0.y, Pf1.z, Pf0.w));
    float n0110 = dot(g0110, vec4(Pf0.x, Pf1.yz, Pf0.w));
    float n1110 = dot(g1110, vec4(Pf1.xyz, Pf0.w));
    float n0001 = dot(g0001, vec4(Pf0.xyz, Pf1.w));
    float n1001 = dot(g1001, vec4(Pf1.x, Pf0.yz, Pf1.w));
    float n0101 = dot(g0101, vec4(Pf0.x, Pf1.y, Pf0.z, Pf1.w));
    float n1101 = dot(g1101, vec4(Pf1.xy, Pf0.z, Pf1.w));
    float n0011 = dot(g0011, vec4(Pf0.xy, Pf1.zw));
    float n1011 = dot(g1011, vec4(Pf1.x, Pf0.y, Pf1.zw));
    float n0111 = dot(g0111, vec4(Pf0.x, Pf1.yzw));
    float n1111 = dot(g1111, Pf1);

    vec4 fade_xyzw = fade(Pf0);
    vec4 n_0w = mix(vec4(n0000, n1000, n0100, n1100), vec4(n0001, n1001, n0101, n1101), fade_xyzw.w);
    vec4 n_1w = mix(vec4(n0010, n1010, n0110, n1110), vec4(n0011, n1011, n0111, n1111), fade_xyzw.w);
    vec4 n_zw = mix(n_0w, n_1w, fade_xyzw.z);
    vec2 n_yzw = mix(n_zw.xy, n_zw.zw, fade_xyzw.y);
    float n_xyzw = mix(n_yzw.x, n_yzw.y, fade_xyzw.x);
    return 2.2 * n_xyzw;
  }`;

export const basicShader: IShader = {
  vertex: `
      void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }`,
  fragment: `
      void main() {
          gl_FragColor = vec4(1.0,0.0,1.0,1.0);
      }`,
};
export const fakeLightShader: IShader = {
  vertex: `
    varying vec3 vNormal;
    void main() {
        vNormal = normal;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }`,
  fragment: `
    varying vec3 vNormal;
    void main() {
      vec3 light = vec3(0.5, 0.2, 1.0);
      light = normalize(light);
      float dProd = max(0.0,dot(vNormal, light));
        gl_FragColor = vec4(dProd*.5,dProd*.75,dProd*1.0,1.0);
    }`,
};
export const displacementPositionShader: IShader = {
  vertex: `
  uniform float amplitude;

  attribute float displacement;

  varying vec3 vNormal;
  varying vec2 vUv;

  void main() {

    vNormal = normal;
    vUv = ( 0.5 + amplitude ) * uv + vec2( amplitude );

    vec3 newPosition = position + amplitude * normal * vec3( displacement );
    gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );

  }`,
  fragment: `
  varying vec3 vNormal;
  varying vec2 vUv;

  uniform vec3 color;
  uniform sampler2D colorTexture;

  void main() {

    vec3 light = vec3( 0.5, 1.0, 1.0 );
    light = normalize( light );

    float dProd = dot( vNormal, light ) * 0.5 + 0.5;

    vec4 tcolor = texture2D( colorTexture, vUv );
    vec4 gray = vec4( vec3( tcolor.r * 0.3 + tcolor.g * 0.59 + tcolor.b * 0.11 ), 1.0 );

    gl_FragColor = gray * vec4( vec3( dProd ) * vec3( color ), 1.0 );

  }`,
};

export const troyShader: IShader = {
  vertex: `varying vec2 vUv; void main(){ vUv = uv ; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);}`,
  fragment: `
    #include <common>
    #define TIMESCALE 0.25 
    #define TILES 16
    #define COLOR 0.7, 1.6, 2.8

    uniform vec3 iResolution;
    uniform float iTime;
    uniform sampler2D iChannel0;


    void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
      vec2 uv = fragCoord.xy / iResolution.xy;
      uv.x *= iResolution.x / iResolution.y;
      
      vec4 noise = texture2D(iChannel0, floor(uv * float(TILES)) / float(TILES));
      float p = 1.0 - mod(noise.r + noise.g + noise.b + iTime * float(TIMESCALE), 1.0);
      p = min(max(p * 3.0 - 1.8, 0.1), 2.0);
      
      vec2 r = mod(uv * float(TILES), 1.0);
      r = vec2(pow(r.x - 0.5, 2.0), pow(r.y - 0.5, 2.0));
      p *= 1.0 - pow(min(1.0, 12.0 * dot(r, r)), 2.0);
      
      fragColor = vec4(COLOR, 1.0) * p;
    }

    varying vec2 vUv;

    void main() {
      mainImage(gl_FragColor, vUv * iResolution.xy);
    }
  `,
};
export const randomShader: IShader = {
  vertex: `
  varying vec3 vNormal;
  void main() {
      vNormal = normal;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }`,
  fragment: `
    #ifdef GL_ES
      precision mediump float;
    #endif
    uniform vec2 u_resolution;
    uniform float u_time;
    #define PI 3.14159265358979323846
    varying vec3 vNormal;
    vec2 rotate2D(vec2 _st, float _angle){
        _st -= 0.5;
        _st =  mat2(cos(_angle),-sin(_angle),
                    sin(_angle),cos(_angle)) * _st;
        _st += 0.5;
        return _st;
    }

    vec2 tile(vec2 _st, float _zoom){
        _st *= _zoom;
        return fract(_st);
    }

    float box(vec2 _st, vec2 _size, float _smoothEdges){
        _size = vec2(0.5)-_size*0.5;
        vec2 aa = vec2(_smoothEdges*0.5);
        vec2 uv = smoothstep(_size,_size+aa,_st);
        uv *= smoothstep(_size,_size+aa,vec2(1.0)-_st);
        return uv.x*uv.y;
    }
    float circle(in vec2 _st, in float _radius){
      vec2 l = _st-vec2(0.5);
      return 1.-smoothstep(_radius-(_radius*0.01),
                           _radius+(_radius*0.01),
                           dot(l,l)*4.0);
  }
    void main() {
      vec2 st = gl_FragCoord.xy/u_resolution.xy;
      vec2 st2 = gl_FragCoord.xy/u_resolution.xy;
      vec3 color = vec3(0.,0.,0.5);
      vec3 light = vec3( 0.5, 0.5, 0.5 );
      light = normalize( light );
      // Divide the space in 4
      st = tile(st,4.);

      // Use a matrix to rotate the space 45 degrees
      st = rotate2D(st,PI*0.25);

      // Draw a square
      float time = abs(sin(u_time));
      color = vec3(box(st,vec2(0.7),time));
      st2 *= 3.0;      // Scale up the space by 3
      st2 = fract(st2); // Wrap around 1.
      float dProd = dot( vNormal, light ) * 0.5 + 0.5;
      vec3 stmul = vec3(st2,time) * dProd;
      gl_FragColor = vec4(stmul,1.0);
    }`,
};

export const pointShader: IShader = {
  vertex: ` 
    attribute vec3 aPosition;
    uniform float uPointSize;
    varying float vStrokeWeight;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    void main()
    {
        vec4 positionVec4 = vec4(aPosition, 1.0);
        gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
        gl_PointSize = uPointSize;
        vStrokeWeight = uPointSize;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }`,
  fragment: ` 
    precision mediump float;
    precision mediump int;
    uniform vec4 uMaterialColor;
    varying float vStrokeWeight;
    void main() {
        float mask = 0.0;

        // make a circular mask using the gl_PointCoord (goes from 0 - 1 on a point)
        // might be able to get a nicer edge on big strokeweights with smoothstep but slightly less performant

        mask = step(0.98, length(gl_PointCoord * 2.0 - 1.0));

        // if strokeWeight is 1 or less lets just draw a square
        // this prevents weird artifacting from carving circles when our points are really small
        // if strokeWeight is larger than 1, we just use it as is

        mask = mix(0.0, mask, clamp(floor(vStrokeWeight - 0.5), 0.0, 1.0));

        // throw away the borders of the mask
        // otherwise we get weird alpha blending issues

        if (mask > 0.98) {
            discard;
        }
        gl_FragColor = vec4(uMaterialColor.rgb * (1.0 - mask), uMaterialColor.a);
    }`,
};

export const blueGlowShader: IShader = {
  vertex: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    }`,
  fragment: `
    uniform vec3 iResolution;
    uniform float iTime;
    uniform sampler2D iChannel0;
    uniform sampler2D iChannel1;
    uniform sampler2D iChannel2;
    float mat = 0.0;
    float ss = 0.5;
    varying vec2 vUv;
   
    
    vec3 palette(float d){
      return mix(vec3(0.2,0.7,0.9),vec3(1.,0.,1.),d);
    }
    
    vec2 rotate(vec2 p,float a){
      float c = cos(a);
        float s = sin(a);
        return p*mat2(c,s,-s,c);
    }
    
    float map(vec3 p){
        for( int i = 0; i<8; ++i){
            float t = iTime*0.2;
            p.xz =rotate(p.xz,t);
            p.xy =rotate(p.xy,t*1.89);
            p.xz = abs(p.xz);
            p.xz-=.5;
      }
      return dot(sign(p),p)/5.;
    }
    
    vec4 rm (vec3 ro, vec3 rd){
        float t = 0.;
        vec3 col = vec3(0.);
        float d;
        for(float i =0.; i<64.; i++){
        vec3 p = ro + rd*t;
            d = map(p)*.5;
            if(d<0.02){
                break;
            }
            if(d>100.){
              break;
            }
            //col+=vec3(0.6,0.8,0.8)/(400.*(d));
            col+=palette(length(p)*.1)/(400.*(d));
            t+=d;
        }
        return vec4(col,1./(d*100.));
    }
    void mainImage( out vec4 fragColor, in vec2 fragCoord )
    {
        vec2 uv = (fragCoord-(iResolution.xy/2.))/iResolution.x;
      vec3 ro = vec3(0.,0.,-50.);
        ro.xz = rotate(ro.xz,iTime);
        vec3 cf = normalize(-ro);
        vec3 cs = normalize(cross(cf,vec3(0.,1.,0.)));
        vec3 cu = normalize(cross(cf,cs));
        
        vec3 uuv = ro+cf*3. + uv.x*cs + uv.y*cu;
        
        vec3 rd = normalize(uuv-ro);
        
        vec4 col = rm(ro,rd);
        
        
        fragColor = col;
    }
  
    void main() {
      mainImage(gl_FragColor, vec2(gl_FragCoord.x-512.,gl_FragCoord.y));
    }`,
};
export const galaxyShader: IShader = {
  vertex: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`,
  fragment: `
    uniform vec4      iMouse; 
    uniform vec3 iResolution;
    uniform float iTime;
    float mat = 0.0;
    float ss = 0.1;
    varying vec2 vUv;
    
    // By Jared Berghold 2022 (https://www.jaredberghold.com/)
// Based on the "Simplicity Galaxy" shader by CBS (https://www.shadertoy.com/view/MslGWN) 
// The nebula effect is based on the kaliset fractal (https://softologyblog.wordpress.com/2011/05/04/kalisets-and-hybrid-ducks/)

const int MAX_ITER = 8;

float field(vec3 p, float s, int iter)
{
	float accum = s / 4.0;
	float prev = 0.0;
	float tw = 0.0;
	for (int i = 0; i < MAX_ITER; ++i) 
  	{
		if (i >= iter) // drop from the loop if the number of iterations has been completed - workaround for GLSL loop index limitation
		{
			break;
		}
		float mag = dot(p, p);
		p = abs(p) / mag + vec3(-0.5, -0.4, -1.487);
		float w = exp(-float(i) / 5.0);
		accum += w * exp(-9.025 * pow(abs(mag - prev), 2.2));
		tw += w;
		prev = mag;
	}
	return max(0.0, 5.2 * accum / tw - 0.65);
}

vec3 nrand3(vec2 co)
{
	vec3 a = fract(cos(co.x*8.3e-3 + co.y) * vec3(1.3e5, 4.7e5, 2.9e5));
	vec3 b = fract(sin(co.x*0.3e-3 + co.y) * vec3(8.1e5, 1.0e5, 0.1e5));
	vec3 c = mix(a, b, 0.5);
	return c;
}

vec4 starLayer(vec2 p, float time)
{
	vec2 seed = 1.9 * p.xy;
	seed = floor(seed * max(iResolution.x, 600.0) / 1.5);
	vec3 rnd = nrand3(seed);
	vec4 col = vec4(pow(rnd.y, 17.0));
	float mul = 10.0 * rnd.x;
	col.xyz *= sin(time * mul + mul) * 0.25 + 1.0;
	return col;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    float time = iTime / (iResolution.x / 1000.0);
	
    // first layer of the kaliset fractal
	vec2 uv = 2.0 * fragCoord / iResolution.xy - 1.0;
  	vec2 uvs = uv * iResolution.xy / max(iResolution.x, iResolution.y);
	vec3 p = vec3(uvs / 2.5, 0.0) + vec3(0.8, -1.3, 0.0);
	p += 0.45 * vec3(sin(time / 32.0), sin(time / 24.0), sin(time / 64.0));
	
	// adjust first layer position based on mouse movement
	p.x += mix(-0.02, 0.02, (iMouse.x / iResolution.x));
	p.y += mix(-0.02, 0.02, (iMouse.y / iResolution.y));
	
	// float freqs[4];
	// freqs[0] = 0.45;
	// freqs[1] = 0.4;
	// freqs[2] = 0.15;
	// freqs[3] = 0.9;

	// float t = field(p, freqs[2], 13);
	// float v = (1.0 - exp((abs(uv.x) - 1.0) * 6.0)) * (1.0 - exp((abs(uv.y) - 1.0) * 6.0));
	
    // second layer of the kaliset fractal
	vec3 p2 = vec3(uvs / (4.0 + sin(time * 0.11) * 0.2 + 0.2 + sin(time * 0.15) * 0.3 + 0.4), 4.0) + vec3(2.0, -1.3, -1.0);
	p2 += 0.16 * vec3(sin(time / 32.0), sin(time / 24.0), sin(time / 64.0));
	
	// adjust second layer position based on mouse movement
	p2.x += mix(-0.01, 0.01, (iMouse.x / iResolution.x));
	p2.y += mix(-0.01, 0.01, (iMouse.y / iResolution.y));
	//float t2 = field(p2, freqs[3], 18);
	//vec4 c2 = mix(0.5, 0.2, v) * vec4(5.5 * t2 * t2 * t2, 2.1 * t2 * t2, 2.2 * t2 * freqs[0], t2);
	
	// add stars (source: https://glslsandbox.com/e#6904.0)
	vec4 starColour = vec4(0.0);
	starColour += starLayer(p.xy, time); // add first layer of stars
	starColour += starLayer(p2.xy, time); // add second layer of stars

	const float brightness = 0.50;
	// vec4 colour = mix(freqs[3] - 0.3, 1.0, v) * vec4(1.5 * freqs[2] * t * t * t, 1.2 * freqs[1] * t * t, freqs[3] * t, 1.0) + c2 + starColour;
	fragColor = vec4(brightness * starColour.xyz, 1.0);
}

    void main() {
      gl_FragColor = vec4(1.,1.,1.,1.);
      mainImage(gl_FragColor, gl_FragCoord.xy);
    }`,
};

export const lineShader: IShader = {
  vertex: `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }`,
  fragment: `
    #define iterations 17
    #define formuparam 0.53

    #define volsteps 20
    #define stepsize 0.1

    #define zoom   0.800
    #define tile   0.850
    #define speed  0.010 

    #define brightness 0.0015
    #define darkmatter 0.300
    #define distfading 0.530
    #define saturation 0.850

    uniform vec3 iResolution;
    uniform float iTime;
    uniform sampler2D iChannel0;
    uniform sampler2D iChannel1;
    uniform sampler2D iChannel2;
    float mat = 0.0;
    float ss = 0.5;
    varying vec2 vUv;
    uniform vec4      iMouse; 
    void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
      //get coords and direction
      vec2 uv=fragCoord.xy/iResolution.xy-.5;
      uv.y*=iResolution.y/iResolution.x;
      vec3 dir=vec3(uv*zoom,1.);
      float time=iTime*speed+.25;

      //mouse rotation
      float a1=.5+iMouse.x/iResolution.x*2.;
      float a2=.8+iMouse.y/iResolution.y*2.;
      mat2 rot1=mat2(cos(a1),sin(a1),-sin(a1),cos(a1));
      mat2 rot2=mat2(cos(a2),sin(a2),-sin(a2),cos(a2));
      dir.xz*=rot1;
      dir.xy*=rot2;
      vec3 from=vec3(1.,.5,0.5);
      from+=vec3(time*2.,time,-2.);
      from.xz*=rot1;
      from.xy*=rot2;
      
      //volumetric rendering
      float s=0.1,fade=1.;
      vec3 v=vec3(0.);
      for (int r=0; r<volsteps; r++) {
        vec3 p=from+s*dir*.5;
        p = abs(vec3(tile)-mod(p,vec3(tile*2.))); // tiling fold
        float pa,a=pa=0.;
        for (int i=0; i<iterations; i++) { 
          p=abs(p)/dot(p,p)-formuparam; // the magic formula
          a+=abs(length(p)-pa); // absolute sum of average change
          pa=length(p);
        }
        float dm=max(0.,darkmatter-a*a*.001); //dark matter
        a*=a*a; // add contrast
        if (r>6) fade*=1.-dm; // dark matter, don't render near
        //v+=vec3(dm,dm*.5,0.);
        v+=fade;
        v+=vec3(s,s*s,s*s*s*s)*a*brightness*fade; // coloring based on distance
        fade*=distfading; // distance fading
        s+=stepsize;
      }
      v=mix(vec3(length(v)),v,saturation); //color adjust
      fragColor = vec4(v*.01,1.);	
      
    }
    void main() {
      gl_FragColor = vec4(1.,1.,1.,1.);
      mainImage(gl_FragColor, gl_FragCoord.xy);
    }`,
};

export const pointShaderAnim: IShader = {
  vertex: `
  varying vec2 vUv;
  varying float vOpacity;
  attribute float opacity;
  void main() {
    vUv = uv;
    vOpacity = opacity;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.);
    gl_PointSize = 100. * (1. / -mvPosition.z);
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }`,
  fragment: `
    varying float vOpacity;
    varying vec2 vUv;
    void main() {
      vec2 uv = vec2(gl_PointCoord.x, 1. - gl_PointCoord.y); 
      vec2 cUv = 2.*uv - 1.;
      float dist = length(cUv);
      vec3 originalColor = vec3(4./255.,10./255.,20./255.); 
      vec4 color = vec4(.08/dist);
      color.rgb = min(vec3(10.),color.rgb);
      color.rgb *= originalColor*120.;
      color *=vOpacity;
      gl_FragColor = vec4(1. - dist,0.,0.,1.)*vOpacity;
      gl_FragColor = vec4(color.rgba) ;
    }`,
};

export const basicMultiShader: IShader = {
  vertex: `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }`,
  fragment: `
    varying vec2 vUv;
    uniform float u_time;
    void main() {
        vec2 colb = vec2(sin(u_time*.1),cos(u_time*.1));
        
        gl_FragColor = vec4(vUv.x,colb,1.0);
    }`,
};
export const moveTexShader: IShader = {
  vertex: `
  uniform vec2 uvScale;
  varying vec2 vUv;
  void main(){
    vUv = uvScale * uv;
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_Position = projectionMatrix * mvPosition;
  }`,
  fragment: `
    varying vec2 vUv;
    void main( void ) {
      gl_FragColor = vec4(vUv.rg,1.,.4);
    }`,
};

export const glowShader: IShader = {
  vertex: `
    varying vec2 vUv;
    void main()  {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }`,
  fragment: `
  varying vec2 vUv;
  uniform sampler2D colorTexture;
  uniform float noise;
    void main(){
      vec2 uv = vUv;
      uv.y = 1.0 - uv.y;
      vec2 offset = vec2(sin(noise*.01)*00.05, 0.0);
      vec3 col;
      col.r = texture2D(colorTexture, vUv + offset).r;
      col.g = texture2D(colorTexture, vUv).g;
      col.b = texture2D(colorTexture, vUv - offset).b;
      vec2 cUv = 2.*uv - 1.;
      vec3 tx = vec3(cUv,1.);
      vec3 coll = vec3(vUv,1.);
      vec3 smth = vec3(uv,0.5);

      vec3 final = smoothstep(tx, coll, smth);
      gl_FragColor = vec4(final,1.);
    }`,
};
export const glitchShader: IShader = {
  vertex: `
		varying vec2 vUv;
		varying vec3 vNormal;
    varying vec3 vPosition;
    float amplitude = 5.;
    float rand(vec2 co){
			return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
		}
		void main() {
			vUv = uv;
      vNormal = normal;
      vPosition = position;
			// gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      vUv = ( 0.5 + amplitude ) * uv + vec2( amplitude );
      vec3 newPosition = position + amplitude * normal * vec3( 1. );
      gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
		}`,
  fragment: `
		uniform float seed;
    uniform float amount;
		varying vec2 vUv;
    varying vec3 vNormal;
    uniform float u_time;
    varying vec3 vPosition;
    #define PI 3.14159265358979323846
		float rand(vec2 co){
			return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
		}
    float noise(vec2 p){
      vec2 ip = floor(p);
      vec2 u = fract(p);
      u = u*u*(3.0-2.0*u);
      
      float res = mix(
        mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
        mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
      return res*res;
    }
		void main() {
        vec2 st = gl_FragCoord.xy/vec2(1024.,800.);
        float randVal = rand(vec2(cos(seed),seed));
				float xs = floor(gl_FragCoord.x / 0.5);
				float ys = floor(gl_FragCoord.y / 0.5);
				vec4 snow = 200.*amount*vec4(noise(vec2(xs * seed,ys * seed*50.))*0.2);
        float phi = acos(st.x);
        float angle = atan(st.x, st.y);
        vec2 newFakeUV = vec2((angle + PI) / (2. * PI), phi / PI);
        vec2 fakeUV = vec2(dot(vec3(sin(seed)), vec3(1.,st)), dot(vec3(-1., randVal, randVal), vec3(0.5,st)));
        fakeUV = fract(fakeUV + vec2(u_time / 40., u_time / 20.));
        fakeUV*=newFakeUV;
        gl_FragColor = vec4(mix(snow.xyz, vec3(1.0,fakeUV), 5.),1.); 
		}`,
};

export const gradientShader: IShader = {
  vertex: `
		varying vec2 vUv;
    varying vec3 vNormal;
		void main() {
			vUv = uv;
      vNormal = normal;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,
  fragment: `
    uniform float u_time;
    uniform sampler2D sky;
    varying vec2 vUv;
    varying vec3 vNormal;
    float PI = 3.14;
    ${noise}
    void main() {
        float diff = dot(vec3(1.), vNormal);
        float phi = acos(vNormal.x);
        float angle = atan(vNormal.x, vNormal.z);
        float fresnel = abs(dot(cameraPosition, vNormal));
        fresnel = fresnel * fresnel * fresnel;
        vec2 newFakeUV = vec2((angle + PI) / (2. * PI), phi / PI);
        vec2 fakeUV = vec2(dot(vec3(1), vNormal), dot(vec3(-1., 0., 1.), vNormal));
        fakeUV = fract(fakeUV + vec2(u_time / 40., u_time / 20.));
        vec4 txt = texture2D(sky, newFakeUV + 0.1 * cnoise(vec4(fakeUV * 5., u_time / 10., 0.), vec4(5.)));
        vec4 tcolor = texture2D( sky, fakeUV   );
        gl_FragColor = vec4(mix(vec3(1.), txt.rgb, 2.), 1.);

        
    }`,
};

export const selectShader: IShader = {
  vertex: `
    varying vec3 vNormal;
    varying vec2 vUv;
    void main() {
      vNormal = normal;
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }`,
  fragment: `
    varying vec3 vNormal;
    varying vec2 vUv;
    uniform float u_time;
    uniform vec2 u_uv;
    float diff = .07;
    uniform sampler2D u_texture;
    ${noise}
    void main() {
      float no = cnoise(vec4(vUv * 10., u_time * .01, 0.), vec4(10.));
      vec4 color = texture2D(u_texture, u_uv + 1.0 * no)*.9;
      if(u_uv.x > vUv.x-diff && u_uv.x < vUv.x+diff && u_uv.y > vUv.y-diff && u_uv.y < vUv.y+diff){
        discard;
      }
      gl_FragColor = color;
    }`,
};

export const globeShader: IShader = {
  vertex: `
    varying vec3 vNormal;
    varying vec2 vUv;
    void main() {
      vNormal = normal;
      vUv = uv;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.);
      gl_PointSize = 4. * (1. / -mvPosition.z);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }`,
  fragment: `
    varying vec3 vNormal;
    varying vec2 vUv;
    uniform float u_time;
    uniform vec2 u_uv;
    uniform sampler2D u_texture;
    float diff = .03;
    ${noise}
    void main() {
      float no = cnoise(vec4(vUv * 10., u_time / 10., 0.), vec4(5.));
      vec4 color = vec4(vNormal.x,vNormal.y,1.,1);
      color = texture2D( u_texture, vUv );
      if(color.x < .5){
        color = vec4(44./255.,100./255.,155./255.,1);
      }else{
        discard;
      }
      gl_FragColor = color;
    }`,
};
export const globeCurveShader: IShader = {
  vertex: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }`,
  fragment: `
    varying vec2 vUv;
    uniform float u_time;
    uniform vec2 u_clr;
    void main() {
      float inc = abs(sin(u_time*.01)); //
      if(vUv.x > inc && u_time < 150.){
        discard;
      }
      inc = abs(sin((u_time-230.)*.01));
      if(vUv.x < inc && u_time > 230.){
        discard;
      }
      gl_FragColor = vec4(u_clr.x,vUv.x,u_clr.y,1.0);
    }`,
};

export const WaterShader: IShader = {
  vertex: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    }`,
  fragment: `
    uniform vec3 iResolution;
    uniform float iTime;
    uniform sampler2D iChannel0;
    uniform sampler2D iChannel1;
    uniform sampler2D iChannel2;
    float mat = 0.0;
    float ss = 0.5;
    varying vec2 vUv;
   
    float bias(float x, float b) {
      return  x/((1./b-2.)*(1.-x)+1.);
    }

    float gain(float x, float g) {
      float t = (1./g-2.)*(1.-(2.*x));	
      return x<0.5 ? (x/(t+1.)) : (t-x)/(t-1.);
    }

    vec3 degamma(vec3 c)
    {
      return pow(c,vec3(2.2));
    }
    vec3 gamma(vec3 c)
    {
      return pow(c,vec3(1./1.6));
    }

    #define pi 3.1415927
    vec4 rgbaNoise(vec2 fragCoord) {
	    vec2 uv = fragCoord.xy;
      uv -= floor(uv / 289.0) * 289.0;
      uv += vec2(223.35734, 550.56781);
      uv *= uv;
      
      float xy = uv.x * uv.y;
      
      return vec4(fract(xy * 0.00000012),
                      fract(xy * 0.00000543),
                      fract(xy * 0.00000192),
                      fract(xy * 0.00000423));
    }
    void mainImage( out vec4 fragColor, in vec2 fragCoord )
    {
      vec2 uv = fragCoord.xy / iResolution.xy;
      uv.y=1.-uv.y;
      uv.x *= iResolution.x / iResolution.y;
      uv = vUv;
      float h = 0.;

    #if 1
      float time = iTime*.01;
    #else
      //go forwards and backwards!	
      float time = mod(iTime,30.);
      if (time > 15.) time = 30.-time;
    #endif

    
    time = iTime*.001;
      

    #define DIVS	8
      
      for (int iy=0; iy<DIVS; iy++)
      {
        for (int ix=0; ix<DIVS*2; ix++)
        {
          //random variations for droplet
          vec4 t = texture2D(iChannel1,(4./256.)*vec2(float(ix),float(iy)),-10.);
          
          
          //stratify droplet positions
          vec2 p = vec2(ix,iy)*(1./float(DIVS-1));
          p += (0.75/float(DIVS-1))*(t.xy*2.-1.);
            
          //radius
          vec2 v = uv-p;
          float d = dot(v,v);
          d = pow(d,.7);
          float life = 10.;
          
          float n = time*5.*(t.w+0.2) - t.z*6.;
          n *= 0.1+ t.w;
          n = mod(n,life+t.z*3.+10.);				//repeat, plus a pause
          float x = d*99.;
          float T = x<(2.*pi*n) ? 1. : 0.;	//clip to 0 after end
          float e = max(1. - (n/life),0.);		//entirely fade out by now
          float F = e*x/(2.*pi*n);				//leading edge stronger and decay
          
          float s = sin(x-(2.*pi*n)-pi*0.5);
                  
          s = s*0.5+0.5;		//bias needs [0,1]
          s = bias(s,.6);	//shape the ripple profile
          
          
          s = (F*s)/(x+1.1)*T;			

          h+=s*100.*(0.5+t.w);			

        }
      }

      
      vec3 n = vec3(dFdx(h),17.,dFdy(h));		
      n = normalize(n);
      
      vec3 E = normalize(vec3(-uv.y*2.-1.,1.,uv.x*2.-1.));	//fake up an eye vector
      vec3 rv = reflect(-E,n);
      
      vec4 tcolor = texture2D( iChannel2, rv.xy );
      vec3 reflect_color = degamma(tcolor.xyz);

      vec3 fn = refract(vec3(0,1,0),n,2.5);
      uv += fn.xz*0.1;
      
      float lod = length(fn.xz)*10.;
      
      vec3 c = vec3(0.);
      vec4 tcolor2 = texture2D( iChannel0, uv );
      c += degamma(tcolor2.xyz);
      c *= 1.-h*0.0125;
      c += reflect_color*.3;
      
    //	fragColor = vec4(h*0.5+0.5);
    //	fragColor = vec4(n*0.5+0.5,1.);
      vec3 L = normalize(vec3(1,1,1));
      float dl = max(dot(n,L),0.)*.7+.3;
      c *= dl;
    //	fragColor = vec4(vec3(dl),1.);
      
      c = gamma(c);
      fragColor = vec4(vec3(c),1.);
      // fragColor = vec4(vec3(dl),1.);
    }
      
    
    void main() {
      mainImage(gl_FragColor, vUv * iResolution.xy);
      //mainImage(gl_FragColor, vec2(gl_FragCoord.x-512.,gl_FragCoord.y));
      //gl_FragColor = vec4(1.0,0.0,1.0,1.0);
    }`,
};
export const rippleShader: IShader = {
  vertex: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    }`,
  fragment: `
    uniform vec3 iResolution;
    uniform float iTime;
    uniform sampler2D iChannel0;
    uniform sampler2D iChannel1;
    uniform sampler2D iChannel2;
    float mat = 0.0;
    float ss = 0.5;
    varying vec2 vUv;
   
    
float rotSpeed = 0.05;

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord.xy / iResolution.xy;
    
    vec4 buff = texture2D(iChannel0, uv)*2.0-1.0;
    float z = sqrt(1.0 - clamp(dot(vec2(buff.x,buff.y), vec2(buff.x,buff.y)),0.0, 1.0));
    vec3 n = normalize(vec3(buff.x, buff.y, z));
    
    vec3 lightDir = vec3(sin(iTime*rotSpeed),cos(iTime*rotSpeed),0.0);
    
    float l = max(0.0, dot(n, lightDir));
    float fresnel = 1.0 - dot(vec3(0.0,0.0,1.0), n);
    vec4 refl = texture2D(iChannel2, reflect(n, lightDir).xy);
    
    vec4 tex = texture2D(iChannel1, vec2(uv.x*(iResolution.x/iResolution.y), uv.y) + n.xy);
    
    fragColor = tex*0.5 + vec4((fresnel + l)*5.0)*refl + refl*0.5;
}
      
    
    void main() {
      mainImage(gl_FragColor, vUv * iResolution.xy);
      //mainImage(gl_FragColor, vec2(gl_FragCoord.x-512.,gl_FragCoord.y));
      //gl_FragColor = vec4(1.0,0.0,1.0,1.0);
    }`,
};
export const mapShader: IShader = {
  vertex: `
    varying vec3 vNormal;
    varying vec2 vUv;
    void main() {
      vUv = uv;
        vNormal = normal;
        gl_PointSize = 4.;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }`,
  fragment: `
    varying vec3 vNormal;
    uniform sampler2D u_texture;
    varying vec2 vUv;
    void main() {
      vec3 light = vec3(0.5, 0.2, 1.0);
      light = normalize(light);
      float dProd = max(0.0,dot(vNormal, light));
      vec4 color = texture2D( u_texture, vUv );
      if(color.x < .5){
        color = vec4(44./255.,100./255.,155./255.,1);
      }else{
        discard;
      }
      gl_FragColor = color;//vec4(dProd*.5,dProd*.75,dProd*1.0,1.0);
    }`,
};
export const rippleShader2: IShader = {
  vertex: `
    varying vec2 vUv;
    void main() {
      vUv = uv * 4.;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    }`,
  fragment: `
    uniform float iTime;
    uniform sampler2D iChannel0;
    uniform sampler2D iChannel1;
    uniform sampler2D iChannel2;
    float mat = 0.0;
    float ss = 0.5;
    varying vec2 vUv;
    float rotSpeed = 0.05;
    ${noise}
    void mainImage0( out vec4 fragColor, in vec2 fragCoord ){
      vec2 uv = fragCoord;
      vec4 buff2 = texture2D(iChannel0, uv)*2.0-1.0;
      vec4 buff = vec4(cnoise(vec4(uv * 5., iTime / 10., 0.), vec4(5.)));
      float z = sqrt(1.0 - clamp(dot(vec2(buff.x,buff.y), vec2(buff.x,buff.y)),0.0, 1.0));
      vec3 n = normalize(vec3(buff.x, buff.y, z));
      vec3 lightDir = vec3(sin(iTime*rotSpeed),cos(iTime*rotSpeed),0.0);
      float l = max(0.0, dot(n, lightDir));
      float fresnel = 1.0 - dot(vec3(0.0,0.0,1.0), n);
      vec4 refl = texture2D(iChannel2, reflect(n, lightDir).xy);
      vec4 tex = texture2D(iChannel1, vec2(uv.x, uv.y) + n.xy);
      fragColor = tex*0.5 + vec4((fresnel + l)*5.0)*refl + refl*0.5;
      fragColor = mix(buff,buff2,.5);
    }
    void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
      vec2 uv = fragCoord;
      vec2 warpUV = 2. * uv;
      float d = length( warpUV );
	    vec2 st = warpUV*0.1 + 0.2*vec2(cos(0.041*iTime*2.+d),sin(0.053*iTime*2.-d));
      
      vec3 warpedCol = vec3(cnoise(vec4(uv * 5., iTime / 10., 0.), vec4(5.))) * 2.0;
      float w = max( warpedCol.r, 0.85);
	
      vec2 offset = 0.01 * cos( warpedCol.rg * 3.14159 );
      vec3 col = texture( iChannel1, uv + offset ).rgb * vec3(0.8, 0.8, 1.5) ;
	    col *= w*1.2;
      

      vec4 displacement = texture2D( iChannel2, vUv);
      float theta = displacement.r*2.*3.14;
      vec2 dir = vec2(sin(theta),cos(theta));
      vec2 uv2 = vUv+dir*displacement.r;
      vec4 back = texture( iChannel1, uv2 + offset ); 
	    fragColor = vec4( mix(col, back.rgb*.7, 0.9),  1.);
      
      
    }
    void main() {
      mainImage(gl_FragColor, vUv );
      // vec4 back = texture( iChannel2, vUv);
      // gl_FragColor = back; 
    }`,
};