precision highp float;
const int kernelSizeDiv2 = 2;
uniform sampler2D image;
uniform sampler2D image2;
uniform vec2 resolution;
uniform float scale;
uniform float centerX;
uniform float centerY;
uniform int operation;

varying vec2 vUv;

vec2 scale_coord(vec2 pt, float scale) {
  mat2 scale_mat = mat2(scale, 0, 0, scale);
  return scale_mat * pt;
}

void main(void) {
  vec2 cellSize = 1.0 / resolution.xy;
  vec2 center = vec2(centerX, centerY);
  vec2 uv = vUv.xy + center;
  vec2 uv2 = vUv.xy;

  uv = scale_coord(uv, scale);

  vec4 textureValue = texture2D(image, uv);
  vec4 textureValue2 = texture2D(image2, uv2);

  if(operation == 0) {
    textureValue += textureValue2;
  } else if (operation == 1) {
    textureValue -= textureValue2;
  } else if (operation == 2) {
    textureValue *= textureValue2;
  } else if (operation == 3) {
    textureValue /= textureValue2;
  }

  gl_FragColor = textureValue;
}
