"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: "600" });

// ─── constants ────────────────────────────────────────────────────────────────
const MIN_DURATION_MS = 2000;
const MAX_DURATION_MS = 10000;
const DS = 8;       // dot size
const CS = 29.5;    // circle size
const HS = CS / 2;  // flower orbit radius (touching circles)
const BP = 6;       // border px (full-size view, fully deployed)
const CX = 50;      // logical center X
const CY = 50;      // logical center Y

// ─── easing ───────────────────────────────────────────────────────────────────
type EasingId = "linear" | "ease-in" | "ease-out" | "ease-in-out";

const EASINGS: { id: EasingId; label: string }[] = [
  { id: "linear",      label: "Linear"      },
  { id: "ease-in",     label: "Ease in"     },
  { id: "ease-out",    label: "Ease out"    },
  { id: "ease-in-out", label: "Ease in-out" },
];

function applyEasing(t: number, id: EasingId): number {
  switch (id) {
    case "linear":      return t;
    case "ease-in":     return t * t;
    case "ease-out":    return 1 - (1 - t) * (1 - t);
    case "ease-in-out": return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    default: { const _: never = id; return t; }
  }
}

// ─── duration helpers ─────────────────────────────────────────────────────────
function durationToSpeed(ms: number): number {
  return Math.round(((MAX_DURATION_MS - ms) / (MAX_DURATION_MS - MIN_DURATION_MS)) * 100);
}
function speedToDuration(speed: number): number {
  return Math.round(MAX_DURATION_MS - (speed / 100) * (MAX_DURATION_MS - MIN_DURATION_MS));
}

// ─── independent circle state ─────────────────────────────────────────────────
// Each of the 6 circles is fully independent.
// Polar coords: x = CX + r·cos(a°),  y = CY − r·sin(a°)  (screen y inverted)
//
// Flower angle order — chosen to match the original group layout:
//   idx 0 → 0°   (G1 right)   idx 3 → 180° (G1 left)
//   idx 1 → 60°  (G3 left)    idx 4 → −120°= 240° (G3 right)
//   idx 2 → 120° (G2 left)    idx 5 → −60° = 300° (G2 right)
type C6 = {
  r:  [number, number, number, number, number, number]; // radius from center
  a:  [number, number, number, number, number, number]; // angle in degrees
  sz: [number, number, number, number, number, number]; // circle diameter
};
type AnimFn = (progress: number, easing: EasingId) => C6;

// ─── math helpers ─────────────────────────────────────────────────────────────
const lerp   = (a: number, b: number, t: number) => a + (b - a) * t;
const c01    = (v: number) => Math.min(1, Math.max(0, v));
const seg    = (t: number, s: number, e: number) => c01((t - s) / (e - s));
const mt     = (p: number) => p < 0.5 ? p * 2 : (1 - p) * 2;

const lerpC6 = (a: C6, b: C6, t: number): C6 => ({
  r:  [lerp(a.r[0],b.r[0],t),  lerp(a.r[1],b.r[1],t),  lerp(a.r[2],b.r[2],t),
       lerp(a.r[3],b.r[3],t),  lerp(a.r[4],b.r[4],t),  lerp(a.r[5],b.r[5],t)],
  a:  [lerp(a.a[0],b.a[0],t),  lerp(a.a[1],b.a[1],t),  lerp(a.a[2],b.a[2],t),
       lerp(a.a[3],b.a[3],t),  lerp(a.a[4],b.a[4],t),  lerp(a.a[5],b.a[5],t)],
  sz: [lerp(a.sz[0],b.sz[0],t), lerp(a.sz[1],b.sz[1],t), lerp(a.sz[2],b.sz[2],t),
       lerp(a.sz[3],b.sz[3],t), lerp(a.sz[4],b.sz[4],t), lerp(a.sz[5],b.sz[5],t)],
});

// Convert group-based (sz, spread, rotation) → C6
// c0=G0R, c1=G2L, c2=G1L, c3=G0L, c4=G2R, c5=G1R
const gC6 = (
  sz: [number,number,number],
  sp: [number,number,number],
  rt: [number,number,number]
): C6 => ({
  r:  [sp[0], sp[2], sp[1], sp[0], sp[2], sp[1]],
  a:  [rt[0], rt[2]+180, rt[1]+180, rt[0]+180, rt[2], rt[1]],
  sz: [sz[0], sz[2], sz[1], sz[0], sz[2], sz[1]],
});

// Flower angles (signed, no modular reduction — lerp stays well-behaved)
const FA: [number,number,number,number,number,number] = [0, 60, 120, 180, -120, -60];

const FLOWER: C6 = { r:[HS,HS,HS,HS,HS,HS], a:[0,60,120,180,-120,-60], sz:[CS,CS,CS,CS,CS,CS] };
const DOT:    C6 = { r:[0,0,0,0,0,0],        a:[0,60,120,180,-120,-60], sz:[DS,DS,DS,DS,DS,DS] };

// ─── 11 animations ────────────────────────────────────────────────────────────
// All reach FLOWER at progress = 0.5 and loop cleanly.

// 1 · Assembly – no delay at 15% (faster into expand) or 80% (shrink starts earlier)
const a1: AnimFn = (p, eid) => {
  const ef = (t: number) => applyEasing(t, eid);
  if (p < 0.12) {
    const t = p / 0.12;
    const s = lerp(DS, CS, ef(t));
    return gC6([s,s,s],[0,0,0],[0,-60,-120]);
  }
  if (p < 0.45) {
    const t = (p - 0.12) / 0.33;
    const spread = lerp(0, HS, ef(t));
    const openStart = 0.25;
    const openT = Math.max(0, (t - openStart) / (1 - openStart));
    const rt0 = lerp(0, -60, ef(openT));
    const rt1 = lerp(0, -120, ef(openT));
    return gC6([CS,CS,CS],[spread,spread,spread],[0, rt0, rt1]);
  }
  if (p < 0.60) return FLOWER;
  if (p < 0.76) {
    const t = (p - 0.60) / 0.16;
    const spread = lerp(HS, 0, ef(t));
    const rt0 = lerp(-60, 0, ef(t));
    const rt1 = lerp(-120, 0, ef(t));
    return gC6([CS,CS,CS],[spread,spread,spread],[0, rt0, rt1]);
  }
  if (p < 1) {
    const t = (p - 0.76) / 0.24;
    const s = lerp(CS, DS, ef(t));
    return gC6([s,s,s],[0,0,0],[-360,-360,-360]);
  }
  return DOT;
};

// 2 · Bloom – all 6 circles open simultaneously with hold at FLOWER
const a2: AnimFn = (p, e) => {
  const ef = (t: number) => applyEasing(t, e);
  if (p < 0.40) return lerpC6(DOT,    FLOWER, ef(p / 0.40));
  if (p < 0.60) return FLOWER;
  return               lerpC6(FLOWER, DOT,    ef((p - 0.60) / 0.40));
};

// 3 · Weave – alternating circles rotate CW vs CCW as they emerge.
// Even circles (0,2,4) approach from −90°, odd (1,3,5) from +90°.
// At the midpoint of opening, the 6 circles form a Star-of-David before
// converging to flower — impossible with the old group-symmetric system.
const a3: AnimFn = (p, e) => {
  const ef    = (t: number) => applyEasing(t, e);
  const openT = mt(p);
  const t     = ef(openT);
  const r:  [number,number,number,number,number,number] = [0,0,0,0,0,0];
  const a:  [number,number,number,number,number,number] = [0,0,0,0,0,0];
  const sz: [number,number,number,number,number,number] = [0,0,0,0,0,0];
  for (let i = 0; i < 6; i++) {
    r[i]  = lerp(0, HS, t);
    const dir = (i % 2 === 0) ? -1 : 1; // even: CW, odd: CCW
    a[i]  = FA[i] + dir * 90 * (1 - t);
    sz[i] = lerp(DS, CS, t);
  }
  return { r, a, sz };
};

// 4 · Phase – 3 circles converge from 2.2× radius inward while the other 3
// expand outward from center. They meet exactly at the FLOWER ring.
// Unique to independent circles: half push in, half push out simultaneously.
const a4: AnimFn = (p, e) => {
  const ef    = (t: number) => applyEasing(t, e);
  const openT = mt(p);
  const t     = ef(openT);
  const r:  [number,number,number,number,number,number] = [0,0,0,0,0,0];
  const a:  [number,number,number,number,number,number] = [0,0,0,0,0,0];
  const sz: [number,number,number,number,number,number] = [0,0,0,0,0,0];
  for (let i = 0; i < 6; i++) {
    const startR = (i % 2 === 0) ? 0 : HS * 2.2;
    r[i]  = lerp(startR, HS, t);
    a[i]  = FA[i];
    sz[i] = lerp(DS, CS, t);
  }
  return { r, a, sz };
};

// 5 · Orbit – all 6 circles grow while completing a full CW revolution, hold
const a5: AnimFn = (p, e) => {
  const ef = (t: number) => applyEasing(t, e);
  function orbitAt(t: number): C6 {
    const r:  [number,number,number,number,number,number] = [0,0,0,0,0,0];
    const a:  [number,number,number,number,number,number] = [0,0,0,0,0,0];
    const sz: [number,number,number,number,number,number] = [0,0,0,0,0,0];
    for (let i = 0; i < 6; i++) {
      r[i]  = lerp(0, HS, t);
      a[i]  = FA[i] + lerp(-360, 0, t);
      sz[i] = lerp(DS, CS, t);
    }
    return { r, a, sz };
  }
  if (p < 0.40) return orbitAt(ef(p / 0.40));
  if (p < 0.60) return FLOWER;
  return               orbitAt(ef(1 - (p - 0.60) / 0.40));
};

// 6 · Ripple – circles fly out one by one with a CCW swoop.
// Circle 0 leaves first, circle 5 last — a sequential wave around the ring.
// Each circle swoops in from 90° behind its final angle, creating a pinwheel fill.
const a6: AnimFn = (p, e) => {
  const ef    = (t: number) => applyEasing(t, e);
  const openT = mt(p);
  const r:  [number,number,number,number,number,number] = [0,0,0,0,0,0];
  const a:  [number,number,number,number,number,number] = [0,0,0,0,0,0];
  const sz: [number,number,number,number,number,number] = [0,0,0,0,0,0];
  for (let i = 0; i < 6; i++) {
    const tStart = i * (0.5 / 5);       // stagger: 0, 0.1, 0.2, 0.3, 0.4, 0.5
    const t = ef(c01((openT - tStart) / 0.5));
    r[i]  = lerp(0, HS, t);
    a[i]  = FA[i] - 90 * (1 - t);      // swoop from −90° offset to final angle
    sz[i] = lerp(DS, CS, t);
  }
  return { r, a, sz };
};

