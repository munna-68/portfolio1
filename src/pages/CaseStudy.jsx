import { useRef } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { TransitionLink } from '../components/LiquidTransition'
import ProjectArt from '../components/ProjectArt'
import { usePageEntrance } from '../hooks/usePageEntrance'
import { getProject, getNextProject } from '../data/projects'

function ArrowOut({ size = 12 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M7 17L17 7M9 7h8v8"
      />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg
      className="arrow w-3.5 h-3.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg>
  )
}

function SectionHeading({ eyebrow, title, lead }) {
  return (
    <div className="max-w-3xl mb-10 md:mb-14">
      <p className="label-eyebrow text-ink/50 mb-4">
        <span className="text-line-mask inline-block">
          <span className="text-char-slide">{eyebrow}</span>
        </span>
      </p>
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-[-0.03em] leading-[1.05] text-ink mb-4">
        <span className="text-line-mask">
          <span className="text-char-slide">
            {title}
            <span className="text-accent italic font-normal">.</span>
          </span>
        </span>
      </h2>
      {lead ? (
        <p className="text-[15px] md:text-[16px] leading-[1.75] text-ink/75 max-w-2xl">
          <span className="text-line-mask inline-block">
            <span className="text-char-slide">{lead}</span>
          </span>
        </p>
      ) : null}
    </div>
  )
}

function GalleryTile({ label, kind }) {
  // Lightweight visual placeholder — different framing per kind.
  return (
    <figure className="page-media relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-paper border border-ink/5">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            kind === 'mobile'
              ? 'radial-gradient(140% 100% at 50% 0%, #efece4 0%, #d8d2c2 100%)'
              : 'radial-gradient(140% 100% at 30% 30%, #efece4 0%, #d8d2c2 100%)',
        }}
      />
      {kind === 'mobile' ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-[26%] h-[78%] rounded-[28px] border border-ink/15 bg-cream"
            style={{ boxShadow: '0 30px 60px -20px rgba(46,51,38,0.25)' }}
          />
        </div>
      ) : (
        <div className="absolute inset-0 px-6 py-6 flex flex-col gap-2">
          <div className="h-1 w-1/3 bg-ink/15 rounded-full" />
          <div className="h-1 w-1/2 bg-ink/10 rounded-full" />
          <div className="h-1 w-2/3 bg-ink/10 rounded-full" />
          <div className="flex-1" />
          <div className="grid grid-cols-3 gap-2">
            <div className="h-10 rounded-lg bg-ink/8" />
            <div className="h-10 rounded-lg bg-ink/8" />
            <div className="h-10 rounded-lg bg-ink/8" />
          </div>
        </div>
      )}
      <figcaption className="absolute bottom-3 left-3 right-3 flex items-center justify-between label-eyebrow text-ink/45">
        <span>{label}</span>
        <span>Placeholder</span>
      </figcaption>
    </figure>
  )
}

function Stack({ items }) {
  return (
    <ul className="flex flex-wrap items-center gap-2">
      {items.map((s) => (
        <li
          key={s}
          className="px-3 py-1.5 rounded-full border border-ink/15 text-[11.5px] font-mono tracking-wider text-ink/80"
        >
          {s}
        </li>
      ))}
    </ul>
  )
}

function MetaRow({ label, value }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3 border-b border-ink/10">
      <span className="label-eyebrow text-[11.5px] text-ink/55">{label}</span>
      <span className="text-[14px] md:text-[15px] text-ink/90 text-right">
        {value}
      </span>
    </div>
  )
}

