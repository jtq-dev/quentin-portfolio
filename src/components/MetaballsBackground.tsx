import * as THREE from "three";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";

/**
 * 1) Create the material class
 */
const MetaMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0.5, 0.5),
    uRes: new THREE.Vector2(1, 1),
    uMode: 0, // 0=dark, 1=light
  },
  // vertex
  /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  `,
  // fragment
  /* glsl */ `
    precision highp float;
    varying vec2 vUv;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uRes;
    uniform float uMode;

    float hash(vec2 p){
      p = fract(p*vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x*p.y);
    }

    float softField(vec2 p, vec2 c, float r){
      float d = length(p - c);
      return (r*r) / max(d*d, 0.0008);
    }

    vec3 hsv2rgb(vec3 c){
      vec4 K = vec4(1., 2./3., 1./3., 3.);
      vec3 p = abs(fract(c.xxx + K.xyz) * 6. - K.www);
      return c.z * mix(K.xxx, clamp(p - K.xxx, 0., 1.), c.y);
    }

    void main(){
      vec2 uv = vUv;
      vec2 p = (uv - 0.5);
      p.x *= uRes.x / uRes.y;

      float t = uTime;

      vec2 c1 = vec2(sin(t*0.18)*0.55, cos(t*0.15)*0.35);
      vec2 c2 = vec2(cos(t*0.14)*0.55, sin(t*0.19)*0.40);
      vec2 c3 = vec2(sin(t*0.11+1.7)*0.60, cos(t*0.16+2.2)*0.38);
      vec2 c4 = vec2(cos(t*0.17+3.1)*0.58, sin(t*0.13+0.4)*0.42);

      vec2 m = (uMouse - 0.5);
      m.x *= uRes.x / uRes.y;
      c1 += m * 0.08;
      c2 += m * 0.06;

      float f = 0.0;
      f += softField(p, c1, 0.62);
      f += softField(p, c2, 0.58);
      f += softField(p, c3, 0.55);
      f += softField(p, c4, 0.52);

      float blob = smoothstep(1.35, 1.75, f);

      float eps = 0.004;
      float fx = 0.0;
      float fy = 0.0;

      fx += softField(p + vec2(eps,0.0), c1, 0.62);
      fx += softField(p + vec2(eps,0.0), c2, 0.58);
      fx += softField(p + vec2(eps,0.0), c3, 0.55);
      fx += softField(p + vec2(eps,0.0), c4, 0.52);

      fy += softField(p + vec2(0.0,eps), c1, 0.62);
      fy += softField(p + vec2(0.0,eps), c2, 0.58);
      fy += softField(p + vec2(0.0,eps), c3, 0.55);
      fy += softField(p + vec2(0.0,eps), c4, 0.52);

      vec3 n = normalize(vec3(fx - f, fy - f, 0.12));

      vec3 lightDir = normalize(vec3(-0.35, 0.65, 0.55));
      float diff = clamp(dot(n, lightDir), 0.0, 1.0);
      float spec = pow(clamp(dot(reflect(-lightDir, n), vec3(0.0,0.0,1.0)), 0.0, 1.0), 36.0);

      vec3 bgDark = vec3(0.035, 0.04, 0.07);
      vec3 bodyDark = mix(vec3(0.08,0.085,0.12), vec3(0.14,0.15,0.20), diff);
      vec3 hiDark = vec3(0.85,0.9,1.0);

      vec3 bgLight = vec3(0.95, 0.955, 0.975);

      float hue = fract(uv.x*0.55 + uv.y*0.25 + t*0.03);
      vec3 pastel = hsv2rgb(vec3(hue, 0.42, 1.0));
      vec3 bodyLight = mix(pastel, vec3(1.0), 0.15) * (0.92 + diff*0.10);
      vec3 hiLight = vec3(1.0);

      vec3 bg = mix(bgDark, bgLight, uMode);
      vec3 body = mix(bodyDark, bodyLight, uMode);
      vec3 hi = mix(hiDark, hiLight, uMode);

      float vign = smoothstep(1.15, 0.2, length(p));

      vec3 col = bg;
      col = mix(col, body, blob * 0.92);

      float streak = smoothstep(0.0, 1.0, spec) * (uMode > 0.5 ? 0.45 : 0.65);
      col += streak * hi * blob;

      float g = hash(uv * uRes + fract(t)*100.0);
      float grainAmp = (uMode > 0.5) ? 0.018 : 0.03;
      col += (g - 0.5) * grainAmp;

      col *= vign * 0.95 + 0.05;

      gl_FragColor = vec4(col, 1.0);
    }
  `
);

/**
 * 2) ✅ THIS is the missing runtime piece
 * Register MetaMaterial so <metaMaterial /> becomes valid.
 */
extend({ MetaMaterial });

/**
 * 3) TS typing (keep it simple, don’t use Object3DNode)
 */
declare module "@react-three/fiber" {
  interface ThreeElements {
    metaMaterial: any;
  }
}

function FullscreenQuad({ mode }: { mode: "dark" | "light" }) {
  const mat = useRef<any>(null);

  // reuse vectors (no new allocations every frame)
  const mouseV = useMemo(() => new THREE.Vector2(0.5, 0.5), []);
  const resV = useMemo(() => new THREE.Vector2(1, 1), []);

  useFrame(({ clock, pointer, size }) => {
    if (!mat.current) return;

    mat.current.uTime = clock.getElapsedTime();

    // pointer is in [-1..1]
    mouseV.set(pointer.x * 0.5 + 0.5, pointer.y * 0.5 + 0.5);
    resV.set(size.width, size.height);

    mat.current.uMouse = mouseV;
    mat.current.uRes = resV;
    mat.current.uMode = mode === "light" ? 1 : 0;
  });

  const geom = useMemo(() => {
    // fullscreen triangle
    const g = new THREE.BufferGeometry();
    const verts = new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]);
    const uvs = new Float32Array([0, 0, 2, 0, 0, 2]);
    g.setAttribute("position", new THREE.BufferAttribute(verts, 3));
    g.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
    return g;
  }, []);

  return (
    <mesh geometry={geom} frustumCulled={false}>
      {/* ✅ must be lower-case tag: metaMaterial */}
      <metaMaterial ref={mat} attach="material" />
    </mesh>
  );
}

export default function MetaballsBackground({ mode }: { mode: "dark" | "light" }) {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 1] }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          // keep transparent
          gl.setClearColor(0x000000, 0);
        }}
      >
        <FullscreenQuad mode={mode} />
      </Canvas>
    </div>
  );
}