// 7 · Propeller – all circles grow stacked flat (0°/180°), then G2 and G3
// fan clockwise to their positions, overshooting 15° before snapping to FLOWER.
const a7: AnimFn = (p, e) => {
  const ef   = (t: number) => applyEasing(t, e);
  const FLAT = gC6([CS,CS,CS],[HS,HS,HS],[0,0,0]);
  const OVER = gC6([CS,CS,CS],[HS,HS,HS],[0,-75,-135]);
  if (p < 0.10) return DOT;
  if (p < 0.25) return lerpC6(DOT,    FLAT,   ef(seg(p, 0.10, 0.25)));
  if (p < 0.40) return lerpC6(FLAT,   OVER,   ef(seg(p, 0.25, 0.40)));
  if (p < 0.50) return lerpC6(OVER,   FLOWER, ef(seg(p, 0.40, 0.50)));
  if (p < 0.60) return FLOWER;
  if (p < 0.82) return lerpC6(FLOWER, FLAT,   ef(seg(p, 0.60, 0.82)));
  return               lerpC6(FLAT,   DOT,    ef(seg(p, 0.82, 1.00)));
};

// 8 · Pulse Train – three escalating sonar echoes (40 → 62 → 82%) at the
// flower positions, then full bloom. Rapid collapse after the hold.
const a8: AnimFn = (p, e) => {
  const ef = (t: number) => applyEasing(t, e);
  const pulse = (s: number): C6 => ({
    r:  [HS*s,HS*s,HS*s,HS*s,HS*s,HS*s],
    a:  [0,60,120,180,-120,-60],
    sz: [CS*s,CS*s,CS*s,CS*s,CS*s,CS*s],
  });
  const P1 = pulse(0.40), P2 = pulse(0.62), P3 = pulse(0.82);
  if (p < 0.04) return DOT;
  if (p < 0.09) return lerpC6(DOT, P1,     ef(seg(p, 0.04, 0.09)));
  if (p < 0.14) return lerpC6(P1,  DOT,    ef(seg(p, 0.09, 0.14)));
  if (p < 0.20) return lerpC6(DOT, P2,     ef(seg(p, 0.14, 0.20)));
  if (p < 0.26) return lerpC6(P2,  DOT,    ef(seg(p, 0.20, 0.26)));
  if (p < 0.33) return lerpC6(DOT, P3,     ef(seg(p, 0.26, 0.33)));
  if (p < 0.40) return lerpC6(P3,  DOT,    ef(seg(p, 0.33, 0.40)));
  if (p < 0.50) return lerpC6(DOT, FLOWER, ef(seg(p, 0.40, 0.50)));
  if (p < 0.62) return FLOWER;
  if (p < 0.70) return lerpC6(FLOWER, P1,  ef(seg(p, 0.62, 0.70)));
  if (p < 0.78) return lerpC6(P1,     DOT, ef(seg(p, 0.70, 0.78)));
  return DOT;
};

// 9 · Metronome – each circle's radius oscillates with a 60°-offset sine phase,
// creating a wave that rolls around the ring as the formation grows.
// The amplitude envelope (sin(πt)) ensures all circles land exactly on FLOWER.
// Only possible with truly independent radii — the old group model couldn't do this.
const a9: AnimFn = (p, e) => {
  const ef    = (t: number) => applyEasing(t, e);
  const openT = mt(p);
  const t     = ef(openT);
  const r:  [number,number,number,number,number,number] = [0,0,0,0,0,0];
  const a:  [number,number,number,number,number,number] = [0,0,0,0,0,0];
  const sz: [number,number,number,number,number,number] = [0,0,0,0,0,0];
  for (let i = 0; i < 6; i++) {
    const rBase = lerp(0, HS, t);
    // Envelope sin(πt): zero at t=0 and t=1, max at t=0.5
    // Inner wave cycles 3× per open phase; each circle offset by 60° (π/3)
    const wave  = HS * 0.9 * Math.sin(Math.PI * openT) * Math.sin(6 * Math.PI * openT + i * Math.PI / 3);
    r[i]  = Math.max(0, rBase + wave);
    a[i]  = FA[i];
    sz[i] = lerp(DS, CS, t);
  }
  return { r, a, sz };
};

// 10 · Spring – elastic bloom: DOT → 1.35× overshoot (with 8° rotation swing)
// → compress to 55% (opposite swing) → settle at FLOWER.
// Each odd/even circle swings in opposite directions for an organic wobble.
const a10: AnimFn = (p, e) => {
  const ef    = (t: number) => applyEasing(t, e);
  const openT = mt(p);
  const BIG: C6 = {
    r:  [HS*1.35, HS*1.35, HS*1.35, HS*1.35, HS*1.35, HS*1.35],
    a:  [FA[0]-8, FA[1]+8, FA[2]-8, FA[3]+8, FA[4]-8, FA[5]+8],
    sz: [CS*1.35, CS*1.35, CS*1.35, CS*1.35, CS*1.35, CS*1.35],
  };
  const TINY: C6 = {
    r:  [HS*0.55, HS*0.55, HS*0.55, HS*0.55, HS*0.55, HS*0.55],
    a:  [FA[0]+8, FA[1]-8, FA[2]+8, FA[3]-8, FA[4]+8, FA[5]-8],
    sz: [CS*0.55, CS*0.55, CS*0.55, CS*0.55, CS*0.55, CS*0.55],
  };
  if (openT < 0.40) return lerpC6(DOT,  BIG,    ef(seg(openT, 0,    0.40)));
  if (openT < 0.65) return lerpC6(BIG,  TINY,   ef(seg(openT, 0.40, 0.65)));
  return                   lerpC6(TINY, FLOWER, ef(seg(openT, 0.65, 1.00)));
};

// 11 · Materialize – circles grow in-place at their flower positions (spread
// always at HS), hold, then shrink back. The flower skeleton is always visible.
const a11: AnimFn = (p, e) => {
  const ef    = (t: number) => applyEasing(t, e);
  const ghost: C6 = { r:[HS,HS,HS,HS,HS,HS], a:[0,60,120,180,-120,-60], sz:[DS,DS,DS,DS,DS,DS] };
  if (p < 0.40) return lerpC6(ghost,  FLOWER, ef(p / 0.40));
  if (p < 0.60) return FLOWER;
  return               lerpC6(FLOWER, ghost,  ef((p - 0.60) / 0.40));
};

// ─── 10 new animations — no constraints on target state or timing ────────────

// b1 · Figure-8 – 6 circles chase each other continuously along a lemniscate.
// No static states at all — purely continuous sinuous motion.
const b1: AnimFn = (p, _e) => {
  const A = HS * 1.9;   // horizontal half-width
  const B = HS * 1.25;  // vertical amplitude
  const r:  [number,number,number,number,number,number] = [0,0,0,0,0,0];
  const a:  [number,number,number,number,number,number] = [0,0,0,0,0,0];
  const sz: [number,number,number,number,number,number] = [0,0,0,0,0,0];
  for (let i = 0; i < 6; i++) {
    const t  = 2 * Math.PI * ((p + i / 6) % 1);
    const dx = A * Math.cos(t);
    const dy = B * Math.sin(t) * Math.cos(t);   // B·sin(2t)/2 → lemniscate lobes
    r[i]  = Math.sqrt(dx * dx + dy * dy) || 0.01;
    a[i]  = Math.atan2(-dy, dx) * 180 / Math.PI; // screen-y inverted
    sz[i] = CS * 0.75;
  }
  return { r, a, sz };
};

// b2 · Breathe – no rotation, only radius and size undulate asynchronously.
// Each circle's phase is offset 60°, creating a visible wave rolling round the ring.
// Entirely continuous: no keyframe states, never fully still.
const b2: AnimFn = (p, _e) => {
  const r:  [number,number,number,number,number,number] = [0,0,0,0,0,0];
  const a:  [number,number,number,number,number,number] = [0,0,0,0,0,0];
  const sz: [number,number,number,number,number,number] = [0,0,0,0,0,0];
  for (let i = 0; i < 6; i++) {
    const wave = Math.sin(2 * Math.PI * p * 2 + (i * Math.PI) / 3);
    r[i]  = HS + HS * 0.6 * wave;
    a[i]  = FA[i];
    sz[i] = lerp(CS * 0.5, CS, (wave + 1) / 2);
  }
  return { r, a, sz };
};

// b3 · Solar System – 3 orbital pairs at different radii and angular velocities.
// Inner pair: r=0.55×, 3 CW turns. Mid pair: r=1×, 2 CCW turns. Outer: r=1.6×, 1 CW.
// All complete integer turns → exact loop. p=0/1 positions are deliberately non-flower.
const b3: AnimFn = (p, _e): C6 => ({
  r:  [HS * 0.55, HS * 0.55, HS, HS, HS * 1.55, HS * 1.55],
  a:  [
    90  -  1080 * p,   // c0 inner  — 3 CW
    270 -  1080 * p,   // c1 inner  — 3 CW (opposite)
    60  +   720 * p,   // c2 mid    — 2 CCW
    240 +   720 * p,   // c3 mid    — 2 CCW (opposite)
    45  -   360 * p,   // c4 outer  — 1 CW
    225 -   360 * p,   // c5 outer  — 1 CW (opposite)
  ],
  sz: [CS * 0.75, CS * 0.75, CS * 0.85, CS * 0.85, CS * 0.8, CS * 0.8],
});

