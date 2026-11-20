---
name: web-animation-css-animations
description: CSS animation patterns — transitions, keyframes, scroll-driven animations, View Transitions API, GPU-accelerated properties, accessibility with prefers-reduced-motion. Practical CSS animation patterns and best practices for performant, accessible web motion.
---

# CSS Animation Patterns

> **Quick Guide:** Use CSS transitions for state changes (hover, focus), CSS animations with @keyframes for autonomous/looping animations, scroll-driven animations for scroll-linked effects, and View Transitions API for page/view transitions. Animate only `transform` and `opacity` for 60fps performance.

## CRITICAL Requirements

- **Animate ONLY transform and opacity** for GPU-accelerated 60fps performance
- **Respect prefers-reduced-motion** using media queries or `@media (prefers-reduced-motion: no-preference)`
- **Use named constants (CSS custom properties) for ALL timing values** — NO magic numbers
- **Use ease-out for enter animations and ease-in for exit animations** — NEVER linear for UI
- **Remove will-change after animation completes** — permanent will-change wastes GPU memory

**When to use:** simple state change animations (hover, focus, active); autonomous looping animations (spinners, pulses, attention grabbers); scroll-linked animations and parallax effects; page/view transitions between routes; micro-interactions that don't need JavaScript control.

**When NOT to use:** animations requiring JavaScript control (pause, reverse, seek) — consider Web Animations API; complex orchestrated animations with staggered timing — consider your animation library; physics-based spring animations; drag-and-drop animations.

## Philosophy

CSS animations leverage the browser's compositor thread for smooth, 60fps animations that don't block JavaScript execution. By animating only GPU-accelerated properties (`transform` and `opacity`), animations run on a separate thread from the main JavaScript thread.

**Core principles:**

1. **Performance first** — Animate only `transform` and `opacity` to avoid layout/paint triggers
2. **Accessibility built-in** — Always respect `prefers-reduced-motion` user preferences
3. **Transitions for state changes** — Use CSS transitions for hover, focus, and state-driven animations
4. **Keyframes for autonomous motion** — Use @keyframes for animations that loop, auto-play, or have multiple steps
5. **Design tokens for consistency** — Use CSS custom properties for durations, easings, and distances

## Core Patterns

### Pattern 1: CSS Transitions for State Changes

CSS transitions animate property changes between two states. Use for hover effects, focus states, and interactive feedback.

#### Duration Tokens

```css
:root {
  /* Duration tokens */
  --duration-instant: 100ms;
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 400ms;
  --duration-slower: 600ms;

  /* Easing tokens */
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);

  /* Distance tokens */
  --lift-sm: -2px;
  --lift-md: -4px;
  --lift-lg: -8px;
}
```

#### Implementation

```css
/* Good Example - GPU-accelerated hover effect */
.card {
  transition:
    transform var(--duration-fast) var(--ease-out),
    opacity var(--duration-fast) var(--ease-out);
}
.card:hover { transform: translateY(var(--lift-md)) scale(1.02); }
.card:active { transform: translateY(0) scale(0.98); }
```

**Why good:** Only animates transform (GPU-accelerated), uses design tokens for timing, provides tactile feedback on both hover and active states.

```css
/* Bad Example - Layout-triggering properties */
.card { transition: all 0.3s linear; }
.card:hover { top: -8px; margin-top: -8px; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3); }
```

**Why bad:** `top` and `margin-top` trigger expensive layout recalculations every frame, `all` transitions unnecessary properties, `linear` feels robotic, magic number `0.3s`.

### Pattern 2: CSS @keyframes for Autonomous Animations

Use @keyframes for animations that loop, auto-play on mount, or have more than two states.

```css
/* Looping spinner */
@keyframes spin { to { transform: rotate(360deg); } }
.spinner { --spinner-duration: 1s; animation: spin var(--spinner-duration) linear infinite; }

/* Pulse */
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
.notification-dot { --pulse-duration: 1.5s; animation: pulse var(--pulse-duration) ease-in-out infinite; }

/* Slide-in enter */
@keyframes slide-in {
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
.modal { --modal-enter-duration: 300ms; animation: slide-in var(--modal-enter-duration) var(--ease-out) forwards; }
```

### Pattern 3: GPU-Accelerated Shadow Animation

Animating `box-shadow` triggers expensive repaints. Use a pseudo-element with animated opacity instead.

```css
.card { position: relative; }
.card::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity var(--duration-fast) var(--ease-out);
  pointer-events: none;
}
.card:hover::after { opacity: 1; }
```

### Pattern 4: Staggered List Animations

Use CSS custom properties with `animation-delay` for staggered effects without JavaScript.

```css
@keyframes fade-slide-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.list-item {
  --stagger-delay: 50ms;
  --item-duration: 300ms;
  animation: fade-slide-in var(--item-duration) var(--ease-out) backwards;
  animation-delay: calc(var(--index) * var(--stagger-delay));
}
```

