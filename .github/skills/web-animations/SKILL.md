---
name: web-animations
description: Implements smooth, accessible web animation with CSS transitions and keyframes, @starting-style entry effects, the View Transitions API (same-document and cross-document), scroll-driven animations, the Web Animations API, Motion for React, and GSAP — animating only compositor-friendly properties, honoring prefers-reduced-motion, and verifying 60fps in DevTools. Use when adding transitions, page or route transitions, modal and list enter/exit effects, scroll effects, or when an animation janks or ignores reduced-motion settings.
license: MIT
---

# Web Animations

An animation is done when it runs on the compositor (transform, opacity), finishes in a duration the user does not wait on, can be interrupted without jumping, degrades to an instant or fade change under `prefers-reduced-motion`, and shows no dropped frames in a Performance recording on a throttled CPU.

## Pick the tool

| Need | Use |
| --- | --- |
| Hover, focus, state changes on one element | CSS `transition` |
| Looping or multi-step decorative motion | CSS `@keyframes` |
| Element entering from `display: none` (dialog, popover, toast) | `@starting-style` + `transition-behavior: allow-discrete` |
| Page/route change, list reorder, shared-element morph | View Transitions API |
| Progress tied to scroll position | CSS scroll-driven animations (`animation-timeline`), with a fallback |
| Imperative control, dynamic values, promises | Web Animations API (`element.animate`) |
| React layout animations, exit animations, gestures | Motion (`motion/react`) |
| Complex timelines, scroll storytelling, SVG/text effects | GSAP (+ ScrollTrigger) |

Prefer the platform first; add a library only for exit animations in React, layout (FLIP) animations, or complex sequencing.

## Performance rules (60fps = 16.7 ms per frame; 8.3 ms at 120 Hz)

- Animate `transform` and `opacity`. `filter` and `clip-path` are usually acceptable; measure first.
- Never animate `width`, `height`, `top`, `left`, `margin`, `padding`, or `box-shadow` on large or many elements; they trigger layout or paint every frame. Use `transform: scale/translate`, a pseudo-element's opacity for shadows, or FLIP.
- Transition named properties, never `transition: all` — it animates unexpected properties and triggers layout.
- `will-change: transform` only on elements about to animate, removed afterwards; every promoted layer costs GPU memory.
- Do not read layout (`offsetHeight`, `getBoundingClientRect`) and write styles in the same loop; batch reads then writes.

## Durations and easing defaults

| Interaction | Duration | Easing |
| --- | --- | --- |
| Hover/press feedback | 100–150 ms | `ease-out` |
| Small element enter (tooltip, menu) | 150–200 ms | `cubic-bezier(0.2, 0, 0, 1)` |
| Exit | ~70% of enter duration | `ease-in` |
| Modal/drawer | 200–300 ms | decelerate on enter |
| Page transition | 250–400 ms | — |

Anything over 500 ms for UI feedback feels slow; never block input during an animation.

## CSS patterns

```css
.button { transition: background-color 120ms ease-out, transform 120ms ease-out; }
.button:active { transform: scale(0.97); }

/* Dialog / popover enter + exit including display and top-layer */
dialog {
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 200ms, transform 200ms, overlay 200ms allow-discrete, display 200ms allow-discrete;
}
dialog[open] { opacity: 1; transform: none; }
@starting-style {
  dialog[open] { opacity: 0; transform: translateY(8px); }
}

/* Expand to auto height without measuring: grid row trick (works everywhere) */
.accordion-panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 250ms ease; }
.accordion-panel[data-open="true"] { grid-template-rows: 1fr; }
.accordion-panel > .inner { overflow: hidden; }
```

`interpolate-size: allow-keywords` animates to `height: auto` directly but is not in all browsers; treat it as progressive enhancement.

## Reduced motion

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

That global reset is a safety net. Better: write motion inside `@media (prefers-reduced-motion: no-preference) { ... }` so the default is still, and replace large movement with a short opacity fade rather than removing feedback entirely. Parallax, zooms, auto-playing carousels, and scroll-jacking must stop completely. Anything moving for more than 5 s needs a pause control (WCAG 2.2.2).

JS check: `matchMedia("(prefers-reduced-motion: reduce)").matches`, and listen for `change` events.

## View Transitions

Same-document (SPA state change):

```js
function update(mutate) {
  if (!document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    mutate();
    return;
  }
  document.startViewTransition(() => mutate());   // mutate may return a promise
}
```