// b4 · Heartbeat – cardiac double-beat: weak P-wave then strong QRS complex,
// followed by a long resting baseline. Non-symmetric timing; starts and ends at DOT.
const b4: AnimFn = (p, e) => {
  const ef  = (t: number) => applyEasing(t, e);
  const BIG: C6 = {
    r:  [HS*1.3, HS*1.3, HS*1.3, HS*1.3, HS*1.3, HS*1.3],
    a:  [0, 60, 120, 180, -120, -60],
    sz: [CS*1.3, CS*1.3, CS*1.3, CS*1.3, CS*1.3, CS*1.3],
  };
  if (p < 0.10) return DOT;
  if (p < 0.14) return lerpC6(DOT,    FLOWER, ef(seg(p, 0.10, 0.14)));
  if (p < 0.21) return lerpC6(FLOWER, DOT,    ef(seg(p, 0.14, 0.21)));
  if (p < 0.30) return DOT;
  if (p < 0.38) return lerpC6(DOT,    BIG,    ef(seg(p, 0.30, 0.38)));
  if (p < 0.54) return lerpC6(BIG,    DOT,    ef(seg(p, 0.38, 0.54)));
  return DOT;
};

// b5 · Typewriter – circles appear left-to-right in a horizontal line (each
// flying out from center in sequence), hold, then collapse back together.
const b5: AnimFn = (p, e) => {
  const ef = (t: number) => applyEasing(t, e);
  // 6 horizontal positions at y=CY: x=[10,26,42,58,74,90]
  const LR: [number,number,number,number,number,number] = [40, 40, 24, 8,  8,  24];
  const LA: [number,number,number,number,number,number] = [0, 180,180,180, 0,   0];
  const LS: [number,number,number,number,number,number] = [CS*0.6, CS*0.6, CS*0.6, CS*0.6, CS*0.6, CS*0.6];
  const ORD: [number,number,number,number,number,number] = [1, 2, 3, 4, 5, 0]; // left→right
  const r:  [number,number,number,number,number,number] = [0, 0, 0, 0, 0, 0];
  const sz: [number,number,number,number,number,number] = [0, 0, 0, 0, 0, 0];
  if (p < 0.48) {
    for (let seq = 0; seq < 6; seq++) {
      const ci = ORD[seq];
      const t  = ef(c01((p - seq * (0.38 / 5)) / 0.09));
      r[ci]  = lerp(0, LR[ci], t);
      sz[ci] = lerp(0, LS[ci], t);
    }
    return { r, a: LA, sz };
  }
  if (p < 0.70) return { r: LR, a: LA, sz: LS };
  const t = ef(seg(p, 0.70, 1.00));
  for (let ci = 0; ci < 6; ci++) {
    r[ci]  = lerp(LR[ci], 0, t);
    sz[ci] = lerp(LS[ci], 0, t);
  }
  return { r, a: LA, sz };
};

// b6 · Formation – a single continuous formula that morphs through 4 distinct
// formations without any lerp or keyframes:
//   p=0/1 → FLOWER (60° spread)
//   p=0.25 → all 6 circles bunched at the same point (top of ring)
//   p=0.5  → FLOWER rotated 180°
//   p=0.75 → 3 overlapping pairs (triangle vertices)
// angle_i = FA[i]·(1 − sin(2πp)) + 360p
const b6: AnimFn = (p, _e): C6 => ({
  r:  [HS, HS, HS, HS, HS, HS],
  a:  FA.map((f) => f * (1 - Math.sin(2 * Math.PI * p)) + 360 * p) as [number,number,number,number,number,number],
  sz: [CS, CS, CS, CS, CS, CS],
});

// b7 · Scatter – circles blast outward from FLOWER to unique scatter positions,
// then slowly drift back and hold. Starts and ends at FLOWER for seamless loop.
const b7: AnimFn = (p, e) => {
  const ef = (t: number) => applyEasing(t, e);
  const SC: C6 = {
    r:  [HS+HS*1.1, HS+HS*1.3, HS+HS*0.9, HS+HS*1.2, HS+HS*1.0, HS+HS*0.8],
    a:  [FA[0]+55, FA[1]+130, FA[2]-45, FA[3]+160, FA[4]+75, FA[5]-100] as [number,number,number,number,number,number],
    sz: [CS*0.6, CS*0.6, CS*0.6, CS*0.6, CS*0.6, CS*0.6],
  };
  if (p < 0.14) return lerpC6(FLOWER, SC,     ef(seg(p, 0,    0.14)));
  if (p < 0.65) return lerpC6(SC,     FLOWER, ef(seg(p, 0.14, 0.65)));
  return FLOWER;
};

// b8 · Warp – rapid implosion to DOT, brief pause, violent explosion beyond
// FLOWER (1.4×), then slow elastic settling back. Starts and ends at FLOWER.
const b8: AnimFn = (p, e) => {
  const ef  = (t: number) => applyEasing(t, e);
  const BIG: C6 = {
    r:  [HS*1.4, HS*1.4, HS*1.4, HS*1.4, HS*1.4, HS*1.4],
    a:  [0, 60, 120, 180, -120, -60],
    sz: [CS*1.35, CS*1.35, CS*1.35, CS*1.35, CS*1.35, CS*1.35],
  };
  if (p < 0.14) return lerpC6(FLOWER, DOT,    ef(seg(p, 0,    0.14)));
  if (p < 0.22) return DOT;
  if (p < 0.35) return lerpC6(DOT,    BIG,    ef(seg(p, 0.22, 0.35)));
  if (p < 0.62) return lerpC6(BIG,    FLOWER, ef(seg(p, 0.35, 0.62)));
  return FLOWER;
};

// b9 · Kaleidoscope – all 6 circles orbit at radius HS but with different
// angular velocities (1, 2, and 3 turns CW/CCW). All are integers → exact loop.
// Creates ever-changing star-polygon interference patterns.
const b9: AnimFn = (p, _e): C6 => ({
  r:  [HS, HS, HS, HS, HS, HS],
  a:  [
    FA[0] -  360 * p,   // 1 CW
    FA[1] +  720 * p,   // 2 CCW
    FA[2] - 1080 * p,   // 3 CW
    FA[3] +  360 * p,   // 1 CCW
    FA[4] -  720 * p,   // 2 CW
    FA[5] + 1080 * p,   // 3 CCW
  ],
  sz: [CS, CS, CS, CS, CS, CS],
});

// b10 · Cardioid – 6 circles flow along an epitrochoid (cardioid-like) path.
// x(t) = A·cos(t) + B·cos(2t),  y(t) = A·sin(t) − B·sin(2t)
// Each circle is offset by 1/6 of the period → they chain-chase continuously.
const b10: AnimFn = (p, _e) => {
  const A = HS * 1.2;
  const B = HS * 0.5;
  const r:  [number,number,number,number,number,number] = [0,0,0,0,0,0];
  const a:  [number,number,number,number,number,number] = [0,0,0,0,0,0];
  const sz: [number,number,number,number,number,number] = [0,0,0,0,0,0];
  for (let i = 0; i < 6; i++) {
    const t  = 2 * Math.PI * ((p + i / 6) % 1);
    const dx = A * Math.cos(t) + B * Math.cos(2 * t);
    const dy = A * Math.sin(t) - B * Math.sin(2 * t);
    r[i]  = Math.sqrt(dx * dx + dy * dy) || 0.01;
    a[i]  = Math.atan2(-dy, dx) * 180 / Math.PI;
    sz[i] = CS * 0.75;
  }
  return { r, a, sz };
};

// ─── Dot-cluster icon ────────────────────────────────────────────────────────
// 7 solid filled dots with individual x/y position, size, and opacity.
// Derived from Figma node 4:102 "thinking" icon (20×20px container, scaled ×5).
//
// Coordinate system: x right +, y up + (same as C6).
// Screen mapping: screen_x = (CX + x)·scale,  screen_y = (CY − y)·scale
//
// Dot index layout (from Figma CSS offsets):
//   [0] A center       (0,   0)   op 0.40
//   [1] B right-up     (+25,+15)  op 0.50
//   [2] C right-down   (+25,−15)  op 0.40
//   [3] D left-up      (−25,+15)  op 0.10
//   [4] E left-down    (−25,−15)  op 0.20
//   [5] F bottom       (0, −30)   op 0.30
//   [6] G top          (0, +30)   op 0.60
// The opacity gradient (bright upper-right, dim lower-left) encodes 3D depth.

type D7 = {
  x:  [number,number,number,number,number,number,number];
  y:  [number,number,number,number,number,number,number];
  sz: [number,number,number,number,number,number,number];
  op: [number,number,number,number,number,number,number];
};
type D7Fn = (progress: number, easing: EasingId) => D7;

const DZ = 10; // base dot diameter (2px × 5 scale)

const THINK: D7 = {
  x:  [0,    25,   25,   -25,  -25,  0,    0  ],
  y:  [0,    15,   -15,  15,   -15,  -30,  30 ],
  sz: [DZ,   DZ,   DZ,   DZ,   DZ,   DZ,   DZ ],
  op: [0.40, 0.50, 0.40, 0.10, 0.20, 0.30, 0.60],
};

// Precomputed polar coords of each dot from center (for rotation helpers)
const T_R = THINK.x.map((x, i) => Math.sqrt(x*x + THINK.y[i]*THINK.y[i]));
const T_A = THINK.x.map((x, i) => Math.atan2(THINK.y[i], x) * 180 / Math.PI);

const lerpD7 = (a: D7, b: D7, t: number): D7 => ({
  x:  a.x.map((v, i) => lerp(v, b.x[i],  t)) as D7["x"],
  y:  a.y.map((v, i) => lerp(v, b.y[i],  t)) as D7["y"],
  sz: a.sz.map((v, i) => lerp(v, b.sz[i], t)) as D7["sz"],
  op: a.op.map((v, i) => lerp(v, b.op[i], t)) as D7["op"],
});

