uniform vec3 uColor1;
uniform vec3 uColor2;

varying float vAlpha;
varying float vRandom;

void main() {
  // Circular point shape
  float dist = length(gl_PointCoord - vec2(0.5));
  if (dist > 0.5) discard;

  // Soft edge
  float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
  alpha *= vAlpha;

  // Gradient between two accent colors based on random
  vec3 color = mix(uColor1, uColor2, vRandom);

  gl_FragColor = vec4(color, alpha * 0.8);
}
