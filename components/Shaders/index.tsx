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