// Formations: distinct (x,y) layouts for morphing. All in 100×100 logical space.
const ONE_CENTER: D7 = {
  x: [0, 0, 0, 0, 0, 0, 0],
  y: [0, 0, 0, 0, 0, 0, 0],
  sz: [DZ * 1.5, DZ * 0.5, DZ * 0.5, DZ * 0.5, DZ * 0.5, DZ * 0.5, DZ * 0.5],
  op: [0.95, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2],
};
const LINE_H: D7 = {
  x: [-42, -28, -14, 0, 14, 28, 42],
  y: [0, 0, 0, 0, 0, 0, 0],
  sz: [DZ, DZ, DZ, DZ, DZ, DZ, DZ],
  op: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
};
const SCATTERED: D7 = {
  x: [32, -28, 26, -24, -18, 28, 2],
  y: [18, 22, -20, -24, 16, -12, -30],
  sz: [DZ, DZ, DZ, DZ, DZ, DZ, DZ],
  op: [0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55],
};
const TRIANGLE: D7 = {
  x: [0, 26, -13, -13, 0, 0, 0],
  y: [0, -10, 18, -10, -22, -22, 22],
  sz: [DZ, DZ, DZ, DZ, DZ, DZ, DZ],
  op: [0.5, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6],
};
const ARROW: D7 = {
  x: [-32, -18, -4, 10, 24, 36, 36],
  y: [0, 0, 0, 0, 0, -10, 10],
  sz: [DZ, DZ, DZ, DZ, DZ, DZ, DZ],
  op: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
};
// Angular order around the ring (for Chase, Metronome): B, G, D, E, F, C, A
const RING_ORDER: number[] = [1, 6, 3, 4, 5, 2, 0];
const RING_R = 28; // radius for Chase leader orbit

// ─── Dot icon variants: clear phases, smooth motion, formation changes ─────────

const thinkStatic: D7Fn = (): D7 => ({ x: [...THINK.x], y: [...THINK.y], sz: [...THINK.sz], op: [...THINK.op] });

// Breathe: radial scale in/out (positions move with scale). One full breath per half loop.
const thinkBreathe: D7Fn = (p, e): D7 => {
  const raw = (Math.sin(2 * Math.PI * p * 2) + 1) / 2;
  const s = 0.72 + 0.28 * applyEasing(raw, e);
  return {
    x: THINK.x.map(v => v * s) as D7["x"],
    y: THINK.y.map(v => v * s) as D7["y"],
    sz: THINK.sz.map(v => v * s) as D7["sz"],
    op: THINK.op.map(o => Math.min(0.95, o * (0.5 + 0.5 * s))) as D7["op"],
  };
};

// Combine: phased — move to center (0–0.42), hold (0.42–0.58), return (0.58–1). All dots move.
const thinkCombine: D7Fn = (p, e): D7 => {
  const expandEnd = 0.42;
  const holdEnd = 0.58;
  let t: number;
  if (p < expandEnd) t = applyEasing(p / expandEnd, e);
  else if (p < holdEnd) t = 1;
  else t = 1 - applyEasing((p - holdEnd) / (1 - holdEnd), e);
  return lerpD7(THINK, ONE_CENTER, t);
};

// Rotate: whole cluster rotates; positions change continuously.
const thinkRotate: D7Fn = (p, _e): D7 => {
  const rad = 2 * Math.PI * p;
  const c = Math.cos(rad);
  const s = Math.sin(rad);
  const x = THINK.x.map((v, i) => v * c + THINK.y[i] * s) as D7["x"];
  const y = THINK.x.map((v, i) => -v * s + THINK.y[i] * c) as D7["y"];
  return { x, y, sz: [...THINK.sz], op: [...THINK.op] };
};

// Pair Swap: three pairs swap positions smoothly (0↔1, 2↔3, 4↔5); dot 6 fixed.
const thinkPairSwap: D7Fn = (p, e): D7 => {
  const raw = (Math.sin(2 * Math.PI * p) + 1) / 2;
  const t = applyEasing(raw, e);
  const x: D7["x"] = [0, 0, 0, 0, 0, 0, 0];
  const y: D7["y"] = [0, 0, 0, 0, 0, 0, 0];
  [[0, 1], [2, 3], [4, 5]].forEach(([a, b]) => {
    x[a] = lerp(THINK.x[a], THINK.x[b], t);
    x[b] = lerp(THINK.x[b], THINK.x[a], t);
    y[a] = lerp(THINK.y[a], THINK.y[b], t);
    y[b] = lerp(THINK.y[b], THINK.y[a], t);
  });
  x[6] = THINK.x[6];
  y[6] = THINK.y[6];
  return { x, y, sz: [...THINK.sz], op: [...THINK.op] };
};

// Pulse: unison size and opacity; positions fixed.
const thinkPulse: D7Fn = (p, e): D7 => {
  const raw = (Math.sin(2 * Math.PI * p * 2) + 1) / 2;
  const s = 0.55 + 0.45 * applyEasing(raw, e);
  return {
    x: [...THINK.x],
    y: [...THINK.y],
    sz: THINK.sz.map(v => v * s) as D7["sz"],
    op: THINK.op.map(o => o * (0.5 + 0.5 * s)) as D7["op"],
  };
};

// Wave: dots on a horizontal line; y moves as a travelling sine. Positions change.
const thinkWave: D7Fn = (p, _e): D7 => {
  const SX: D7["x"] = [-40, -26, -12, 0, 12, 26, 40];
  const AMP = 16;
  const omega = 2 * Math.PI * 2;
  const y: D7["y"] = [0, 0, 0, 0, 0, 0, 0];
  const op: D7["op"] = [0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < 7; i++) {
    y[i] = AMP * Math.sin(omega * p + i * (Math.PI / 3));
    op[i] = 0.35 + 0.5 * ((y[i] / AMP + 1) / 2);
  }
  return { x: SX, y, sz: [...THINK.sz], op };
};

// Typewriter: left-to-right order; each dot moves from line to cluster with stagger and ease.
const thinkTypewriter: D7Fn = (p, e): D7 => {
  const order = [3, 4, 0, 5, 6, 1, 2]; // by THINK.x ascending (left to right)
  const lineStart = -44;
  const step = 14.5;
  const stagger = 0.12;
  const moveDur = 0.22;
  const x: D7["x"] = [0, 0, 0, 0, 0, 0, 0];
  const y: D7["y"] = [0, 0, 0, 0, 0, 0, 0];
  const sz: D7["sz"] = [DZ, DZ, DZ, DZ, DZ, DZ, DZ];
  const op: D7["op"] = [0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4];
  for (let i = 0; i < 7; i++) {
    const start = i * stagger;
    const local = c01((p - start) / moveDur);
    const ti = applyEasing(local, e);
    const idx = order[i];
    x[idx] = lerp(lineStart + i * step, THINK.x[idx], ti);
    y[idx] = lerp(0, THINK.y[idx], ti);
    op[idx] = lerp(0.4, THINK.op[idx], ti);
  }
  return { x, y, sz, op };
};

// Split: phased — one dot (0–0.12), then six move out (0.12–0.5), hold (0.5–0.7), back to one (0.7–1).
const thinkSplit: D7Fn = (p, e): D7 => {
  const oneEnd = 0.12;
  const expandEnd = 0.5;
  const holdEnd = 0.7;
  let t: number;
  if (p < oneEnd) t = 0;
  else if (p < expandEnd) t = applyEasing((p - oneEnd) / (expandEnd - oneEnd), e);
  else if (p < holdEnd) t = 1;
  else t = 1 - applyEasing((p - holdEnd) / (1 - holdEnd), e);
  return lerpD7(ONE_CENTER, THINK, t);
};

// Orbit: each dot orbits at its radius; angle = base + 360°×p. Positions move.
const thinkOrbit: D7Fn = (p, _e): D7 => {
  const angle0 = 2 * Math.PI * p;
  const x: D7["x"] = [0, 0, 0, 0, 0, 0, 0];
  const y: D7["y"] = [0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < 7; i++) {
    const a = (T_A[i] * Math.PI) / 180 + angle0;
    x[i] = T_R[i] * Math.cos(a);
    y[i] = -T_R[i] * Math.sin(a);
  }
  return { x, y, sz: [...THINK.sz], op: [...THINK.op] };
};

// Triangle: morph cluster ↔ triangle with symmetric in/out (mt). Hold at triangle.
const thinkTriangle: D7Fn = (p, e): D7 => {
  const t = applyEasing(mt(p), e);
  return lerpD7(THINK, TRIANGLE, t);
};

// Arrow: morph cluster ↔ arrow; symmetric, held at arrow.
const thinkArrow: D7Fn = (p, e): D7 => {
  const t = applyEasing(mt(p), e);
  return lerpD7(THINK, ARROW, t);
};

// Scatter: dots move to scattered formation then back. Symmetric, eased.
const thinkScatter: D7Fn = (p, e): D7 => {
  const t = applyEasing(mt(p), e);
  return lerpD7(THINK, SCATTERED, t);
};

// Gravity: dots fall (y += drop) then rise. Ease-in-out so slow at top/bottom, fast in middle.
const thinkGravity: D7Fn = (p, e): D7 => {
  const raw = (Math.sin(2 * Math.PI * p) + 1) / 2;
  const t = applyEasing(raw, e);
  const drop = 24 * t;
  return { x: [...THINK.x], y: THINK.y.map(v => v + drop) as D7["y"], sz: [...THINK.sz], op: [...THINK.op] };
};

// Metronome: one dot moves smoothly between ring positions (tick); others stay dim. No snap.
const thinkMetronome: D7Fn = (p, e): D7 => {
  const n = 7;
  const slot = Math.floor(p * n) % n;
  const frac = (p * n) % 1;
  const t = applyEasing(frac, e);
  const from = RING_ORDER[slot];
  const to = RING_ORDER[(slot + 1) % n];
  const tickX = lerp(THINK.x[from], THINK.x[to], t);
  const tickY = lerp(THINK.y[from], THINK.y[to], t);
  const x: D7["x"] = [tickX, THINK.x[1], THINK.x[2], THINK.x[3], THINK.x[4], THINK.x[5], THINK.x[6]];
  const y: D7["y"] = [tickY, THINK.y[1], THINK.y[2], THINK.y[3], THINK.y[4], THINK.y[5], THINK.y[6]];
  const sz: D7["sz"] = [DZ, DZ * 0.35, DZ * 0.35, DZ * 0.35, DZ * 0.35, DZ * 0.35, DZ * 0.35];
  const op: D7["op"] = [0.9, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2];
  return { x, y, sz, op };
};

// Chase: one leader dot orbits smoothly; the other six stay at ring positions, dimmed.
const thinkChase: D7Fn = (p, _e): D7 => {
  const angle = 2 * Math.PI * p;
  const leadX = RING_R * Math.cos(angle);
  const leadY = -RING_R * Math.sin(angle);
  const x: D7["x"] = [leadX, THINK.x[1], THINK.x[2], THINK.x[3], THINK.x[4], THINK.x[5], THINK.x[6]];
  const y: D7["y"] = [leadY, THINK.y[1], THINK.y[2], THINK.y[3], THINK.y[4], THINK.y[5], THINK.y[6]];
  const sz: D7["sz"] = [DZ * 1.05, DZ * 0.55, DZ * 0.55, DZ * 0.55, DZ * 0.55, DZ * 0.55, DZ * 0.55];
  const op: D7["op"] = [0.9, 0.45, 0.45, 0.45, 0.45, 0.45, 0.45];
  return { x, y, sz, op };
};

