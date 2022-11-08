import { IShader } from "../../interfaces";
//Uniforms: are sent to both vertex shaders and fragment shaders and contain values that stay the same across the entire frame being rendered. A good example of this might be a light's position.
//Attributes: are values that are applied to individual vertices. Attributes are only available to the vertex shader. This could be something like each vertex having a distinct colour. Attributes have a one-to-one relationship with vertices.
//Varyings: are variables declared in the vertex shader that we want to share with the fragment shader. To do this we make sure we declare a varying variable of the same type and name in both the vertex shader and the fragment shader. A classic use of this would be a vertex's normal since this can be used in the lighting calculations.
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