export default function CaseStudy() {
  const rootRef = useRef(null)
  const { slug } = useParams()
  const project = getProject(slug)

  usePageEntrance(rootRef)

  if (!project) {
    return <Navigate to="/" replace />
  }

  const next = getNextProject(slug)

  return (
    <main
      ref={rootRef}
      className="case-study-page relative pt-32 md:pt-36 pb-24 px-[5vw] md:px-[8vw]"
    >
      <div className="max-w-8xl mx-auto">
        {/* HERO */}
        <section className="pt-8 md:pt-12 pb-16 md:pb-24">
          {/* Top meta row */}
          <div className="flex items-center gap-4 mb-10 md:mb-14">
            <TransitionLink
              to="/"
              className="label-eyebrow text-ink/55 hover:text-ink transition-colors duration-300 inline-flex items-center gap-2"
            >
              <span aria-hidden>←</span> Back to work
            </TransitionLink>
            <span className="flex-1 h-px bg-ink/10" />
            <span className="label-eyebrow text-ink/45">
              {project.index} / {project.total} · {project.category}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-end mb-12 md:mb-16">
            <div className="md:col-span-8">
              <h1 className="font-serif text-[14vw] md:text-[5rem] lg:text-[7rem] font-medium tracking-[-0.04em] leading-[0.94] text-ink max-w-[14ch]">
                <span className="text-line-mask">
                  <span className="text-char-slide">
                    {project.title}
                    <span className="text-accent italic font-normal">.</span>
                  </span>
                </span>
              </h1>
            </div>
            <div className="md:col-span-4">
              <p className="text-[16px] md:text-[17px] leading-[1.7] text-ink/82 max-w-md">
                <span className="text-line-mask inline-block">
                  <span className="text-char-slide">{project.summary}</span>
                </span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
            <div className="md:col-span-8">
              <div className="rounded-3xl overflow-hidden">
                <ProjectArt
                  variant={project.thumbnail}
                  number={project.index}
                  total={project.total}
                />
              </div>
            </div>
            <aside className="md:col-span-4">
              <div className="border-t border-ink/10">
                <MetaRow label="Role" value={project.role} />
                <MetaRow label="Timeline" value={project.timeline} />
                <MetaRow label="Year" value={project.year} />
                <MetaRow label="Category" value={project.category} />
              </div>
              <div className="mt-6">
                <p className="label-eyebrow text-[11.5px] text-ink/55 mb-3">Stack</p>
                <Stack items={project.stack} />
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="pill-link-solid"
                >
                  Live site <ArrowOut size={11} />
                </a>
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="pill-link"
                >
                  GitHub <ArrowOut size={11} />
                </a>
              </div>
            </aside>
          </div>
        </section>

        {/* OVERVIEW */}
        <section className="py-20 md:py-28 border-t border-ink/10">
          <SectionHeading
            eyebrow="01 — Overview"
            title="Project overview"
            lead="The brief, the audience, and the shape of the problem before any pixels moved."
          />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-7 flex flex-col gap-8">
              <div>
                <p className="label-eyebrow text-[11.5px] text-ink/55 mb-2">Goal</p>
                <p className="text-[16px] md:text-[17px] leading-[1.75] text-ink/90">
                  {project.overview.goal}
                </p>
              </div>
              <div>
                <p className="label-eyebrow text-[11.5px] text-ink/55 mb-2">Audience</p>
                <p className="text-[16px] md:text-[17px] leading-[1.75] text-ink/90">
                  {project.overview.audience}
                </p>
              </div>
              <div>
                <p className="label-eyebrow text-[11.5px] text-ink/55 mb-2">
                  Business problem
                </p>
                <p className="text-[16px] md:text-[17px] leading-[1.75] text-ink/90">
                  {project.overview.problem}
                </p>
              </div>
            </div>
            <div className="md:col-span-5">
              <p className="label-eyebrow text-[11.5px] text-ink/55 mb-3">Objectives</p>
              <ul className="border-t border-ink/10">
                {project.overview.objectives.map((o, i) => (
                  <li
                    key={i}
                    className="border-b border-ink/10 py-4 flex items-baseline gap-4"
                  >
                    <span className="label-eyebrow text-[11.5px] text-ink/50 w-8 shrink-0">
                      0{i + 1}
                    </span>
                    <span className="text-[15px] leading-[1.65] text-ink/88">
                      {o}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* DISCOVERY */}
        <section className="py-20 md:py-28 border-t border-ink/10">
          <SectionHeading
            eyebrow="02 — Discovery"
            title="Research & discovery"
            lead="What we learned before we drew a single line."
          />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-8">
              <p className="text-[16px] md:text-[17px] leading-[1.75] text-ink/88 max-w-2xl">
                {project.discovery}
              </p>
            </div>
            <div className="md:col-span-4">
              <div className="border border-ink/10 rounded-2xl p-6 bg-paper/40">
                <p className="label-eyebrow text-[11.5px] text-ink/55 mb-3">
                  Discovery notes
                </p>
                <ul className="flex flex-col gap-2 text-[14px] text-ink/80 leading-[1.65]">
                  <li>· User interviews</li>
                  <li>· Competitor audit</li>
                  <li>· Content inventory</li>
                  <li>· Brand voice workshop</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* DESIGN PROCESS */}
        <section className="py-20 md:py-28 border-t border-ink/10">
          <SectionHeading
            eyebrow="03 — Design"
            title="Design process"
            lead="From sketch to system — wireframes, flows, and the iterations that shaped the final direction."
          />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
            {[
              { label: 'Wireframes — low fidelity' },
              { label: 'User flow diagrams' },
              { label: 'Mid-fidelity screens' },
              { label: 'High-fidelity Figma frames' },
              { label: 'Component library' },
              { label: 'Design iterations' },
            ].map((s, i) => (
              <div key={i} className="md:col-span-4">
                <GalleryTile
                  label={s.label}
                  kind={i % 4 === 1 ? 'mobile' : 'desktop'}
                />
              </div>
            ))}
          </div>
        </section>

        {/* VISUAL DESIGN */}
        <section className="py-20 md:py-28 border-t border-ink/10">
          <SectionHeading
            eyebrow="04 — Visual"
            title="Visual design"
            lead="The decisions you can see, and the rationale behind them."
          />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-7 flex flex-col gap-10">
              <div>
                <p className="label-eyebrow text-[11.5px] text-ink/55 mb-3">Typography</p>
                <p className="text-[15px] md:text-[16px] leading-[1.75] text-ink/88">
                  {project.design.type}
                </p>
              </div>
              <div>
                <p className="label-eyebrow text-[11.5px] text-ink/55 mb-3">Colour palette</p>
                <p className="text-[15px] md:text-[16px] leading-[1.75] text-ink/88">
                  {project.design.palette}
                </p>
              </div>
              <div>
                <p className="label-eyebrow text-[11.5px] text-ink/55 mb-3">
                  Design rationale
                </p>
                <p className="text-[15px] md:text-[16px] leading-[1.75] text-ink/88">
                  {project.design.rationale}
                </p>
              </div>
            </div>
            <div className="md:col-span-5">
              <p className="label-eyebrow text-[11.5px] text-ink/55 mb-3">Palette</p>
              <div className="grid grid-cols-2 gap-3">
                <Swatch label="Paper" tone="#f5f2ed" dark />
                <Swatch label="Ink" tone="#2e3326" />
                <Swatch label="Accent" tone="#8b7ea8" />
                <Swatch label="Mauve" tone="#d6c9e3" dark />
              </div>
              <p className="mt-4 text-[12.5px] text-ink/55 leading-[1.65]">
                A small, deliberate palette. The accent is reserved for CTAs
                and the active state — it never decorates.
              </p>
            </div>
          </div>
        </section>

        {/* DEVELOPMENT */}
        <section className="py-20 md:py-28 border-t border-ink/10">
          <SectionHeading
            eyebrow="05 — Build"
            title="Development process"
            lead="How it was made — architecture, stack, and the things we sweated so the user never had to."
          />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
            <DevBlock
              number="01"
              title="Architecture"
              body={project.development.architecture}
            />
            <DevBlock
              number="02"
              title="Stack selection"
              body={project.development.stack}
            />
            <DevBlock
              number="03"
              title="Performance"
              body={project.development.performance}
            />
            <DevBlock
              number="04"
              title="Accessibility"
              body={project.development.accessibility}
            />
            <DevBlock
              number="05"
              title="Implementation challenges"
              body={project.development.challenges}
            />
          </div>
        </section>

        {/* RESULTS */}
        <section className="py-20 md:py-28 border-t border-ink/10">
          <SectionHeading
            eyebrow="06 — Results"
            title="Results & outcomes"
            lead="What shipped, what shifted, and what we’d do differently next time."
          />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
            <div className="md:col-span-7">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.results.metrics.map((m) => (
                  <li
                    key={m.label}
                    className="border border-ink/10 rounded-2xl p-5 md:p-6 bg-paper/40"
                  >
                    <p className="label-eyebrow text-[11.5px] text-ink/55 mb-2">
                      {m.label}
                    </p>
                    <p className="font-serif text-3xl md:text-4xl text-ink tracking-[-0.02em] leading-none mb-2">
                      {m.value}
                    </p>
                    <p className="text-[13px] text-ink/65 leading-[1.65]">
                      {m.note}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-5">
              <p className="label-eyebrow text-[11.5px] text-ink/55 mb-3">
                Lessons learned
              </p>
              <p className="text-[15px] md:text-[16px] leading-[1.75] text-ink/88">
                {project.results.lessons}
              </p>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section className="py-20 md:py-28 border-t border-ink/10">
          <SectionHeading
            eyebrow="07 — Gallery"
            title="Selected screens"
            lead="A small selection of moments from the build. Replace with project imagery as it lands."
          />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
            {project.gallery.map((g, i) => (
              <div
                key={i}
                className={[
                  'md:col-span-6',
                  i === 0 ? 'md:col-span-12' : '',
                ].join(' ')}
              >
                <GalleryTile label={g.label} kind={g.kind} />
              </div>
            ))}
          </div>
        </section>

        {/* LINKS + NEXT PROJECT */}
        <section className="py-20 md:py-28 border-t border-ink/10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-end">
            <div className="md:col-span-7">
              <p className="label-eyebrow text-ink/50 mb-5">
                <span className="text-line-mask inline-block">
                  <span className="text-char-slide">Links —</span>
                </span>
              </p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.035em] leading-[1.02] text-ink max-w-[14ch] mb-8">
                <span className="text-line-mask">
                  <span className="text-char-slide">
                    Want to see it in motion?
                    <span className="text-accent italic font-normal">.</span>
                  </span>
                </span>
              </h2>
              <div className="flex flex-wrap gap-3">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="pill-link-solid"
                >
                  Live site <ArrowOut size={11} />
                </a>
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="pill-link"
                >
                  GitHub repository <ArrowOut size={11} />
                </a>
                <TransitionLink to="/" className="pill-link">
                  Back to work <ArrowRight />
                </TransitionLink>
              </div>
            </div>

            {next ? (
              <div className="md:col-span-5">
                <p className="label-eyebrow text-[11.5px] text-ink/55 mb-3">
                  Next case study
                </p>
                <TransitionLink
                  to={`/work/${next.slug}`}
                  className="group block"
                >
                  <p className="font-serif text-3xl md:text-4xl text-ink tracking-[-0.02em] leading-tight group-hover:text-accent transition-colors duration-500">
                    {next.title}
                    <span className="text-accent italic font-normal">.</span>
                  </p>
                  <span className="mt-3 inline-flex items-center gap-2 text-[12.5px] font-mono tracking-widest-2 uppercase text-ink/55 group-hover:text-ink transition-colors duration-300">
                    Read case study <ArrowRight />
                  </span>
                </TransitionLink>
              </div>
            ) : null}
          </div>
        </section>

        <footer className="max-w-8xl mx-auto w-full mt-12 pt-8 border-t border-ink/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="label-eyebrow text-ink/45">
            © 2026 Munna · @munna-68
          </p>
          <p className="label-eyebrow text-ink/35">
            Built with React, Vite, GSAP, and a notebook
          </p>
        </footer>
      </div>
    </main>
  )
}

function Swatch({ label, tone, dark = false }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="w-full h-20 rounded-xl border border-ink/10"
        style={{ background: tone }}
      />
      <div className="flex items-baseline justify-between">
        <span className="text-[12.5px] text-ink/70">{label}</span>
        <span className="label-eyebrow text-ink/40">{tone}</span>
      </div>
    </div>
  )
}

function DevBlock({ number, title, body }) {
  return (
    <div className="md:col-span-6 border-t border-ink/10 pt-6">
      <div className="flex items-baseline gap-3 mb-3">
        <span className="label-eyebrow text-[11.5px] text-ink/50 w-8">{number}</span>
        <h3 className="font-serif text-2xl md:text-3xl text-ink tracking-[-0.02em]">
          {title}
        </h3>
      </div>
      <p className="text-[15px] leading-[1.75] text-ink/82 max-w-xl pl-11">
        {body}
      </p>
    </div>
  )
}