// Flock: each dot gets a small drift with different phase; positions move organically.
const thinkFlock: D7Fn = (p, _e): D7 => {
  const x: D7["x"] = [0, 0, 0, 0, 0, 0, 0];
  const y: D7["y"] = [0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < 7; i++) {
    const phase = i * 0.9;
    x[i] = THINK.x[i] + 6 * Math.sin(2 * Math.PI * p * 1.1 + phase);
    y[i] = THINK.y[i] + 5 * Math.cos(2 * Math.PI * p * 1.3 + phase * 0.7);
  }
  return { x, y, sz: [...THINK.sz], op: [...THINK.op] };
};

// Record: cluster rotates; center dot pulses. Positions move.
const thinkRecord: D7Fn = (p, _e): D7 => {
  const rad = 2 * Math.PI * p * 2;
  const c = Math.cos(rad);
  const s = Math.sin(rad);
  const x = THINK.x.map((v, i) => v * c + THINK.y[i] * s) as D7["x"];
  const y = THINK.x.map((v, i) => -v * s + THINK.y[i] * c) as D7["y"];
  const op = THINK.op.map((o, i) => (i === 0 ? 0.25 + 0.35 * (Math.sin(2 * Math.PI * p * 6) + 1) / 2 : o)) as D7["op"];
  return { x, y, sz: [...THINK.sz], op };
};

// Oscilloscope: dots on a line; y follows a travelling sine. Positions change.
const thinkOscilloscope: D7Fn = (p, _e): D7 => {
  const SX: D7["x"] = [-38, -25, -12, 0, 12, 25, 38];
  const AMP = 16;
  const y: D7["y"] = [0, 0, 0, 0, 0, 0, 0];
  const sz: D7["sz"] = [0, 0, 0, 0, 0, 0, 0];
  const op: D7["op"] = [0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < 7; i++) {
    y[i] = AMP * Math.sin(2 * Math.PI * p * 2 + i * (Math.PI / 3));
    const n = (y[i] / AMP + 1) / 2;
    sz[i] = lerp(DZ * 0.35, DZ, n);
    op[i] = lerp(0.25, 0.88, n);
  }
  return { x: SX, y, sz, op };
};

// Reverb: line layout; y follows a wave with per-dot delay (echo). Positions change.
const thinkReverb: D7Fn = (p, _e): D7 => {
  const SX: D7["x"] = [-38, -25, -12, 0, 12, 25, 38];
  const AMP = 14;
  const delay = 0.09;
  const y: D7["y"] = [0, 0, 0, 0, 0, 0, 0];
  const sz: D7["sz"] = [0, 0, 0, 0, 0, 0, 0];
  const op: D7["op"] = [0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < 7; i++) {
    const phase = (p - i * delay + 1) % 1;
    y[i] = AMP * Math.sin(2 * Math.PI * phase * 2.5);
    const w = (y[i] / AMP + 1) / 2;
    sz[i] = lerp(DZ * 0.3, DZ, w);
    op[i] = lerp(0.22, 0.82, w);
  }
  return { x: SX, y, sz, op };
};

// Standing Wave: dots on a line; y = A·cos(k·x)·sin(ω·p). Positions change.
const thinkStandingWave: D7Fn = (p, _e): D7 => {
  const SX: D7["x"] = [-38, -25, -12, 0, 12, 25, 38];
  const AMP = 15;
  const k = 0.1;
  const y: D7["y"] = [0, 0, 0, 0, 0, 0, 0];
  const sz: D7["sz"] = [0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < 7; i++) {
    y[i] = AMP * Math.cos(k * SX[i]) * Math.sin(2 * Math.PI * p * 2);
    sz[i] = lerp(DZ * 0.4, DZ, (y[i] / AMP + 1) / 2);
  }
  return { x: SX, y, sz, op: [...THINK.op] };
};

// Ripple: dots move radially in/out; center and ring out of phase. Positions change.
const thinkRipple: D7Fn = (p, e): D7 => {
  const center = (Math.sin(2 * Math.PI * p * 3) + 1) / 2;
  const outer = (Math.sin(2 * Math.PI * p * 3 - Math.PI * 0.45) + 1) / 2;
  const r0 = 0.35 + 0.65 * applyEasing(center, e);
  const r1 = 0.35 + 0.65 * applyEasing(outer, e);
  const x: D7["x"] = THINK.x.map((v, i) => v * (i === 0 ? r0 : r1)) as D7["x"];
  const y: D7["y"] = THINK.y.map((v, i) => v * (i === 0 ? r0 : r1)) as D7["y"];
  const sz: D7["sz"] = THINK.sz.map((_, i) => lerp(DZ * 0.25, DZ, i === 0 ? center : outer)) as D7["sz"];
  return { x, y, sz, op: [...THINK.op] };
};

// Lissajous: dots move along a Lissajous curve; each dot phase-offset. Positions change.
const thinkLissajous: D7Fn = (p, _e): D7 => {
  const A = 28;
  const B = 28;
  const x: D7["x"] = [0, 0, 0, 0, 0, 0, 0];
  const y: D7["y"] = [0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < 7; i++) {
    const ph = (i / 7) * 2 * Math.PI;
    x[i] = A * Math.sin(2 * 2 * Math.PI * p + ph);
    y[i] = B * Math.sin(3 * 2 * Math.PI * p + ph * 0.85);
  }
  return { x, y, sz: [DZ * 0.85, DZ * 0.85, DZ * 0.85, DZ * 0.85, DZ * 0.85, DZ * 0.85, DZ * 0.85], op: [...THINK.op] };
};

// ─── 5 variants from Figma (multi-step keyframe animations) ───────────────────
// Variant 1: From Figma Make (Replicate-Loader-Animation). Each dot follows the same 7-position orbit with staggered start; 400ms per step, easeOut.
const FIGMA_V1_POSITIONS: { x: number; y: number }[] = [
  { x: 0, y: -30 },   // 0: TOP
  { x: 25, y: -15 },  // 1: TOP-RIGHT
  { x: 25, y: 15 },   // 2: BOTTOM-RIGHT
  { x: 0, y: 30 },    // 3: BOTTOM
  { x: -25, y: 15 },  // 4: BOTTOM-LEFT
  { x: -25, y: -15 }, // 5: TOP-LEFT
  { x: 0, y: 0 },     // 6: CENTER
];
const FIGMA_V1_ORBIT = [6, 1, 0, 5, 4, 3, 2];       // orbit sequence (reversed): CENTER → TOP-RIGHT → TOP → TOP-LEFT → BOTTOM-LEFT → BOTTOM → BOTTOM-RIGHT
const FIGMA_V1_START_INDICES = [0, 4, 5, 6, 1, 2, 3]; // which orbit step each dot starts at (from Make Step1)

const thinkFigmaV1: D7Fn = (p, e): D7 => {
  const step = Math.floor(p * 7) % 7;
  const localT = (p * 7) % 1;
  const t = applyEasing(localT, e);
  const x: D7["x"] = [0, 0, 0, 0, 0, 0, 0];
  const y: D7["y"] = [0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < 7; i++) {
    const fromStep = (FIGMA_V1_START_INDICES[i] + step) % 7;
    const toStep = (FIGMA_V1_START_INDICES[i] + step + 1) % 7;
    const fromPos = FIGMA_V1_POSITIONS[FIGMA_V1_ORBIT[fromStep]];
    const toPos = FIGMA_V1_POSITIONS[FIGMA_V1_ORBIT[toStep]];
    x[i] = lerp(fromPos.x, toPos.x, t);
    y[i] = lerp(fromPos.y, toPos.y, t);
  }
  return {
    x,
    y,
    sz: [DZ, DZ, DZ, DZ, DZ, DZ, DZ] as D7["sz"],
    op: [0.82, 0.82, 0.82, 0.82, 0.82, 0.82, 0.82] as D7["op"],
  };
};

// Variant 2: From Figma Make (Load-Anim-V2). 6 keyframes, each dot has its own path; interpolate step-to-step.
const FIGMA_V2_MAKE_POSITIONS: { cx: number; cy: number }[][] = [
  [{ cx: 36, cy: 36 }, { cx: 21, cy: 27 }, { cx: 51, cy: 45 }, { cx: 36, cy: 18 }, { cx: 36, cy: 54 }, { cx: 51, cy: 27 }, { cx: 21, cy: 45 }],
  [{ cx: 51, cy: 27 }, { cx: 21, cy: 27 }, { cx: 36, cy: 54 }, { cx: 36, cy: 18 }, { cx: 36, cy: 36 }, { cx: 51, cy: 45 }, { cx: 21, cy: 45 }],
  [{ cx: 51, cy: 27 }, { cx: 21, cy: 27 }, { cx: 21, cy: 45 }, { cx: 36, cy: 18 }, { cx: 51, cy: 45 }, { cx: 36, cy: 54 }, { cx: 36, cy: 36 }],
  [{ cx: 51, cy: 27 }, { cx: 36, cy: 36 }, { cx: 21, cy: 27 }, { cx: 36, cy: 18 }, { cx: 51, cy: 45 }, { cx: 21, cy: 45 }, { cx: 36, cy: 54 }],
  [{ cx: 51, cy: 27 }, { cx: 21, cy: 45 }, { cx: 36, cy: 18 }, { cx: 36, cy: 36 }, { cx: 51, cy: 45 }, { cx: 21, cy: 27 }, { cx: 36, cy: 54 }],
  [{ cx: 36, cy: 36 }, { cx: 21, cy: 45 }, { cx: 51, cy: 27 }, { cx: 21, cy: 27 }, { cx: 51, cy: 45 }, { cx: 36, cy: 18 }, { cx: 36, cy: 54 }],
];
const make72ToOur = (cx: number, cy: number) => ({ x: (cx - 36) * (25 / 15), y: (cy - 36) * (30 / 18) });

