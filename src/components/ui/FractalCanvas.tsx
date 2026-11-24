"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Sparkles, Activity, Eye, Play, Pause } from "lucide-react";

export type FractalMode = "julia" | "tendrils" | "apollonian";

interface FractalCanvasProps {
  className?: string;
  interactive?: boolean;
  showControls?: boolean;
}

const VERTEX_SHADER = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform int u_mode;

// Hash and Noise functions for Fractal Brownian Motion
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = rot * p * 2.05;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 st = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  vec2 mouse = (u_mouse - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  
  float distToMouse = length(st - mouse);
  vec3 col = vec3(0.976, 0.968, 0.953); // Default light canvas tone

  if (u_mode == 0) {
    // Mode 0: Interactive Julia Fractal Set
    vec2 z = st * 2.5;
    vec2 c = mouse * 1.25 + vec2(sin(u_time * 0.12) * 0.08, cos(u_time * 0.1) * 0.08);
    
    float iter = 0.0;
    const float MAX_ITER = 52.0;
    
    for (float i = 0.0; i < MAX_ITER; i += 1.0) {
      if (dot(z, z) > 4.0) break;
      z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
      iter += 1.0;
    }
    
    float smoothIter = iter - log2(max(1.0, log2(dot(z, z))));
    float norm = clamp(smoothIter / MAX_ITER, 0.0, 1.0);
    
    vec3 base = vec3(0.976, 0.965, 0.945);
    vec3 deep = vec3(0.89, 0.85, 0.81);
    vec3 crimson = vec3(0.92, 0.10, 0.35); // Nothing Crimson Red
    vec3 amber = vec3(0.96, 0.55, 0.22);
    
    col = mix(base, deep, smoothstep(0.1, 0.85, norm));
    col = mix(col, crimson, pow(norm, 1.6) * 0.7);
    col = mix(col, amber, pow(norm, 3.0) * 0.85);
    
    // Soft cursor illumination
    float glow = 1.0 - smoothstep(0.0, 0.6, distToMouse);
    col = mix(col, crimson, glow * 0.18);
  }
  else if (u_mode == 1) {
    // Mode 1: Fractal Tendrils / Domain Warping
    float t = u_time * 0.08;
    vec2 q = vec2(fbm(st * 1.8 + t), fbm(st * 1.8 - t + 3.2));
    vec2 r = vec2(
      fbm(st * 1.8 + 2.8 * q + vec2(1.7, 9.2) + t * 1.2),
      fbm(st * 1.8 + 2.8 * q + vec2(8.3, 2.8) - t)
    );
    float f = fbm(st * 1.5 + 3.0 * r);
    
    // Attract curl towards cursor
    float mousePull = 1.0 - smoothstep(0.0, 0.7, distToMouse);
    f += mousePull * 0.25;
    
    vec3 base = vec3(0.975, 0.965, 0.945);
    vec3 warmGray = vec3(0.88, 0.85, 0.82);
    vec3 crimson = vec3(0.92, 0.10, 0.35);
    vec3 gold = vec3(0.95, 0.68, 0.28);
    
    col = mix(base, warmGray, smoothstep(0.2, 0.8, f));
    col = mix(col, crimson, smoothstep(0.5, 0.95, f) * 0.35);
    col = mix(col, gold, smoothstep(0.7, 1.1, f) * 0.3);
    col = mix(col, crimson, mousePull * 0.15);
  }
  else {
    // Mode 2: Apollonian / Harmonic Ring Fractal
    vec2 p = st * 3.0;
    p -= mouse * 0.8;
    float d = length(p);
    float angle = atan(p.y, p.x);
    
    float rings = sin(d * 14.0 - u_time * 1.2 + sin(angle * 6.0) * 0.8);
    rings = abs(rings);
    rings = 0.05 / max(rings, 0.04);
    
    float mask = smoothstep(2.5, 0.2, d);
    vec3 base = vec3(0.976, 0.968, 0.953);
    vec3 crimson = vec3(0.92, 0.10, 0.35);
    vec3 violet = vec3(0.45, 0.25, 0.85);
    
    col = mix(base, crimson, clamp(rings * mask * 0.45, 0.0, 1.0));
    col = mix(col, violet, clamp(rings * mask * (1.0 - mask) * 0.3, 0.0, 1.0));
    
    float glow = 1.0 - smoothstep(0.0, 0.5, distToMouse);
    col = mix(col, crimson, glow * 0.2);
  }

  // Soft cinematic vignette
  float vignette = smoothstep(1.3, 0.4, length(uv - 0.5) * 1.4);
  col = mix(vec3(0.95, 0.94, 0.92), col, vignette);

  gl_FragColor = vec4(col, 1.0);
}
`;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  size: number;
  seed: number;
  life: number;
  alpha: number;
}

export const FractalCanvas: React.FC<FractalCanvasProps> = ({
  className = "",
  interactive = true,
  showControls = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);

  const [mode, setMode] = useState<FractalMode>("julia");
  const [isPlaying, setIsPlaying] = useState(true);
  const [fps, setFps] = useState(60);
  const [mouseCoord, setMouseCoord] = useState({ x: 0, y: 0 });
  const [telemetrySeed, setTelemetrySeed] = useState("-0.7269 + 0.1889i");

  const modeRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(true);
  const mouseRef = useRef<{ x: number; y: number; tx: number; ty: number }>({
    x: 0,
    y: 0,
    tx: 0,
    ty: 0,
  });

  useEffect(() => {
    modeRef.current = mode === "julia" ? 0 : mode === "tendrils" ? 1 : 2;
  }, [mode]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // WebGL Shader Initialization & Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      powerPreference: "high-performance",
    });

    if (!gl) {
      console.warn("WebGL not supported, falling back.");
      return;
    }

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Fullscreen quad
    const quad = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uMode = gl.getUniformLocation(program, "u_mode");

    // Dynamic resolution scaling for maximum performance:
    // Scale 0.75 yields beautiful visuals while maintaining locked 60+ FPS on any GPU
    const renderScale = 0.75;
    const resize = () => {
      if (!canvas) return;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (width === 0 || height === 0) return;
      
      const targetW = Math.max(2, Math.floor(width * renderScale));
      const targetH = Math.max(2, Math.floor(height * renderScale));
      
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
        gl.viewport(0, 0, targetW, targetH);
        gl.uniform2f(uResolution, targetW, targetH);
      }
    };

    resize();

    // Mouse tracking with smooth spring damping
    mouseRef.current = {
      x: canvas.width * 0.5,
      y: canvas.height * 0.5,
      tx: canvas.width * 0.5,
      ty: canvas.height * 0.5,
    };

    const onPointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      
      mouseRef.current.tx = (clientX / rect.width) * canvas.width;
      mouseRef.current.ty = (1.0 - clientY / rect.height) * canvas.height;

      // Update telemetry display
      const normalizedX = ((clientX / rect.width) * 2 - 1).toFixed(3);
      const normalizedY = ((1 - clientY / rect.height) * 2 - 1).toFixed(3);
      setMouseCoord({ x: clientX, y: clientY });
      setTelemetrySeed(`${normalizedX} + ${normalizedY}i`);
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });

    let rafId = 0;
    let isVisible = true;
    let lastTime = performance.now();
    let frameCount = 0;
    let lastFpsUpdate = lastTime;

    const render = (time: number) => {
      if (isVisible && isPlayingRef.current) {
        // Smoothly interpolate mouse position (inertia)
        mouseRef.current.x += (mouseRef.current.tx - mouseRef.current.x) * 0.08;
        mouseRef.current.y += (mouseRef.current.ty - mouseRef.current.y) * 0.08;

        gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
        gl.uniform1f(uTime, time * 0.001);
        gl.uniform1i(uMode, modeRef.current);
        gl.drawArrays(gl.TRIANGLES, 0, 6);

        // Calculate FPS
        frameCount++;
        if (time - lastFpsUpdate >= 1000) {
          setFps(Math.round((frameCount * 1000) / (time - lastFpsUpdate)));
          frameCount = 0;
          lastFpsUpdate = time;
        }
      }
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    // Pause when offscreen or tab hidden
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(canvas);

    const onVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", resize, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onPointerMove);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, []);

  // Secondary Particle Constellation Canvas (follows cursor with fractal branching tendrils)
  useEffect(() => {
    const pCanvas = particleCanvasRef.current;
    if (!pCanvas) return;
    const ctx = pCanvas.getContext("2d");
    if (!ctx) return;

    let pRaf = 0;
    const particles: Particle[] = [];
    const PARTICLE_COUNT = 36;

    const resize = () => {
      pCanvas.width = pCanvas.clientWidth;
      pCanvas.height = pCanvas.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Initialize particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * (pCanvas.width || 800),
        y: Math.random() * (pCanvas.height || 600),
        vx: 0,
        vy: 0,
        targetX: pCanvas.width * 0.5,
        targetY: pCanvas.height * 0.5,
        size: 1.5 + Math.random() * 2.5,
        seed: Math.random() * Math.PI * 2,
        life: 0.5 + Math.random() * 0.5,
        alpha: 0.1 + Math.random() * 0.35,
      });
    }

    const mousePos = { x: pCanvas.width * 0.5, y: pCanvas.height * 0.5 };
    const onMove = (e: MouseEvent) => {
      const rect = pCanvas.getBoundingClientRect();
      mousePos.x = e.clientX - rect.left;
      mousePos.y = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let t = 0;
    const drawParticles = () => {
      if (!ctx || !isPlayingRef.current) {
        pRaf = requestAnimationFrame(drawParticles);
        return;
      }
      ctx.clearRect(0, 0, pCanvas.width, pCanvas.height);
      t += 0.02;

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        // Swarm around mouse with orbit offsets
        const angle = p.seed + t * 0.8 + i * 0.18;
        const radius = 40 + (i % 6) * 25 + Math.sin(t * 1.5 + i) * 20;
        const targetX = mousePos.x + Math.cos(angle) * radius;
        const targetY = mousePos.y + Math.sin(angle) * radius;

        p.vx += (targetX - p.x) * 0.05;
        p.vy += (targetY - p.y) * 0.05;
        p.vx *= 0.82;
        p.vy *= 0.82;
        p.x += p.vx;
        p.y += p.vy;

        // Draw particle dot (Nothing crimson & warm amber)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? `rgba(235, 24, 129, ${p.alpha})` : `rgba(242, 88, 53, ${p.alpha * 0.8})`;
        ctx.fill();

        // Draw fractal tendril connections between nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 85) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(235, 24, 129, ${(1 - dist / 85) * 0.18})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      pRaf = requestAnimationFrame(drawParticles);
    };

    pRaf = requestAnimationFrame(drawParticles);

    return () => {
      cancelAnimationFrame(pRaf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative h-full w-full overflow-hidden select-none ${className}`}>
      {/* Primary WebGL Shader Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
      />

      {/* Interactive Fractal Particle Constellation */}
      <canvas
        ref={particleCanvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      {/* Subtle Grid Crosshairs Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      {/* Interactive HUD / Fractal Controls */}
      {showControls && (
        <div className="absolute bottom-5 left-5 right-5 z-20 flex flex-wrap items-center justify-between gap-3 text-fg pointer-events-auto md:bottom-8 md:left-10 md:right-10">
          {/* Fractal Telemetry HUD */}
          <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-fg/10 bg-canvas/70 px-4 py-2 font-mono text-[11px] backdrop-blur-md shadow-sm">
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="uppercase tracking-wider text-fg/75">GPU FRACTAL ENGINE</span>
            </span>
            <span className="hidden text-fg/20 sm:inline">|</span>
            <span className="hidden text-fg/60 sm:inline">SEED: {telemetrySeed}</span>
            <span className="hidden text-fg/20 md:inline">|</span>
            <span className="hidden text-fg/60 md:inline">{fps} FPS</span>
          </div>

          {/* Mode Switcher & Controls */}
          <div className="flex items-center gap-1.5 rounded-2xl border border-fg/10 bg-canvas/70 p-1 font-mono text-[11px] backdrop-blur-md shadow-sm">
            <button
              type="button"
              onClick={() => setMode("julia")}
              className={`rounded-xl px-3 py-1.5 uppercase tracking-wider transition-all ${
                mode === "julia"
                  ? "bg-fg text-canvas font-bold shadow-sm"
                  : "text-fg/60 hover:text-fg hover:bg-fg/5"
              }`}
            >
              Julia
            </button>
            <button
              type="button"
              onClick={() => setMode("tendrils")}
              className={`rounded-xl px-3 py-1.5 uppercase tracking-wider transition-all ${
                mode === "tendrils"
                  ? "bg-fg text-canvas font-bold shadow-sm"
                  : "text-fg/60 hover:text-fg hover:bg-fg/5"
              }`}
            >
              Tendrils
            </button>
            <button
              type="button"
              onClick={() => setMode("apollonian")}
              className={`rounded-xl px-3 py-1.5 uppercase tracking-wider transition-all ${
                mode === "apollonian"
                  ? "bg-fg text-canvas font-bold shadow-sm"
                  : "text-fg/60 hover:text-fg hover:bg-fg/5"
              }`}
            >
              Harmonics
            </button>

            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              title={isPlaying ? "Pause Fractal Simulation" : "Resume Simulation"}
              aria-label={isPlaying ? "Pause Fractal Simulation" : "Resume Simulation"}
              className="ml-1 flex h-7 w-7 items-center justify-center rounded-lg border border-fg/10 text-fg/70 hover:bg-fg/10 hover:text-fg"
            >
              {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3 ml-0.5" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
