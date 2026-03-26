# Pitfalls Research — Forge Landing Page

## Critical Pitfalls

### 1. Unoptimized Full-Bleed Images Destroying LCP
- **Warning signs:** Largest Contentful Paint > 4s, first section loads blank then pops in
- **Prevention:** Compress to WebP/AVIF, lazy-load below-fold images, eager-load hero. Use `<picture>` with srcset for responsive sizes. Target < 200KB per image.
- **Phase:** Address during image integration phase

### 2. JS Scroll Listeners Causing Jank on iOS Safari
- **Warning signs:** Stuttery scroll, 60fps drops visible in Safari dev tools
- **Prevention:** Use IntersectionObserver for visibility detection, GSAP ScrollTrigger for animation (handles passive listeners internally). Never use `scroll` event + `getBoundingClientRect()` in a loop.
- **Phase:** Address during animation implementation

### 3. GitHub Pages Subpath Asset Path 404s
- **Warning signs:** CSS/JS/images load locally but 404 on deployment
- **Prevention:** Set `base: '/forge/'` in Vite config. Use relative paths or `import.meta.env.BASE_URL`. Test with `vite preview --base=/forge/` before deploying.
- **Phase:** Address during project setup AND deployment

### 4. Waitlist Form Submitting to Nowhere / API Key Exposure
- **Warning signs:** Form appears to submit but no data arrives; or API key visible in page source
- **Prevention:** Use Formspree (no client-side keys). Test submission in development. Add success/error states to form UI.
- **Phase:** Address during form implementation

### 5. iOS `100vh` Breaking Full-Screen Sections
- **Warning signs:** Bottom of sections cut off by Safari toolbar on iOS
- **Prevention:** Use `100dvh` (dynamic viewport height) instead of `100vh`. Fallback: `min-height: -webkit-fill-available`.
- **Phase:** Address during layout scaffolding

### 6. Google Fonts FOUT/FOIT with Syne + DM Sans
- **Warning signs:** Flash of unstyled text on load, or invisible text for 1-3 seconds
- **Prevention:** Use `font-display: swap`, preconnect to Google Fonts CDN, wait for `document.fonts.ready` before triggering GSAP animations.
- **Phase:** Address during typography setup

### 7. `prefers-reduced-motion` Missing Entirely
- **Warning signs:** Users with vestibular disorders get nauseous, accessibility audit fails
- **Prevention:** Wrap all GSAP animations in `prefers-reduced-motion` check. Provide instant-reveal fallback. Test with system setting enabled.
- **Phase:** Address during animation implementation

## "Looks Done But Isn't" Checklist

- [ ] OG meta tags for social sharing preview
- [ ] Favicon (F logo)
- [ ] 404 page for GitHub Pages
- [ ] CNAME file if using custom domain
- [ ] Form validation (email format, required fields)
- [ ] Form success/error states
- [ ] Loading state during form submission
- [ ] Touch events work on mobile (no hover-dependent interactions)

## Phase Mapping

| Pitfall | Must Be Addressed By |
|---|---|
| Asset paths | Project setup |
| iOS viewport | Layout scaffolding |
| Font loading | Typography setup |
| Image optimization | Image integration |
| Scroll jank | Animation implementation |
| Form submission | Form implementation |
| Reduced motion | Animation implementation |

---
*Researched: 2026-03-26*