const figmaV2Steps: D7[] = [...FIGMA_V2_MAKE_POSITIONS].reverse().map((step) => {
  const x = step.map((p) => make72ToOur(p.cx, p.cy).x) as D7["x"];
  const y = step.map((p) => make72ToOur(p.cx, p.cy).y) as D7["y"];
  return { x, y, sz: [DZ, DZ, DZ, DZ, DZ, DZ, DZ] as D7["sz"], op: [0.82, 0.82, 0.82, 0.82, 0.82, 0.82, 0.82] as D7["op"] };
});

const thinkFigmaV2: D7Fn = (p, e): D7 => {
  const n = 6;
  const step = Math.floor(p * n) % n;
  const local = (p * n) % 1;
  const t = applyEasing(local, e);
  const next = (step + 1) % n;
  return lerpD7(figmaV2Steps[step], figmaV2Steps[next], t);
};

// Variant 3: From Figma Make (Load-Anim-V3). Center dot + 6 ring dots; ring has alternating opacity [1, 0.2, 1, 0.2, 1, 0.2], rotates as a group (6 steps × 60°).
const FIGMA_V3_RING_POSITIONS: { x: number; y: number }[] = [
  { x: 0, y: -30 },   // Top (0°)
  { x: 25, y: -15 },  // Top-right (60°)
  { x: 25, y: 15 },   // Bottom-right (120°)
  { x: 0, y: 30 },    // Bottom (180°)
  { x: -25, y: 15 },  // Bottom-left (240°)
  { x: -25, y: -15 }, // Top-left (300°)
];
const FIGMA_V3_RING_OP = [1, 0.2, 1, 0.2, 1, 0.2] as const;

const thinkFigmaV3: D7Fn = (p, e): D7 => {
  const n = 6;
  const step = Math.floor(p * n) % n;
  const localT = (p * n) % 1;
  const t = applyEasing(localT, e);
  const angle = -((step + t) * (2 * Math.PI)) / n; // 6 discrete 60° steps, opposite direction
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  const x: D7["x"] = [
    0,
    FIGMA_V3_RING_POSITIONS[0].x * c - FIGMA_V3_RING_POSITIONS[0].y * s,
    FIGMA_V3_RING_POSITIONS[1].x * c - FIGMA_V3_RING_POSITIONS[1].y * s,
    FIGMA_V3_RING_POSITIONS[2].x * c - FIGMA_V3_RING_POSITIONS[2].y * s,
    FIGMA_V3_RING_POSITIONS[3].x * c - FIGMA_V3_RING_POSITIONS[3].y * s,
    FIGMA_V3_RING_POSITIONS[4].x * c - FIGMA_V3_RING_POSITIONS[4].y * s,
    FIGMA_V3_RING_POSITIONS[5].x * c - FIGMA_V3_RING_POSITIONS[5].y * s,
  ];
  const y: D7["y"] = [
    0,
    FIGMA_V3_RING_POSITIONS[0].x * s + FIGMA_V3_RING_POSITIONS[0].y * c,
    FIGMA_V3_RING_POSITIONS[1].x * s + FIGMA_V3_RING_POSITIONS[1].y * c,
    FIGMA_V3_RING_POSITIONS[2].x * s + FIGMA_V3_RING_POSITIONS[2].y * c,
    FIGMA_V3_RING_POSITIONS[3].x * s + FIGMA_V3_RING_POSITIONS[3].y * c,
    FIGMA_V3_RING_POSITIONS[4].x * s + FIGMA_V3_RING_POSITIONS[4].y * c,
    FIGMA_V3_RING_POSITIONS[5].x * s + FIGMA_V3_RING_POSITIONS[5].y * c,
  ];
  return {
    x,
    y,
    sz: [DZ, DZ, DZ, DZ, DZ, DZ, DZ] as D7["sz"],
    op: [1, FIGMA_V3_RING_OP[0], FIGMA_V3_RING_OP[1], FIGMA_V3_RING_OP[2], FIGMA_V3_RING_OP[3], FIGMA_V3_RING_OP[4], FIGMA_V3_RING_OP[5]] as D7["op"],
  };
};

// Variant 4: From Figma Make (Load-Anim-V4). 2 states: cluster (Step1) ↔ small center + large ring (Step2). Staggered morph clockwise (delays 0, 0.1..0.6), easeInOut.
const make72ToOurV4 = (cx: number, cy: number) => ({ x: (cx - 36) * (25 / 15), y: (cy - 36) * (30 / 18) });
const FIGMA_V4_STEP1: D7 = (() => {
  const step1 = [
    { cx: 36, cy: 36 }, { cx: 28, cy: 31 }, { cx: 36, cy: 25 }, { cx: 44, cy: 31 },
    { cx: 44, cy: 41 }, { cx: 36, cy: 47 }, { cx: 28, cy: 41 },
  ];
  const x = step1.map((p) => make72ToOurV4(p.cx, p.cy).x) as D7["x"];
  const y = step1.map((p) => make72ToOurV4(p.cx, p.cy).y) as D7["y"];
  return { x, y, sz: [DZ, DZ, DZ, DZ, DZ, DZ, DZ] as D7["sz"], op: [0.82, 0.82, 0.82, 0.82, 0.82, 0.82, 0.82] as D7["op"] };
})();
const FIGMA_V4_STEP2: D7 = (() => {
  const step2 = [
    { cx: 36, cy: 36 }, { cx: 21, cy: 27 }, { cx: 36, cy: 18 }, { cx: 51, cy: 27 },
    { cx: 51, cy: 45 }, { cx: 36, cy: 54 }, { cx: 21, cy: 45 },
  ];
  const x = step2.map((p) => make72ToOurV4(p.cx, p.cy).x) as D7["x"];
  const y = step2.map((p) => make72ToOurV4(p.cx, p.cy).y) as D7["y"];
  const sz: D7["sz"] = [DZ * (2 / 3), DZ * (4 / 3), DZ * (4 / 3), DZ * (4 / 3), DZ * (4 / 3), DZ * (4 / 3), DZ * (4 / 3)];
  return { x, y, sz, op: [0.82, 0.82, 0.82, 0.82, 0.82, 0.82, 0.82] as D7["op"] };
})();
const FIGMA_V4_STAGGER = 0.1 / 1.4; // delay per dot (Make: duration 1.4, delays 0..0.6)

const thinkFigmaV4: D7Fn = (p, e): D7 => {
  const x: D7["x"] = [0, 0, 0, 0, 0, 0, 0];
  const y: D7["y"] = [0, 0, 0, 0, 0, 0, 0];
  const sz: D7["sz"] = [DZ, DZ, DZ, DZ, DZ, DZ, DZ];
  for (let i = 0; i < 7; i++) {
    const phase = (p + i * FIGMA_V4_STAGGER) % 1;
    const tRaw = phase < 0.5 ? phase * 2 : 2 - phase * 2; // step1→step2→step1
    const t = applyEasing(tRaw, e);
    x[i] = lerp(FIGMA_V4_STEP1.x[i], FIGMA_V4_STEP2.x[i], t);
    y[i] = lerp(FIGMA_V4_STEP1.y[i], FIGMA_V4_STEP2.y[i], t);
    sz[i] = lerp(FIGMA_V4_STEP1.sz[i], FIGMA_V4_STEP2.sz[i], t);
  }
  return { x, y, sz, op: [...FIGMA_V4_STEP1.op] };
};

// Variant 6: Load-Anim-V4 — 2-state cluster ↔ small center + large ring. All outer dots grow/shrink together; 200ms delay then 200ms ease-out transition (encoded as 50% delay / 50% transition per half-cycle).
const thinkFigmaV6: D7Fn = (p, _e): D7 => {
  // Per half-cycle: first 50% = delay (hold), second 50% = transition (ease-out)
  const half = p < 0.5;
  const segment = half ? p * 2 : (p - 0.5) * 2; // 0..1 within half
  const inDelay = segment < 0.5;
  const localT = inDelay ? 0 : (segment - 0.5) / 0.5; // 0..1 over transition only
  const tEased = applyEasing(localT, "ease-out");
  const t = half ? (inDelay ? 0 : tEased) : (inDelay ? 1 : 1 - tEased);
  return {
    x: FIGMA_V4_STEP1.x.map((_, i) => lerp(FIGMA_V4_STEP1.x[i], FIGMA_V4_STEP2.x[i], t)) as D7["x"],
    y: FIGMA_V4_STEP1.y.map((_, i) => lerp(FIGMA_V4_STEP1.y[i], FIGMA_V4_STEP2.y[i], t)) as D7["y"],
    sz: FIGMA_V4_STEP1.sz.map((_, i) => lerp(FIGMA_V4_STEP1.sz[i], FIGMA_V4_STEP2.sz[i], t)) as D7["sz"],
    op: [...FIGMA_V4_STEP1.op],
  };
};

// Variant 5: From Figma Make (Implement-Loader-Animation). 4 steps: cluster → expanded hex → cluster rotated 60° CW → expanded rotated 60° CW. Clockwise, 400ms per step.
const make72ToOurV5 = (cx: number, cy: number) => ({ x: (cx - 36) * (25 / 15), y: (cy - 36) * (30 / 18) });
const FIGMA_V5_MAKE_STEPS: { cx: number; cy: number; r: number }[][] = [
  [
    { cx: 36, cy: 36, r: 3 }, { cx: 28, cy: 31, r: 3 }, { cx: 36, cy: 25, r: 3 }, { cx: 44, cy: 31, r: 3 },
    { cx: 44, cy: 41, r: 3 }, { cx: 36, cy: 47, r: 3 }, { cx: 28, cy: 41, r: 3 },
  ],
  [
    { cx: 36, cy: 36, r: 2 }, { cx: 21, cy: 27, r: 4 }, { cx: 36, cy: 18, r: 4 }, { cx: 51, cy: 27, r: 4 },
    { cx: 51, cy: 45, r: 4 }, { cx: 36, cy: 54, r: 4 }, { cx: 21, cy: 45, r: 4 },
  ],
  [
    { cx: 36, cy: 36, r: 3 }, { cx: 36, cy: 25, r: 3 }, { cx: 44, cy: 31, r: 3 }, { cx: 44, cy: 41, r: 3 },
    { cx: 36, cy: 47, r: 3 }, { cx: 28, cy: 41, r: 3 }, { cx: 28, cy: 31, r: 3 },
  ],
  [
    { cx: 36, cy: 36, r: 2 }, { cx: 36, cy: 18, r: 4 }, { cx: 51, cy: 27, r: 4 }, { cx: 51, cy: 45, r: 4 },
    { cx: 36, cy: 54, r: 4 }, { cx: 21, cy: 45, r: 4 }, { cx: 21, cy: 27, r: 4 },
  ],
];

