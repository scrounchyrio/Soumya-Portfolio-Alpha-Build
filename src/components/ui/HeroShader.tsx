"use client";

import React, { useEffect, useRef } from "react";

const VERTEX = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

// Domain-warped fbm "liquid paper" with a warm glow that follows the pointer.
const FRAGMENT = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 uRes; uniform float uTime; uniform vec2 uMouse;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
  return mix(mix(hash(i), hash(i+vec2(1,0)), f.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y);
}
float fbm(vec2 p){ float v = 0.0, a = 0.5; for(int i=0;i<5;i++){ v += a*noise(p); p *= 2.02; a *= 0.5; } return v; }
void main(){
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  vec2 p = (gl_FragCoord.xy - 0.5*uRes.xy) / uRes.y;
  vec2 m = (uMouse - 0.5) * vec2(uRes.x/uRes.y, 1.0);
  float t = uTime * 0.07;
  vec2 q = vec2(fbm(p*1.6 + t), fbm(p*1.6 - t + 4.0));
  vec2 r = vec2(fbm(p*1.6 + 2.5*q + vec2(1.7,9.2) + t*1.5), fbm(p*1.6 + 2.5*q + vec2(8.3,2.8) - t));
  float f = fbm(p*1.4 + 2.8*r);
  float glow = 1.0 - smoothstep(0.0, 0.75, distance(p, m));
  vec3 base = vec3(0.945, 0.933, 0.906);
  vec3 shade = vec3(0.86, 0.835, 0.80);
  vec3 warm = vec3(0.95, 0.30, 0.20);
  vec3 col = mix(base, shade, smoothstep(0.25, 0.85, f));
  col = mix(col, warm, smoothstep(0.55, 1.0, f * (0.6 + 0.9*glow)) * 0.38);
  col = mix(col, warm, glow * 0.12);
  col = mix(vec3(1.0), col, 1.0 - smoothstep(0.35, 1.35, length(uv - 0.5) * 1.5));
  gl_FragColor = vec4(col, 1.0);
}`;

/** Full-bleed GLSL background. Falls back silently to the CSS gradient behind it. */
export const HeroShader: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
    };
    const vs = compile(gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT);
    if (!vs || !fs) return;
    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "uRes");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uMouse = gl.getUniformLocation(program, "uMouse");

    // Render at reduced resolution; the shader is soft by design.
    const scale = Math.min(window.devicePixelRatio || 1, 1.5) * 0.5;
    const resize = () => {
      canvas.width = Math.max(2, Math.floor(canvas.clientWidth * scale));
      canvas.height = Math.max(2, Math.floor(canvas.clientHeight * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const target = { x: 0.5, y: 0.5 };
    const current = { x: 0.5, y: 0.5 };
    const onMove = (event: PointerEvent) => {
      target.x = event.clientX / window.innerWidth;
      target.y = 1 - event.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    let running = true;
    let inView = true;
    const start = performance.now();

    const draw = (now: number) => {
      current.x += (target.x - current.x) * 0.05;
      current.y += (target.y - current.y) * 0.05;
      gl.uniform1f(uTime, reduced ? 12 : (now - start) / 1000);
      gl.uniform2f(uMouse, current.x, current.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const loop = (now: number) => {
      if (!running) return;
      if (inView) draw(now);
      raf = requestAnimationFrame(loop);
    };

    if (reduced) {
      draw(start);
    } else {
      raf = requestAnimationFrame(loop);
    }

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
    });
    observer.observe(canvas);
    const onVisibility = () => {
      if (reduced) return;
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        raf = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full bg-[radial-gradient(ellipse_at_30%_20%,rgba(224,48,31,0.14),transparent_60%)]"
    />
  );
};
