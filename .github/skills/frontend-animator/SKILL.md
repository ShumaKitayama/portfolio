---
name: frontend-animator
description: Produce smooth, stable, 60fps animations for web UIs and browser games — React-first, with Vanilla JS/Canvas, Vite, and PHP asset wiring. Use when adding motion, transitions, micro-interactions, sprite/Canvas game loops, scroll choreography, or interactive character animations; when picking an animation library (Motion/GSAP/React Spring/Rive/Lottie/AutoAnimate); when converting a static UI to feel alive; or when debugging jank, dropped frames, will-change/GPU memory bloat, or rAF loop issues. Covers the 2026 stack, performance budgets, prefers-reduced-motion, and pixel-perfect rendering.
---

# Frontend Animator — Motion Expert

A pro animation skill for the web: UI/UX motion **and** game animation, with a relentless focus on **stability and smoothness** (60fps, no jank, no GPU memory leaks). React is the primary surface; Vanilla JS, Vite, and PHP asset wiring are covered where they matter.

## When to use this skill

Apply automatically when the user mentions: animation, transition, motion, micro-interaction, sprite, Canvas, `requestAnimationFrame`, game loop, scroll-driven, parallax, mascot, loader, jank, dropped frames, `will-change`, Framer Motion / Motion, GSAP, React Spring, Rive, Lottie, AutoAnimate, or "make it feel alive / smooth / juicy."

## The one rule that overrides everything

> **Animate only `transform` and `opacity`.** Everything else risks layout/paint on the main thread and dropped frames.

- `transform` (translate/scale/rotate/skew) and `opacity` are **compositor-only** — the GPU moves an already-painted layer. No layout, no paint.
- `width/height/top/left/margin/font-size` trigger **layout** → paint → composite (slowest).
- `color/background/box-shadow` trigger **paint** (medium).

This single discipline fixes the majority of "why is my animation janky" questions.

## Library decision tree (2026)

Pick the **right tool for the job**, not one winner. Defaults are pinned because they're current and ecosystem-backed.

| Need | Tool | Why |
| --- | --- | --- |
| Simple hover/fade/toggle | **CSS transitions** | Zero JS, smallest bundle, compositor-friendly |
| React UI enter/exit, layout shifts, gestures | **Motion** (formerly Framer Motion, `motion` package, import from `motion/react`) | Declarative, React-native, spring defaults |
| Auto list/reorder transitions | **AutoAnimate** | One directive, low bundle, no choreography |
| Physics-based, interruptible, drag/3D feel | **React Spring** (`@react-spring/web`) | Real springs, gesture-driven, ~18KB |
| Scroll-driven storytelling, timelines, SVG morph | **GSAP** (+ `@gsap/react` `useGSAP` for cleanup) | Imperative, `ScrollTrigger`, `timeline()`, all plugins free since 3.13 |
| Designer-authored decorative loops (After Effects) | **Lottie** (`@lottiefiles/react-lottie-player` or `dotlottie-web`) | Playback of `.json`/`.lottie` |
| Interactive characters/mascots that react to input | **Rive** (`@rive-app/react-webgl2`, `useRive` + data-binding hooks) | State machines, GPU, tiny files, reacts to data |
| 3D / WebGL | **React Three Fiber** | Three.js in React |
| Lightweight isolated tweens (Vanilla) | **Anime.js 4** | Small, framework-agnostic |

**Rule of thumb:** Motion for ~80% of product UI, GSAP for signature/scroll pieces, Rive for interactive mascots, Lottie for decorative loops, CSS for the basics. Many production apps use **Motion + GSAP** together.

## Stability & smoothness — non-negotiables

1. **`transform` + `opacity` only** for runtime animation (see above).
2. **`requestAnimationFrame`, never `setInterval`**, for any JS-driven animation. rAF syncs to refresh, pauses when tab hidden.
3. **Time-based, not frame-count.** Drive motion by delta time (`dt`) so 60Hz and 144Hz displays behave identically.
4. **`will-change` lifecycle: promote late, demote early.** Set it only on elements about to animate; remove it on `transitionend` (inside a rAF so the compositor has presented the final frame). Never set it globally — each promoted layer eats VRAM.
5. **Batch DOM reads and writes** per frame to avoid layout thrash (read all `offsetWidth` etc., then write).
6. **`prefers-reduced-motion`** disables non-essential animation. Always honor it.
7. **Define completion states** — `fill: forwards` or explicit reset, so loops don't accumulate drift.
8. **Test on a real mid-range device**, not just your dev machine. Target 95th-percentile frame < 16.6ms.

## React-specific rules

- Default to **Motion** (`motion/react`) for UI: `<motion.div animate={...} whileHover={...} />`, `AnimatePresence` for exit.
- Use **`useGSAP`** (`@gsap/react`) for GSAP in React — it handles cleanup/teardown so timelines don't leak across unmounts.
- **Dynamic-import** heavy libs (GSAP, Rive, Lottie) so they don't bloat the initial bundle: `const Rive = lazy(() => import(...))`.
- **Never** animate state that lives in React state at 60fps — animate the DOM/Canvas directly; use state for config, not per-frame values.

## Vanilla JS / Canvas / game rules

- Canvas is **immediate mode** — clear and repaint every frame.
- Size the canvas with `width`/`height` attributes × `devicePixelRatio` to avoid blur.
- `ctx.imageSmoothingEnabled = false` for pixel-perfect pixel art.
- Sprite **atlas** + 9-arg `drawImage` to clip frames; one draw call per sprite.
- **Delta-time accumulator** for frame-rate-independent sprite animation.
- SVG → Canvas → WebGL as element count grows (SVG fine to ~thousands of moving nodes; Canvas beyond; WebGL for 3D / tens of thousands).

## Vite notes

- Vite HMR works with all listed libs; no special config.
- **Code-split** animation libs: `const Motion = lazy(() => import('motion/react'))` for below-the-fold motion.
- Put large Rive/Lottie assets in `public/` (not `src/assets`) so they're served as-is and cached.
- Use `import.meta.env.DEV` to gate dev-only debug overlays (FPS counter, hitboxes).

## What NOT to do

- ❌ Animate `width/height/top/left/margin/font-size` in production (layout thrash).
- ❌ Use `setInterval` for animation loops.
- ❌ Drive motion by frame count instead of delta time.
- ❌ Set `will-change` globally or leave it on after the animation ends (VRAM leak).
- ❌ Animate per-frame values in React state (re-render storm).
- ❌ Forget `prefers-reduced-motion`.
- ❌ Ship GSAP/Rive/Lottie in the initial bundle for a one-off hero animation.
- ❌ Use Lottie where you need interactivity (use Rive); use Rive where you just need a loop (use Lottie).
- ❌ Set `imageSmoothingEnabled = true` for pixel art (blur).

## Quick triage when animation is janky

1. Chrome DevTools → **Performance** → record. Look for red frames and long **Layout**/**Paint** blocks.
2. **Rendering** panel → enable "Paint flashing" + "FPS meter".
3. Are you animating anything other than `transform`/`opacity`? → fix that first.
4. Too many `will-change` layers? → **Layers** panel → count layers, look for retained VRAM. Demote after animation.
5. JS loop on `setInterval`? → switch to `requestAnimationFrame`.
6. Per-frame React state? → move to refs/Canvas.
