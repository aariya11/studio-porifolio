# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are photo directors, editorial chiefs, fashion editors, art buyers, and luxury brand creative directors (e.g. Vogue, Maison Margiela, Harper's Bazaar, Bottega Veneta) evaluating and commissioning world-class talent for high-fashion runway campaigns, cover assignments, and bespoke visual monographs. Secondary users include private art collectors, gallery curators, and architecture studios seeking fine art prints and commissioned spatial documentation.

## Product Purpose

Serve as the definitive digital atelier, editorial monograph, and commission acquisition portal for Alex Kane. The platform exists to command undeniable artistic authority, immerse decision-makers in narrative photo stories, and facilitate qualified direct commission inquiries. Success is achieved when an art buyer evaluates the body of work and submits a structured project brief within a single frictionless visit.

## Positioning

"High-end digital studio meets international fashion magazine." Unlike generic commercial photography templates, the experience treats web space like a private exhibition: uncompromised full-bleed tonal gradation, tactile mechanical shutter feedback, real-time Paris/Tokyo studio coordination, and transparent curatorial statements for every project series.

## Operating Context

Reviewed in high-stakes creative environments: high-resolution 4K/5K displays in design ateliers and advertising agencies, presentation projectors during pitch reviews, and mobile viewports used by creative directors traveling between fashion weeks in Paris, Milan, and Tokyo. Frequently viewed in low-ambient lighting conditions where deep blacks and subtle highlights are prioritized.

## Capabilities and Constraints

- Curated multi-format editorial masonry grid with dynamic category filters (Editorial, Fashion, Portrait, Commercial, Travel, Architecture).
- Dedicated deep-linked project photo-story views with asymmetric two-column spreads, photographer field notes, and camera EXIF metadata.
- Fullscreen blacked-out image lightbox featuring 1.5x zoom inspection, keyboard arrow navigation, and touch swipe gestures.
- Strictly validated commission inquiry form with budget range selection, anti-spam honeypot, and mandatory GDPR-compliant consent gate.
- Synthesized Web Audio API tactile shutter audio feedback (muted by default with persistent user toggle).
- Completely isolated, CMS-ready data architecture in `src/data/portfolioData.js` allowing rapid rebranding or client handover.
- Fast, static-deployable client-side React 19 + Vite architecture with zero external backend latency.

## Brand Commitments

- **Identity**: Alex Kane — Art Director & Editorial Photographer.
- **Studios**: Dual operational bases in Paris (14 Rue de Turenne, Le Marais) and Tokyo (Minami-Aoyama, Minato-ku).
- **Visual Language**: Deep obsidian black (`#070708`), off-white typography (`#f5f5f3`), hairline framing borders, and restrained Electric Lime accents (`#C3E41D`).
- **Voice**: Quiet, dignified, authoritative, and direct. Rejection of marketing jargon in favor of editorial rigor and photographic craft.

## Evidence on Hand

- 8 complete multi-image editorial photo stories with authentic camera and lens metadata (Leica M11, Hasselblad H6D-100c, Phase One IQ4 150MP).
- 4 illustrated critical essays on lighting geometry, sub-zero analogue operation, and portraiture ethics.
- Transparently disclosed editorial client placeholders (Vogue, GQ, Acne Studios, Leica, Nike Lab).
- Real-time synchronized CET and JST world clocks.

## Product Principles

1. **The Photograph Is the Sacred Product**: All UI elements, borders, and controls recede into quiet negative space; interaction never distracts from the visual tone and composition of the photograph.
2. **Analogue Respect in Digital Form**: Channel the craftsmanship of mechanical cameras through deliberate technical metadata, film grain textures, and restrained tactile feedback.
3. **Editorial Respect for the Viewer**: Zero unsolicited autoplay audio, zero predatory tracking scripts, and zero fake testimonials; provide an elevated, dignified browsing sanctuary.
4. **Uncompromising Operational Precision**: Instantaneous load times, zero layout shifts, full keyboard accessibility, and tailored responsive experiences across mobile, tablet, and ultra-wide displays.

## Accessibility & Inclusion

- Adherence to WCAG 2.1 AA standards with visible focus states (`focus-visible:ring-accent-lime`).
- Semantic HTML5 structure across all layout containers, dialogs, and navigation milestones.
- Full keyboard operability (`Tab`, `Escape`, `ArrowLeft`, `ArrowRight`) across lightboxes and modals with background scroll locks.
- Complete support for `prefers-reduced-motion`, automatically disabling custom cursor morphing and kinematic text animations.