const figmaV5Steps: D7[] = FIGMA_V5_MAKE_STEPS.map((step) => {
  const x = step.map((p) => make72ToOurV5(p.cx, p.cy).x) as D7["x"];
  const y = step.map((p) => make72ToOurV5(p.cx, p.cy).y) as D7["y"];
  const sz = step.map((p) => (p.r === 2 ? DZ * (2 / 3) : p.r === 4 ? DZ * (4 / 3) : DZ)) as D7["sz"];
  return { x, y, sz, op: [0.82, 0.82, 0.82, 0.82, 0.82, 0.82, 0.82] as D7["op"] };
});

const thinkFigmaV5: D7Fn = (p, e): D7 => {
  const n = 4;
  const step = Math.floor(p * n) % n;
  const local = (p * n) % 1;
  const t = applyEasing(local, e);
  const next = (step + 1) % n;
  return lerpD7(figmaV5Steps[step], figmaV5Steps[next], t);
};

// Explore (2-step): top 4 + bottom 4 dots; dots move between 2 positions only (left <-> right). Saved as separate variant.
const thinkExploreTwoStep: D7Fn = (p, e): D7 => {
  const t = applyEasing(p, e);
  const x: D7["x"] = [0, 0, 0, 0, 0, 0, 0];
  const y: D7["y"] = [0, 0, 0, 0, 0, 0, 0];
  const sz: D7["sz"] = [DZ, DZ, DZ, DZ, DZ, DZ, DZ];
  const op: D7["op"] = [1, 1, 1, 1, 1, 1, 1];

  const topPos: { x: number; y: number }[] = [
    { x: -25, y: 15 },  // 0 left
    { x: 25, y: 15 },   // 1 right
  ];
  const bottomPos: { x: number; y: number }[] = [
    { x: -25, y: -15 }, // 0 left
    { x: 25, y: -15 },  // 1 right
  ];
  const n = 2;

  const posAt = (positions: { x: number; y: number }[], slotIndex: number) => {
    const phase = (slotIndex / n + t) % 1;
    const k = Math.floor(phase * n) % n;
    const next = (k + 1) % n;
    const frac = (phase * n) % 1;
    return {
      x: lerp(positions[k].x, positions[next].x, frac),
      y: lerp(positions[k].y, positions[next].y, frac),
    };
  };

  for (let i = 0; i < 4; i++) {
    const q = posAt(topPos, i);
    x[i] = q.x;
    y[i] = q.y;
  }
  const b0 = posAt(bottomPos, 0);
  const b1 = posAt(bottomPos, 1);
  const b2 = posAt(bottomPos, 2);
  const b3 = posAt(bottomPos, 3);
  x[4] = b1.x; y[4] = b1.y;
  x[5] = b2.x; y[5] = b2.y;
  x[6] = b3.x; y[6] = b3.y;
  return {
    x: [...x, b0.x] as unknown as D7["x"],
    y: [...y, b0.y] as unknown as D7["y"],
    sz: [...sz, DZ] as unknown as D7["sz"],
    op: [...op, 1] as unknown as D7["op"],
  };
};

// Explore: top 4 dots and bottom 4 dots (8 in two groups), sharing one center. Cycle: bottom → left → top → right → bottom.
// Split in two with separate ease-out: (1) bottom → left → top, (2) top → right → bottom.
const thinkExplore: D7Fn = (p, e): D7 => {
  const x: D7["x"] = [0, 0, 0, 0, 0, 0, 0];
  const y: D7["y"] = [0, 0, 0, 0, 0, 0, 0];
  const sz: D7["sz"] = [DZ, DZ, DZ, DZ, DZ, DZ, DZ];
  const op: D7["op"] = [1, 1, 1, 1, 1, 1, 1];

  const topPos: { x: number; y: number }[] = [
    { x: -25, y: 15 },  // 0 left
    { x: 0, y: 30 },    // 1 top
    { x: 25, y: 15 },   // 2 right
    { x: 0, y: 0 },     // 3 bottom = center (shared)
  ];
  const bottomPos: { x: number; y: number }[] = [
    { x: -25, y: -15 }, // 0 left
    { x: 0, y: 0 },     // 1 top = center (shared)
    { x: 25, y: -15 },  // 2 right
    { x: 0, y: -30 },   // 3 bottom
  ];
  const n = 4;
  // Path order: bottom(3) → left(0) → top(1) → right(2) → bottom(3)
  const order = [3, 0, 1, 2];

  // Two segments, each with its own ease-out at the end.
  let phase: number;
  if (p < 0.5) {
    const local = (p * 2); // 0 to 1 over first half
    const eased = applyEasing(local, e);
    phase = eased * 0.5; // 0 to 0.5: bottom → left → top
  } else {
    const local = (p - 0.5) * 2; // 0 to 1 over second half
    const eased = applyEasing(local, e);
    phase = 0.5 + eased * 0.5; // 0.5 to 1: top → right → bottom
  }

  const posAt = (positions: { x: number; y: number }[], slotIndex: number) => {
    const slotPhase = (slotIndex / n + phase) % 1;
    const seg = Math.floor(slotPhase * n) % n;
    const next = (seg + 1) % n;
    const frac = (slotPhase * n) % 1;
    const k = order[seg];
    const kNext = order[next];
    return {
      x: lerp(positions[k].x, positions[kNext].x, frac),
      y: lerp(positions[k].y, positions[kNext].y, frac),
    };
  };

  // Bottom-only opacity: left/right/bottom = 100%, top = 20%. Interpolate on left→top (100→20) and top→right (20→100).
  const opacityForBottom = (seg: number, frac: number): number => {
    if (seg === 1) return lerp(1, 0.2, frac);   // left → top
    if (seg === 2) return lerp(0.2, 1, frac);   // top → right
    return 1;                                    // bottom→left, right→bottom
  };

  for (let i = 0; i < 4; i++) {
    const q = posAt(topPos, i);
    x[i] = q.x;
    y[i] = q.y;
  }
  const bottomSlotPhase = (slotIndex: number) => {
    const slotPhase = (slotIndex / n + phase) % 1;
    const seg = Math.floor(slotPhase * n) % n;
    const frac = (slotPhase * n) % 1;
    return { seg, frac };
  };
  const b0 = posAt(bottomPos, 0);
  const b1 = posAt(bottomPos, 1);
  const b2 = posAt(bottomPos, 2);
  const b3 = posAt(bottomPos, 3);
  x[4] = b1.x; y[4] = b1.y;
  x[5] = b2.x; y[5] = b2.y;
  x[6] = b3.x; y[6] = b3.y;
  op[4] = opacityForBottom(bottomSlotPhase(1).seg, bottomSlotPhase(1).frac);
  op[5] = opacityForBottom(bottomSlotPhase(2).seg, bottomSlotPhase(2).frac);
  op[6] = opacityForBottom(bottomSlotPhase(3).seg, bottomSlotPhase(3).frac);
  const op8 = opacityForBottom(bottomSlotPhase(0).seg, bottomSlotPhase(0).frac);
  return {
    x: [...x, b0.x] as unknown as D7["x"],
    y: [...y, b0.y] as unknown as D7["y"],
    sz: [...sz, DZ] as unknown as D7["sz"],
    op: [...op, op8] as unknown as D7["op"],
  };
};

const THINK_ANIMS: { name: string; fn: D7Fn; desc: string }[] = [
  { name: "Breathe", fn: thinkBreathe, desc: "Radial scale in/out; positions move with scale" },
  { name: "Combine", fn: thinkCombine, desc: "Dots move to center, hold, then return" },
  { name: "Pair Swap", fn: thinkPairSwap, desc: "Three pairs swap positions smoothly" },
  { name: "Pulse", fn: thinkPulse, desc: "Unison size and opacity pulse" },
  { name: "Wave", fn: thinkWave, desc: "Horizontal line; y travels as sine wave" },
  { name: "Typewriter", fn: thinkTypewriter, desc: "Left-to-right; each dot moves from line to cluster" },
  { name: "Split", fn: thinkSplit, desc: "One dot → six move out to cluster, hold, then back" },
  { name: "Orbit", fn: thinkOrbit, desc: "Each dot orbits at its own radius" },
  { name: "Arrow", fn: thinkArrow, desc: "Morph to arrow formation and back" },
  { name: "Chase", fn: thinkChase, desc: "One leader orbits; others stay dim at ring" },
  { name: "Flock", fn: thinkFlock, desc: "Each dot drifts with different phase" },
  { name: "Record", fn: thinkRecord, desc: "Cluster rotates; center pulses" },
  { name: "Oscilloscope", fn: thinkOscilloscope, desc: "Line; y as travelling sine" },
  { name: "Reverb", fn: thinkReverb, desc: "Line; y wave with per-dot delay" },
  { name: "Standing Wave", fn: thinkStandingWave, desc: "Line; y as standing wave" },
  { name: "Ripple", fn: thinkRipple, desc: "Radial in/out; center and ring out of phase" },
  { name: "Lissajous", fn: thinkLissajous, desc: "Dots follow Lissajous path" },
  { name: "Figma V1", fn: thinkFigmaV1, desc: "7-dot orbit (Make: Replicate-Loader-Animation)" },
  { name: "Figma V2", fn: thinkFigmaV2, desc: "6 steps (Make: Load-Anim-V2)" },
  { name: "Figma V3", fn: thinkFigmaV3, desc: "Center + 6 ring, alternating op; ring rotates (Make: Load-Anim-V3)" },
  { name: "Figma V4", fn: thinkFigmaV4, desc: "2-state morph, staggered clockwise (Make: Load-Anim-V4)" },
  { name: "Figma V5", fn: thinkFigmaV6, desc: "2-state morph, all dots in sync; delay + ease-out transition (Make: Load-Anim-V4)" },
  { name: "Figma V6", fn: thinkFigmaV5, desc: "4 steps: cluster ↔ hex, rotate CW (Make: Implement-Loader-Animation)" },
  { name: "Explore", fn: thinkExplore, desc: "Top 4 + bottom 4; bottom→left→top (ease-out) then top→right→bottom (ease-out)" },
  { name: "Explore 2-step", fn: thinkExploreTwoStep, desc: "Top 4 + bottom 4; dots move between 2 positions only (left <-> right)" },
];

