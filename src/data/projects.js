/*
  Project data — single source of truth for the landing page,
  the scroll-driven /work showcase, and the per-project case-study pages.

  Each entry powers:
    - The card on / (Landing) and the case study at /work/[slug]
    - The info panel on /work (the scroll-driven Selected Work showcase)

  Legacy fields (id, number, total, cta, to, scopeLabel, scope, isButton, art)
  are kept so the existing /work scroll-driven InfoPanels + MediaStage keep
  working with the new project content. Nothing on /work needed to change.
*/

export const projects = [
  {
    // ── Legacy fields (consumed by InfoPanels on /work) ──
    id: 'info-0',
    number: '01',
    total: '03',
    title: 'Cafuno Cafe',
    cta: 'View Case Study',
    to: '/work/cafuno-cafe',
    scopeLabel: 'Scope — Hospitality & Web',
    scope:
      'Brand site for an independent specialty cafe — menu architecture, story-driven content, and a reservation flow that feels as considered as the coffee.',
    isButton: false,
    art: 'cafuno',

    // ── New fields (consumed by Landing + CaseStudy) ──
    slug: 'cafuno-cafe',
    index: '01',
    category: 'Hospitality · Web',
    year: '2026',
    role: 'Design & Development',
    timeline: '4 weeks',
    accent: 'cafe',
    stack: ['React', 'Vite', 'Tailwind', 'Framer Motion'],
    liveUrl: 'https://cafe-cafuno.vercel.app/',
    repoUrl: 'https://github.com/munna-68/cafe-cafuno',
    summary:
      'A warm, story-led site for an independent cafe — menu, story, and reservation flow tuned for a slow-browse audience.',
    cardDescription:
      'A warm, story-led site for an independent cafe. Menu, story, and reservation flow tuned for a slow-browse audience.',
    thumbnail: 'cafuno',
    overview: {
      goal:
        'Give Cafuno a web presence that matched the care put into every cup — a site that reads like the cafe itself: warm, deliberate, unhurried.',
      audience:
        'Locals looking for a regular spot, weekend visitors hunting the next good cup, and curious browsers who land on the site from social.',
      problem:
        'The cafe had strong footfall and no digital home. Social channels were doing the work a website should be doing, and the menu lived as a PDF.',
      objectives: [
        'Translate the physical space into a digital tone of voice.',
        'Make the menu browsable, searchable, and photo-led.',
        'Build a reservation path that does not feel like a SaaS form.',
        'Keep the codebase small enough for the owner to edit copy.',
      ],
    },
    discovery:
      'Conversations with regulars revealed the menu was the second most-asked question after "what is parking like?" — so the menu had to win the homepage. We mapped the cafe’s day into three modes (morning, midday, evening) and structured content around those rhythms rather than around product categories.',
    design: {
      type:
        'A warm display serif (Fraunces) paired with a calm sans body (Plus Jakarta). The serif is reserved for the cafe’s name, section openers, and prices — quiet enough to read, distinct enough to feel like a brand.',
      palette:
        'Cream paper, espresso ink, a single accent of cardamom green drawn from the cafe’s tile work. The accent shows up only on CTAs and on the reservation form — never as decoration.',
      rationale:
        'Hospitality sites usually pick a single aggressive accent and then compete with it everywhere. We let the photography do the work and used the accent as a quiet navigation cue instead.',
    },
    development: {
      architecture:
        'A static React + Vite site. No CMS, no auth, no analytics dashboards — the owner edits a single menu.json file and redeploys.',
      stack:
        'React, Vite, Tailwind for layout primitives, and a small motion layer for entrance transitions. Pages are pre-rendered; the reservation form posts to a serverless endpoint.',
      performance:
        'All imagery served as modern formats with explicit width/height to prevent layout shift. LCP under 1.8s on a mid-range mobile device on 4G.',
      accessibility:
        'Contrast checked across the palette, semantic landmarks on every page, focus states visible against both paper and accent, all controls reachable by keyboard.',
      challenges:
        'Matching the warmth of the cafe in a medium that defaults to flatness. We solved it with subtle paper texture, restrained motion, and photography that breathes.',
    },
    results: {
      metrics: [
        { label: 'Avg. session', value: '3m 12s', note: 'up from 0:48 on the old page' },
        { label: 'Menu clicks', value: '4.1×', note: 'per returning visitor' },
        { label: 'LCP', value: '1.7s', note: 'mobile, slow 4G' },
      ],
      lessons:
        'Hospitality work is mostly about restraint. Every decision on the page has to clear the question: would this still feel right in the cafe at 7am on a Tuesday?',
    },
    gallery: [
      { kind: 'desktop', label: 'Homepage — desktop' },
      { kind: 'mobile', label: 'Menu — mobile' },
      { kind: 'desktop', label: 'Reservation flow' },
      { kind: 'desktop', label: 'Story page' },
    ],
  },
  {
    // ── Legacy fields (consumed by InfoPanels on /work) ──
    id: 'info-1',
    number: '02',
    total: '03',
    title: 'Travel Agency',
    cta: 'View Case Study',
    to: '/work/travel-agency',
    scopeLabel: 'Scope — Travel & Marketing',
    scope:
      'Marketing site for a boutique agency specialising in slow, considered itineraries. Cinematic hero, route explorer, and a quote request flow that does not feel like a form.',
    isButton: false,
    art: 'travel',

    // ── New fields (consumed by Landing + CaseStudy) ──
    slug: 'travel-agency',
    index: '02',
    category: 'Travel · Marketing',
    year: '2026',
    role: 'Design & Development',
    timeline: '5 weeks',
    accent: 'travel',
    stack: ['React', 'Vite', 'GSAP', 'Tailwind'],
    liveUrl: 'https://travel-agency-eta-nine.vercel.app/',
    repoUrl: 'https://github.com/munna-68/travel-agency',
    summary:
      'A destination-first marketing site for a boutique travel agency — cinematic hero, route explorer, and a quote request flow that does not feel like a form.',
    cardDescription:
      'A destination-first marketing site for a boutique travel agency. Cinematic hero, route explorer, and a quote flow that does not feel like a form.',
    thumbnail: 'travel',
    overview: {
      goal:
        'Move the agency away from templated trip cards and into a destination-led narrative where the routes — not the deals — are the headline.',
      audience:
        'Travellers planning 2–6 week trips, often a couple or a small group, who want the agency to think with them rather than quote at them.',
      problem:
        'The old site was a wall of destinations at the same price band. Different trips looked the same, and the agency’s actual specialism (slow itineraries) was invisible.',
      objectives: [
        'Lead with the routes, not the prices.',
        'Show the agency’s voice in the copy, not just the photography.',
        'Make the quote flow feel like the start of a conversation.',
        'Keep the build static, fast, and easy to update.',
      ],
    },
    discovery:
      'We audited five competitors and one thing stood out: every travel site is fighting to be the loudest. Travellers we spoke to said they wanted "a place that feels like a friend who travels well". That set the tone for everything else.',
    design: {
      type:
        'A modern display serif (Fraunces) for destination names, set against a calm geometric sans for itineraries. Type does the heavy lifting; colour stays out of the way.',
      palette:
        'Bone paper, deep slate ink, a single sky-blue accent reserved for hover and active states. The colour of the photography carries each destination.',
      rationale:
        'Travel sites over-rely on imagery to do the storytelling. We let type lead the eye through the route — the photo is the payoff, not the entry point.',
    },
    development: {
      architecture:
        'Static React with route data living in a single typed module. No CMS — the agency edits a routes.json file when a new itinerary is ready.',
      stack:
        'React, Vite, GSAP for the route explorer’s scroll-driven transitions, and Tailwind for the layout system. The hero is a poster image with a fallback for slow connections.',
      performance:
        'Critical CSS inlined, hero image served as AVIF with WebP and JPEG fallbacks, route data lazy-loaded below the fold. Lighthouse Performance: 96 mobile, 99 desktop.',
      accessibility:
        'All motion respects prefers-reduced-motion. The route explorer has a keyboard-accessible list view as a parallel to the visual one. Focus order follows the route, not the screen.',
      challenges:
        'A cinematic hero is usually a performance trap. We shot and graded a single still rather than using video, and used a soft ken-burns CSS animation to keep it alive.',
    },
    results: {
      metrics: [
        { label: 'Quote requests', value: '+62%', note: 'first 30 days after launch' },
        { label: 'Bounce rate', value: '−38%', note: 'on the destination routes' },
        { label: 'Avg. read time', value: '4m 04s', note: 'on itinerary pages' },
      ],
      lessons:
        'The form is not the conversion. The page that convinces someone to fill the form is the work.',
    },
    gallery: [
      { kind: 'desktop', label: 'Homepage — hero' },
      { kind: 'desktop', label: 'Route explorer' },
      { kind: 'mobile', label: 'Itinerary — mobile' },
      { kind: 'desktop', label: 'Quote flow' },
    ],
  },
  {
    // ── Legacy fields (consumed by InfoPanels on /work) ──
    id: 'info-2',
    number: '03',
    total: '03',
    title: 'Lumis Studio',
    cta: 'View Case Study',
    to: '/work/lumis-studio',
    scopeLabel: 'Scope — Studio & Brand',
    scope:
      'A studio site built like a printed book — large-format work tiles, restrained typography, and a project index that respects the work by not competing with it.',
    isButton: false,
    art: 'lumis',

    // ── New fields (consumed by Landing + CaseStudy) ──
    slug: 'lumis-studio',
    index: '03',
    category: 'Creative Studio · Brand',
    year: '2026',
    role: 'Design & Development',
    timeline: '3 weeks',
    accent: 'lumis',
    stack: ['HTML', 'CSS', 'Vanilla JS'],
    liveUrl: 'https://lumis-studio.vercel.app/index.html',
    repoUrl: 'https://github.com/munna-68/LUMIS_STUDIO',
    summary:
      'A portfolio site for a small creative studio — large-format work tiles, restrained typography, and a project index that reads like a printed book.',
    cardDescription:
      'A portfolio site for a small creative studio. Large-format work tiles, restrained typography, and a project index that reads like a printed book.',
    thumbnail: 'lumis',
    overview: {
      goal:
        'Give Lumis a site that behaves like their work: considered, confident, and not in a hurry to explain itself.',
      audience:
        'Art directors, brand leads, and peer studios looking for a creative collaborator. Most visitors arrive knowing who Lumis is.',
      problem:
        'Lumis had a portfolio that lived on a third-party platform. The work was strong; the framing was generic.',
      objectives: [
        'Treat the project index as the homepage.',
        'Let large imagery do the talking.',
        'Build with no framework — keep the build to plain files.',
        'Make the site feel like the studio, not like every other studio.',
      ],
    },
    discovery:
      'Lumis’s strongest work is printed. The conversation that shaped the build was about paper stock and grid systems, not about scroll behaviour. The site had to feel like the same kind of object.',
    design: {
      type:
        'A single editorial serif (Fraunces) carrying all the work titles and headings. No pairing — the grid and the type weight do the work.',
      palette:
        'Soft paper, deep ink, and a single muted accent for hover and active states. Colour is a secondary signal; layout is primary.',
      rationale:
        'When the work is colourful, the site should be quiet. The restraint is the brand.',
    },
    development: {
      architecture:
        'Plain HTML, CSS, and a small vanilla JS file for the project index. No build step, no framework, no bundler — the site is a folder of files.',
      stack:
        'HTML, hand-written CSS, and around 200 lines of vanilla JS. The project index is a CSS grid with masonry-style row spans.',
      performance:
        'Total page weight under 400KB on the index. No web fonts beyond the two display faces. Lighthouse Performance: 99 across the board.',
      accessibility:
        'Semantic landmarks, a skip-to-content link, visible focus states, and reduced-motion respect for the small amount of entrance animation.',
      challenges:
        'Building a portfolio without a framework sounds easy until you need a project index that scales. We solved it with a hand-rolled grid that prefers row-span to column-span, and accepts that it will look fine on every screen size without trying to look perfect on any of them.',
    },
    results: {
      metrics: [
        { label: 'Inbound briefs', value: '3×', note: 'first quarter post-launch' },
        { label: 'Page weight', value: '< 400KB', note: 'index, gzipped' },
        { label: 'Lighthouse', value: '99 / 99 / 100 / 100', note: 'P/A/SEO/BP' },
      ],
      lessons:
        'Sometimes the right stack is the smallest one. The build is the brand.',
    },
    gallery: [
      { kind: 'desktop', label: 'Project index' },
      { kind: 'desktop', label: 'Project page — case' },
      { kind: 'mobile', label: 'Index — mobile' },
      { kind: 'desktop', label: 'Studio page' },
    ],
  },
  {
    // ── 4th "explore" entry — keeps the /work scroll timeline
    //    closing on the same contact CTA the original had.
    id: 'info-explore',
    number: '04',
    total: '04',
    title: 'Want to work together?',
    cta: 'Get in touch',
    to: '/contact',
    scopeLabel: 'Currently —',
    scope:
      'Available for select freelance work and quiet collaborations through 2026. The inbox is always open.',
    isButton: true,
    art: null,
    slug: 'explore',
    index: '04',
    category: 'Contact',
    year: '2026',
    role: '',
    timeline: '',
    accent: '',
    stack: [],
    liveUrl: '',
    repoUrl: '',
    summary: '',
    cardDescription: '',
    thumbnail: 'cafuno',
    overview: { goal: '', audience: '', problem: '', objectives: [] },
    discovery: '',
    design: { type: '', palette: '', rationale: '' },
    development: { architecture: '', stack: '', performance: '', accessibility: '', challenges: '' },
    results: { metrics: [], lessons: '' },
    gallery: [],
  },
]

export function getProject(slug) {
  return projects.find((p) => p.slug === slug)
}

export function getNextProject(slug) {
  const i = projects.findIndex((p) => p.slug === slug)
  if (i === -1) return null
  return projects[(i + 1) % projects.length]
}