```html
<li class="list-item" style="--index: 0">First</li>
<li class="list-item" style="--index: 1">Second</li>
<li class="list-item" style="--index: 2">Third</li>
```

**Why good:** `backwards` fill mode shows initial state before animation starts, CSS handles timing cascade, minimal JavaScript (just setting index).

### Pattern 5: Prefers-Reduced-Motion Accessibility

Always respect user motion preferences. Two approaches: remove motion or provide safe alternatives.

Approach 1 — Progressive enhancement (recommended): base state has no animation; apply motion only under `@media (prefers-reduced-motion: no-preference)`.

Approach 2 — Global disable:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Approach 3 — Safe alternative animations: full motion under `no-preference`; under `reduce`, a shorter fade-only version of the same keyframes.

### Pattern 6: Will-Change Optimization

Use `will-change` sparingly and remove it after animation completes.

```css
/* Good: apply only when needed */
.card:hover { will-change: transform; transform: scale(1.05); }
.card.is-animating { will-change: transform, opacity; }

/* Bad: permanent or global will-change — each element creates a GPU layer (~307KB per 320x240px element); wastes GPU memory, can crash mobile browsers */
```

### Pattern 7: @property for Animating Custom Properties

Use CSS Houdini's @property to animate custom properties like gradient angles.

```css
@property --gradient-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}
.gradient-border {
  --gradient-duration: 3s;
  background: linear-gradient(var(--gradient-angle), #ff0080, #7928ca);
  animation: rotate-gradient var(--gradient-duration) linear infinite;
}
@keyframes rotate-gradient { to { --gradient-angle: 360deg; } }
```

Browser support: Chrome 85+, Edge 85+, Safari 15.4+, Firefox 128+.

## Performance Optimization

### The 16.67ms Budget

For 60fps, each frame must complete in 16.67ms. Layout-triggering animations often exceed this budget.

### Properties by Performance Impact

| Category | Properties | Impact |
| --- | --- | --- |
| **Composite only (Best)** | transform, opacity | No layout, no paint, GPU-accelerated |
| **Paint only (Okay)** | color, background-color, visibility | No layout, but repaints |
| **Layout + Paint (Avoid)** | width, height, margin, padding, top, left | Full page recalculation |

### Duration Guidelines

| Animation Type | Duration | Reason |
| --- | --- | --- |
| Micro-interactions | 100-200ms | Feels instant |
| UI transitions | 200-300ms | Sweet spot for perception |
| Page transitions | 300-500ms | Noticeable but not slow |
| Complex sequences | 500-1000ms | Story-telling moments |

### Transform Mapping

| Instead of... | Use... |
| --- | --- |
| `top`, `left` | `translate(x, y)` |
| `width`, `height` | `scale()` |
| `margin`, `padding` | `translate()` or layout animation |

## Decision Framework

### When to Use Transitions vs Animations

```
Is the animation triggered by user interaction?
├─ YES → Is it a simple A→B state change?
│   ├─ YES → CSS Transition ✓
│   └─ NO → Does it need multiple steps?
│       ├─ YES → CSS Animation with @keyframes
│       └─ NO → CSS Transition is fine
└─ NO → Does it auto-play or loop?
    ├─ YES → CSS Animation with @keyframes ✓
    └─ NO → CSS Transition (triggered by class toggle)
```

### When to Use which Easing

```
What type of motion?
├─ Element entering → ease-out (fast start, slow end) ✓
├─ Element exiting → ease-in (slow start, fast end) ✓
├─ Symmetric motion → ease-in-out
├─ Continuous rotation → linear ✓
├─ Playful/bouncy → custom cubic-bezier with overshoot
└─ Default UI → ease-out ✓
```

### Which Property to Animate

```
Need movement?
├─ Position change → transform: translate()
├─ Grow/shrink → transform: scale()
├─ Rotation → transform: rotate()
└─ Visibility → opacity

Need to avoid?
├─ Size change → Never animate width/height (use scale)
├─ Position → Never animate top/left (use translate)
└─ Shadow → Use pseudo-element opacity technique
```

## Integration Guide

CSS animations are framework-agnostic: any component framework (via className or style), CSS Modules, utility CSS, and design systems (animation tokens integrate into token systems). CSS complements JavaScript animation libraries: use CSS for simple state transitions, your library for complex orchestration; both can coexist in the same application.

## CRITICAL REMINDERS

- Animate ONLY transform and opacity for GPU-accelerated 60fps performance
- Respect prefers-reduced-motion using media queries or `@media (prefers-reduced-motion: no-preference)`
- Use named constants (CSS custom properties) for ALL timing values — NO magic numbers
- Use ease-out for enter animations and ease-in for exit animations — NEVER linear for UI
- Remove will-change after animation completes — permanent will-change wastes GPU memory

Failure to follow these rules will cause jank, accessibility issues, and degraded user experience.