const ANIMS: { name: string; fn: AnimFn; desc: string }[] = [
  { name: "Assembly",    fn: a1,  desc: "9-phase robotic build and collapse" },
  { name: "Bloom",       fn: a2,  desc: "All 6 circles open simultaneously" },
  { name: "Weave",       fn: a3,  desc: "Even circles CW, odd CCW — Star of David midpoint" },
  { name: "Orbit",       fn: a5,  desc: "Full CW revolution while growing" },
  { name: "Ripple",      fn: a6,  desc: "Sequential pinwheel fill with CCW swoop" },
  { name: "Materialize", fn: a11, desc: "Grow in-place at flower positions" },
  { name: "Formation",   fn: b6,  desc: "Morphs: flower → cluster → rotated → triangle" },
  { name: "Warp",        fn: b8,  desc: "Implode → pause → explode 1.4× → settle" },
];

// ─── unified animation registry ───────────────────────────────────────────────
type AnyAnim =
  | { kind: "c6"; name: string; fn: AnimFn; desc: string }
  | { kind: "d7"; name: string; fn: D7Fn;   desc: string };

const ALL_ANIMS: AnyAnim[] = [
  ...ANIMS.map(a       => ({ kind: "c6" as const, ...a })),
  ...THINK_ANIMS.map(a => ({ kind: "d7" as const, ...a })),
];

// ─── AnimView ─────────────────────────────────────────────────────────────────
// Renders 6 independent circles from a C6 polar state scaled to viewSize×viewSize.
// Polar → screen: x = CX + r·cos(a°),  y = CY − r·sin(a°)
function AnimView({ state, viewSize, bw, opacity = 1 }: { state: C6; viewSize: number; bw: number; opacity?: number }) {
  const scale = viewSize / 100;
  const rad   = (d: number) => (d * Math.PI) / 180;
  const borderColor = opacity === 1 ? "black" : `rgba(0,0,0,${opacity})`;

  return (
    <div className="relative shrink-0" style={{ width: viewSize, height: viewSize }}>
      {state.r.map((r, i) => {
        const sz = state.sz[i] * scale;
        const cx = (CX + r * Math.cos(rad(state.a[i]))) * scale;
        const cy = (CY - r * Math.sin(rad(state.a[i]))) * scale;
        const hr = sz / 2;
        return (
          <div
            key={i}
            className="absolute rounded-full bg-transparent"
            style={{
              width:    sz,
              height:   sz,
              left:     cx - hr,
              top:      cy - hr,
              boxShadow: `inset 0 0 0 ${bw}px ${borderColor}`,
            }}
          />
        );
      })}
    </div>
  );
}

// ─── ThinkView ────────────────────────────────────────────────────────────────
// Renders 7 solid filled dots from a D7 state. Dots are black with variable opacity.
// Screen mapping: screen_x = (CX + x)·scale,  screen_y = (CY − y)·scale
function ThinkView({ state, viewSize, opacity = 1 }: { state: D7; viewSize: number; opacity?: number }) {
  const scale = viewSize / 100;
  return (
    <div className="relative shrink-0" style={{ width: viewSize, height: viewSize }}>
      {state.x.map((x, i) => {
        const sz = state.sz[i] * scale;
        const cx = (CX + x) * scale;
        const cy = (CY - state.y[i]) * scale;
        const hr = sz / 2;
        return (
          <div
            key={i}
            className="absolute rounded-full bg-black"
            style={{ width: sz, height: sz, left: cx - hr, top: cy - hr, opacity: state.op[i] * opacity }}
          />
        );
      })}
    </div>
  );
}

// ─── page ─────────────────────────────────────────────────────────────────────
export default function AgentLoaderExperiment() {
  const [progress,      setProgress]      = useState(0);
  const [isScrubbing,   setIsScrubbing]   = useState(false);
  const [isPlaying,     setIsPlaying]     = useState(true);
  const [durationSpeed, setDurationSpeed] = useState(() => durationToSpeed(4000));
  const [easing,        setEasing]        = useState<EasingId>("ease-out");
  const [selectedAnim,  setSelectedAnim]  = useState(0);

  const startTimeRef = useRef<number>(0);
  const rafRef       = useRef<number>(0);
  const durationMs   = speedToDuration(durationSpeed);

  const tick = useCallback(() => {
    if (isScrubbing || !isPlaying) return;
    const elapsed = (performance.now() - startTimeRef.current) / durationMs;
    setProgress(elapsed % 1);
    rafRef.current = requestAnimationFrame(tick);
  }, [durationMs, isScrubbing, isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;
    startTimeRef.current = performance.now() - progress * durationMs;
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick, isPlaying]);

  const togglePlayPause = useCallback(() => {
    setIsPlaying(prev => {
      if (!prev) startTimeRef.current = performance.now() - progress * durationMs;
      return !prev;
    });
  }, [progress, durationMs]);

  const handleScrubChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsScrubbing(true);
    setProgress(Number(e.target.value) / 100);
  };
  const releaseScrubber = () => {
    setIsScrubbing(false);
    startTimeRef.current = performance.now() - progress * durationMs;
  };

  const entry = ALL_ANIMS[selectedAnim];

  const smallViewSize = 24;

  return (
    <div
      className={`${inter.className} relative flex min-h-screen bg-white text-neutral-800 antialiased`}
      style={{ fontSize: 14, lineHeight: "20px", fontWeight: 600 }}
    >
      <Link
        href="/experiments"
        className="absolute left-6 top-6 z-10 flex h-5 items-center text-neutral-500 transition-colors hover:text-neutral-900"
      >
        ← Back to experiments
      </Link>

      {/* Left: variant list (2 columns, text only) + controls at bottom */}
      <aside className="flex w-56 shrink-0 flex-col border-r border-neutral-200 min-w-0">
        <div className="flex-1 overflow-y-auto px-3 pt-14 pb-4">
          {(["c6", "d7"] as const).map(kind => {
            const label   = kind === "c6" ? "Circle icon" : "Dot icon";
            const entries = ALL_ANIMS.map((a, i) => ({ ...a, i })).filter(a => a.kind === kind);
            return (
              <div key={kind} className="mb-4">
                <p className="mb-2 text-[10px] uppercase tracking-widest text-neutral-400">{label}</p>
                <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
                  {entries.map(({ name, i }) => (
                    <button
                      key={i}
                      onClick={() => setSelectedAnim(i)}
                      className={`truncate rounded px-1.5 py-1 text-left text-[11px] transition-colors ${
                        selectedAnim === i
                          ? "bg-neutral-100 text-neutral-900"
                          : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700"
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="shrink-0 min-w-0 overflow-hidden border-t border-neutral-200 p-3">
          <div className="flex min-w-0 flex-col gap-2">
            <div className="flex h-6 min-w-0 items-center gap-2">
              <button
                type="button"
                onClick={togglePlayPause}
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded border border-neutral-200 bg-white text-neutral-800 transition-colors hover:bg-neutral-50"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying
                  ? <span className="text-[10px] font-semibold">II</span>
                  : <span className="ml-0.5 text-[10px] font-semibold">▶</span>}
              </button>
              <label htmlFor="timeline" className="shrink-0 text-[10px] leading-none">Timeline</label>
              <input
                id="timeline"
                type="range" min={0} max={100}
                value={Math.round(progress * 100)}
                onChange={handleScrubChange}
                onMouseUp={releaseScrubber}
                onTouchEnd={releaseScrubber}
                className="range-knob-9 h-[5px] min-h-0 min-w-0 flex-1 appearance-none rounded-full bg-neutral-200 accent-blue-600"
              />
              <span className="w-7 shrink-0 text-right text-[10px] text-neutral-500 leading-none">
                {Math.round(progress * 100)}%
              </span>
            </div>
            <div className="flex h-6 min-w-0 items-center gap-2">
              <div className="w-6 shrink-0" />
              <label htmlFor="duration" className="shrink-0 text-[10px] leading-none">Duration</label>
              <input
                id="duration"
                type="range" min={0} max={100}
                value={durationSpeed}
                onChange={e => setDurationSpeed(Number(e.target.value))}
                className="range-knob-9 h-[5px] min-h-0 min-w-0 flex-1 appearance-none rounded-full bg-neutral-200 accent-blue-600"
              />
              <span className="w-7 shrink-0 text-right text-[10px] text-neutral-500 leading-none">
                {(durationMs / 1000).toFixed(1)}s
              </span>
            </div>
            <div className="flex h-6 min-w-0 items-center gap-2">
              <div className="w-6 shrink-0" />
              <label htmlFor="easing" className="shrink-0 text-[10px] leading-none">Easing</label>
              <select
                id="easing"
                value={easing}
                onChange={e => setEasing(e.target.value as EasingId)}
                className="h-6 min-w-0 flex-1 rounded border border-neutral-200 bg-white px-2 text-[11px] text-neutral-800"
              >
                {EASINGS.map(opt => (
                  <option key={opt.id} value={opt.id}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </aside>

      {/* Center: big animation, then small + "Overthinking…" */}
      <main className="flex min-h-0 flex-1 flex-col items-center justify-center gap-10 overflow-y-auto px-6 py-12">
        {/* Big animation */}
        {entry.kind === "c6"
          ? <AnimView  state={entry.fn(progress, easing) as C6} viewSize={160} bw={BP} />
          : <ThinkView state={entry.fn(progress, easing) as D7} viewSize={160} />}

        {/* Small version with label on the right */}
        <div className="flex items-center gap-1">
          {entry.kind === "c6"
            ? <AnimView  state={entry.fn(progress, easing) as C6} viewSize={smallViewSize} bw={1.25} opacity={0.48} />
            : <ThinkView state={entry.fn(progress, easing) as D7} viewSize={smallViewSize} opacity={0.48} />}
          <span
            className={inter.className}
            style={{ fontSize: 14, lineHeight: "20px", fontWeight: 400, color: "rgba(0,0,0,0.64)" }}
          >
            Overthinking…
          </span>
        </div>
      </main>
    </div>
  );
}
