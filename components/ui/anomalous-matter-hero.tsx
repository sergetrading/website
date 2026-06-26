"use client";

import React, { useRef, useEffect, useState, Suspense } from "react";
import * as THREE from "three";

/**
 * Scroll-linked progress for the first viewport (0 at top -> 1 after one
 * screen). Dependency-free: a passive scroll listener throttled with rAF, so it
 * only touches `transform`/`opacity` and stays on the GPU compositor. Honours
 * `prefers-reduced-motion` by pinning progress at 0 (no movement).
 */
function useHeroScroll() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = window.innerHeight || 1;
        setProgress(Math.min(1, Math.max(0, window.scrollY / h)));
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return progress;
}

export function GenerativeArtScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<THREE.PointLight | null>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(1.2, 64);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pointLightPos: { value: new THREE.Vector3(0, 0, 5) },
        // THREE.Color cannot parse a CSS custom property, so we pass the
        // resolved --sky-300 (white) value directly.
        color: { value: new THREE.Color("hsl(0, 0%, 100%)") },
      },
      vertexShader: `
        uniform float time;
        varying vec3 vNormal;
        varying vec3 vPosition;

        // Perlin Noise function
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
        float snoise(vec3 v) {
            const vec2 C = vec2(1.0/6.0, 1.0/3.0);
            const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
            vec3 i = floor(v + dot(v, C.yyy));
            vec3 x0 = v - i + dot(i, C.xxx);
            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min(g.xyz, l.zxy);
            vec3 i2 = max(g.xyz, l.zxy);
            vec3 x1 = x0 - i1 + C.xxx;
            vec3 x2 = x0 - i2 + C.yyy;
            vec3 x3 = x0 - D.yyy;
            i = mod289(i);
            vec4 p = permute(permute(permute(
                        i.z + vec4(0.0, i1.z, i2.z, 1.0))
                    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
            float n_ = 0.142857142857;
            vec3 ns = n_ * D.wyz - D.xzx;
            vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_);
            vec4 x = x_ * ns.x + ns.yyyy;
            vec4 y = y_ * ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);
            vec4 b0 = vec4(x.xy, y.xy);
            vec4 b1 = vec4(x.zw, y.zw);
            vec4 s0 = floor(b0) * 2.0 + 1.0;
            vec4 s1 = floor(b1) * 2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));
            vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
            vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
            vec3 p0 = vec3(a0.xy, h.x);
            vec3 p1 = vec3(a0.zw, h.y);
            vec3 p2 = vec3(a1.xy, h.z);
            vec3 p3 = vec3(a1.zw, h.w);
            vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
            p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
            vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
            m = m * m;
            return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
        }

        void main() {
            vNormal = normal;
            vPosition = position;
            float displacement = snoise(position * 2.0 + time * 0.5) * 0.2;
            vec3 newPosition = position + normal * displacement;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }`,
      fragmentShader: `
        uniform vec3 color;
        uniform vec3 pointLightPos;
        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
            vec3 normal = normalize(vNormal);
            vec3 lightDir = normalize(pointLightPos - vPosition);
            float diffuse = max(dot(normal, lightDir), 0.0);

            // Fresnel effect for the glow
            float fresnel = 1.0 - dot(normal, vec3(0.0, 0.0, 1.0));
            fresnel = pow(fresnel, 2.0);

            vec3 finalColor = color * diffuse + color * fresnel * 0.5;

            gl_FragColor = vec4(finalColor, 1.0);
        }`,
      wireframe: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(0, 0, 5);
    lightRef.current = pointLight;
    scene.add(pointLight);

    let frameId: number;
    const animate = (t: number) => {
      material.uniforms.time.value = t * 0.0003;
      mesh.rotation.y += 0.0005;
      mesh.rotation.x += 0.0002;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate(0);

    const handleResize = () => {
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      const vec = new THREE.Vector3(x, y, 0.5).unproject(camera);
      const dir = vec.sub(camera.position).normalize();
      const dist = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(dist));
      lightRef.current?.position.copy(pos);
      material.uniforms.pointLightPos.value = pos;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (renderer.domElement.parentNode === currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full z-0" />;
}

export interface AnomalousMatterHeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

export function AnomalousMatterHero({
  title = "Observation Log: Anomaly 7",
  subtitle = "Matter in a state of constant, beautiful flux.",
  description = "A new form of digital existence has been observed. It responds to stimuli, changes form, and exudes an unknown energy. Further study is required.",
}: AnomalousMatterHeroProps) {
  const p = useHeroScroll();

  return (
    <section
      role="banner"
      className="relative w-full h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] overflow-hidden"
    >
      {/* 3D scene gently zooms + drifts and dissolves into the black as you scroll */}
      <div
        className="absolute inset-0 z-0 will-change-transform"
        style={{
          transform: `scale(${1 + p * 0.14}) translateY(${p * 6}vh)`,
          opacity: 1 - p * 0.7,
        }}
      >
        <Suspense fallback={<div className="w-full h-full bg-[hsl(var(--background))]" />}>
          <GenerativeArtScene />
        </Suspense>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background))] via-[hsl(var(--background)/0.7)] to-transparent z-10" />

      <div className="relative z-20 flex flex-col items-center justify-end h-full pb-20 md:pb-32 text-center">
        <div
          className="will-change-transform"
          style={{
            transform: `translateY(${-p * 12}vh)`,
            opacity: 1 - Math.min(1, p * 1.4),
          }}
        >
          <div className="max-w-3xl px-4 animate-fade-in-long">
          <h1 className="text-sm font-mono tracking-widest text-[hsl(var(--sky-300)/0.8)] uppercase">
            {title}
          </h1>
          <p className="mt-4 font-serif text-3xl md:text-5xl font-normal leading-[1.08] tracking-[-0.02em]">
            {subtitle}
          </p>
          <p className="mt-6 max-w-xl mx-auto text-base leading-relaxed text-[hsl(var(--gray-300)/0.8)]">
            {description}
          </p>
          </div>
        </div>
      </div>

      {/* Scroll cue — gently pulses, fades out as soon as the user scrolls */}
      <div
        className="absolute inset-x-0 bottom-7 z-20 flex flex-col items-center gap-3 pointer-events-none"
        style={{ opacity: Math.max(0, 1 - p * 3) }}
        aria-hidden
      >
        <span
          className="text-[0.625rem] font-light uppercase tracking-[0.5em] text-[hsl(var(--gray-300)/0.6)]"
          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
        >
          Scroll
        </span>
        <svg
          className="animate-scroll-cue motion-reduce:animate-none"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="hsl(var(--gray-300) / 0.7)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}
