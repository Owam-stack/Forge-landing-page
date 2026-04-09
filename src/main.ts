import './styles/main.css'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ============================================================
// Forge — entry point
// ============================================================

const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches

// ---------- Lenis smooth scroll ----------
function initLenis(): void {
  if (prefersReducedMotion) return

  const lenis = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.95,
  })

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time: number) => {
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)
}

// ---------- Scroll-triggered reveals ----------
function initReveals(): void {
  const revealEls = document.querySelectorAll<HTMLElement>('[data-reveal]')

  if (prefersReducedMotion) {
    revealEls.forEach((el) => el.classList.add('is-visible'))
    return
  }

  revealEls.forEach((el) => {
    const delayAttr = el.dataset.revealDelay
    const delay = delayAttr ? parseFloat(delayAttr) : 0

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.delayedCall(delay, () => el.classList.add('is-visible'))
      },
    })
  })
}

// ---------- Subtle parallax on section backgrounds ----------
function initParallax(): void {
  if (prefersReducedMotion) return

  const bgs = document.querySelectorAll<HTMLElement>('.section__bg')
  bgs.forEach((bg) => {
    const section = bg.closest<HTMLElement>('.section')
    if (!section) return

    gsap.fromTo(
      bg,
      { yPercent: -8, scale: 1.08 },
      {
        yPercent: 8,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    )
  })
}

// ---------- Waitlist form ----------
interface WaitlistPayload {
  name: string
  email: string
  phone: string
  submittedAt: string
}

function initWaitlistForm(): void {
  const form = document.getElementById('waitlist-form') as HTMLFormElement | null
  const status = document.getElementById('form-status')
  if (!form || !status) return

  const nameField = form.elements.namedItem('name') as HTMLInputElement
  const emailField = form.elements.namedItem('email') as HTMLInputElement
  const phoneField = form.elements.namedItem('phone') as HTMLInputElement

  function setStatus(message: string, kind: 'idle' | 'error' | 'success' = 'idle'): void {
    if (!status) return
    status.textContent = message
    status.classList.remove('form-status--error', 'form-status--success')
    if (kind === 'error') status.classList.add('form-status--error')
    if (kind === 'success') status.classList.add('form-status--success')
  }

  function markFieldError(field: HTMLInputElement, hasError: boolean): void {
    const wrapper = field.closest('.field')
    if (!wrapper) return
    wrapper.classList.toggle('field--error', hasError)
  }

  function validate(): string | null {
    const name = nameField.value.trim()
    const email = emailField.value.trim()
    const phone = phoneField.value.trim()

    markFieldError(nameField, false)
    markFieldError(emailField, false)
    markFieldError(phoneField, false)

    if (!name) {
      markFieldError(nameField, true)
      return 'Your name is required.'
    }
    if (!email) {
      markFieldError(emailField, true)
      return 'Your email is required.'
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!emailOk) {
      markFieldError(emailField, true)
      return 'That email looks off — check and try again.'
    }
    if (!phone) {
      markFieldError(phoneField, true)
      return 'Your phone number is required.'
    }
    const phoneDigits = phone.replace(/[^\d]/g, '')
    if (phoneDigits.length < 7) {
      markFieldError(phoneField, true)
      return 'That phone number looks incomplete.'
    }
    return null
  }

  form.addEventListener('submit', (event: Event) => {
    event.preventDefault()
    const error = validate()
    if (error) {
      setStatus(error, 'error')
      return
    }

    const payload: WaitlistPayload = {
      name: nameField.value.trim(),
      email: emailField.value.trim(),
      phone: phoneField.value.trim(),
      submittedAt: new Date().toISOString(),
    }

    // No backend yet — persist locally so submissions aren't lost
    // in private beta. Swap for Formspree / Supabase when available.
    try {
      const existing = JSON.parse(
        localStorage.getItem('forge_waitlist') ?? '[]'
      ) as WaitlistPayload[]
      existing.push(payload)
      localStorage.setItem('forge_waitlist', JSON.stringify(existing))
    } catch {
      // localStorage can throw in private mode — non-fatal
    }

    setStatus(
      "You're on the list. We'll be in touch before the doors open.",
      'success'
    )
    form.reset()
  })
}

// ---------- Nav CTA smooth scroll (fallback when Lenis is off) ----------
function initAnchorScroll(): void {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e: MouseEvent) => {
      const href = link.getAttribute('href')
      if (!href || href === '#') return
      const target = document.querySelector<HTMLElement>(href)
      if (!target) return
      e.preventDefault()
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      })
    })
  })
}

// ---------- Boot ----------
document.addEventListener('DOMContentLoaded', () => {
  initLenis()
  initReveals()
  initParallax()
  initWaitlistForm()
  initAnchorScroll()
  console.log('Forge loaded')
})
