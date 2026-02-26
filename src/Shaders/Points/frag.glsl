varying vec2 vUv;

uniform sampler2D uTextureVid1F;
uniform sampler2D uTextureVid1E;
uniform sampler2D uTextureVid2F;
uniform sampler2D uTextureVid2E;
uniform sampler2D uTextureVid3F;
uniform sampler2D uTextureVid3E;
uniform float uLuminosity;

uniform float uProgress;

vec4 colorFinder() {
  vec4 finalColor = vec4(1.0, 1.0, 0.0, 1.0);
  vec4 vid1FColor = texture2D(uTextureVid1F, vUv);
  vec4 vid1EColor = texture2D(uTextureVid1E, vUv);
  vec4 vid2FColor = texture2D(uTextureVid2F, vUv);
  vec4 vid2EColor = texture2D(uTextureVid2E, vUv);
  vec4 vid3FColor = texture2D(uTextureVid3F, vUv);
  vec4 vid3EColor = texture2D(uTextureVid3E, vUv);

  if (uProgress >= 0.0 && uProgress < 1.0) {
    finalColor = mix(vid1EColor, vid2FColor, fract(uProgress));
  } else if (uProgress >= 1.0 && uProgress < 2.0) {
    finalColor = mix(vid2EColor, vid3FColor, fract(uProgress));
  } else if (uProgress >= 2.0 && uProgress < 3.0) {
    finalColor = mix(vid3EColor, vid1FColor, fract(uProgress));
  }
  return finalColor;
}

void main() {
  vec4 finalColor = colorFinder();
  if (finalColor.r < 0.1 && finalColor.g < 0.1 && finalColor.b < 0.1)
    discard;

  gl_FragColor = finalColor * uLuminosity;
}
