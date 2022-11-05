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

    vec3 light = vec3( 0.5, 0.2, 1.0 );
    light = normalize( light );

    float dProd = dot( vNormal, light ) * 0.5 + 0.5;

    vec4 tcolor = texture2D( colorTexture, vUv );
    vec4 gray = vec4( vec3( tcolor.r * 0.3 + tcolor.g * 0.59 + tcolor.b * 0.11 ), 1.0 );

    gl_FragColor = gray * vec4( vec3( dProd ) * vec3( color ), 1.0 );

  }`,
};
