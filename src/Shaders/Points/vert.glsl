#include "../Deps/glsl-perlin-noise/perlin.glsl"
#include "../Deps/glsl-voronoi-noise/voronoi3d.glsl"

varying vec2 vUv;

uniform float uProgress;

float PI = 3.141592;

void main() {
  vUv = vec2(1.0 - uv.x, uv.y);
  vec3 modifiedPosition = position;
  float perlinNoise1 = perlinNoise3D(position * 5.0);
  float perlinNoise2 = perlinNoise3D(position * 50.0);
  float segment = fract(uProgress);
  float pingPong = 1.0 - abs(1.0 - 2.0 * segment);
  // modifiedPosition.x += (perlinNoise1 + perlinNoise2) * uProgress * 5.0;
  // modifiedPosition.y += (perlinNoise1 + perlinNoise2) * uProgress * 5.0;
  modifiedPosition.z += (perlinNoise1 + perlinNoise2) * pingPong * 5.0;
  // 1 - Math.abs(1 - 2 * t)
  vec4 modelPosition = modelMatrix * vec4(modifiedPosition, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  float pointSize = 1.0;

  gl_PointSize = pointSize * (1.0 / -viewPosition.z);
  gl_Position = projectedPosition;
}