```css
.product-thumb { view-transition-name: var(--vt-name); }   /* set unique name per item, e.g. style="--vt-name: p-42" */
::view-transition-old(root), ::view-transition-new(root) { animation-duration: 250ms; }
::view-transition-group(*) { animation-timing-function: cubic-bezier(0.2, 0, 0, 1); }
```

Cross-document (MPA, same origin), no JavaScript:

```css
@view-transition { navigation: auto; }
```

Rules:

- `view-transition-name` must be unique among rendered elements at capture time; duplicates abort the transition.
- During a transition the page is non-interactive and rendered as snapshots — keep transitions short.
- Feature-detect and fall back to an instant update; support varies by browser for cross-document transitions.
- Frameworks: Astro (`<ClientRouter />` or the CSS rule), SvelteKit (`onNavigate` + `startViewTransition`), Next.js and React have experimental integrations — check the installed version's docs before using them.

## Scroll-driven animations

```css
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .reveal {
      animation: reveal linear both;
      animation-timeline: view();
      animation-range: entry 0% cover 30%;
    }
  }
}
@keyframes reveal { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
```

Content must be fully visible without the animation (the `@supports` wrapper ensures unsupported browsers show it). Use `IntersectionObserver` + a class toggle as the JS fallback, not scroll listeners.

## Web Animations API

```js
const anim = el.animate(
  [{ transform: "translateX(0)" }, { transform: "translateX(240px)" }],
  { duration: 200, easing: "cubic-bezier(0.2, 0, 0, 1)", fill: "forwards" },
);
await anim.finished;
anim.commitStyles();   // persist final state into inline style
anim.cancel();         // release the fill so it does not override later CSS
```

## Motion (React)

```jsx
import { motion, AnimatePresence, MotionConfig } from "motion/react";

<MotionConfig reducedMotion="user">
  <AnimatePresence initial={false}>
    {items.map((item) => (
      <motion.li
        key={item.id}
        layout
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, transition: { duration: 0.12 } }}
      />
    ))}
  </AnimatePresence>
</MotionConfig>
```

- Package is `motion` (formerly `framer-motion`); import from `motion/react`.
- Exit animations require `AnimatePresence` and stable `key`s on direct children.
- `reducedMotion="user"` disables transform/layout animations when the OS asks.

## GSAP

```js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  gsap.from(".feature", { y: 40, opacity: 0, stagger: 0.08, scrollTrigger: { trigger: ".features", start: "top 80%" } });
  return () => {};   // cleanup runs automatically when the query stops matching
});
```

In React use `useGSAP()` from `@gsap/react` (scoped, auto-cleanup) instead of raw `useEffect`. Kill ScrollTriggers on route change in SPAs or they fire on the wrong page.

GSAP and its plugins (ScrollTrigger, SplitText, etc.) are free to use, including commercially, since 3.13.

## Gotchas

- Animating an element that is `display: none` at start does nothing without `@starting-style` or a frame delay.
- `transform` on a parent creates a containing block: `position: fixed` children stop being viewport-fixed.
- Animating `opacity` to 0 leaves the element focusable and clickable; also set `visibility: hidden` or `inert` at the end.
- Long `stagger` sequences delay content; cap total stagger around 300 ms.
- Infinite animations on many elements burn battery; pause offscreen ones.

## Verification

1. DevTools Performance: record the interaction with 4x CPU throttling. No long frames (red bars) during the animation; no purple Layout or green Paint blocks per frame.
2. Rendering panel: enable Paint flashing and Layer borders; animated elements should not repaint every frame.
3. Toggle "Emulate CSS prefers-reduced-motion: reduce" in the Rendering panel; motion stops or becomes a fade, and nothing is lost.
4. Interrupt mid-animation (click again, navigate back): no jumps or stuck states.
5. Test in Safari and Firefox for View Transitions and scroll-driven features, or confirm the fallback renders.

## FAQ: Which CSS properties are safe to animate at 60fps?

Transform and opacity. They run on the compositor, while width, height, top, left, margin, padding and box-shadow trigger layout or paint on every frame. Filter and clip-path are usually acceptable but should be measured first. Transition named properties rather than transition: all, apply will-change: transform only just before an animation and remove it afterwards, and use scale or translate, a pseudo-element's opacity for shadows, or FLIP when layout must appear to change.
