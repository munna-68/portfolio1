import { TransitionLink } from "./LiquidTransition";
import ProjectArt from "./ProjectArt";

function ArrowIcon({ size = 12 }) {
  return (
    <svg
      className="arrow"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg>
  );
}

function ArrowOut({ size = 11 }) {
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
  );
}

/*
  Project link group — mirrors the InfoPanels on the /work page:
  View Case Study (solid, large) → Live site (outline, large,
  same height) → GitHub (outline, smaller).
*/
function ProjectLinks({ slug, liveUrl, repoUrl }) {
  return (
    <div className="flex flex-col items-stretch gap-2.5 w-full max-w-none sm:max-w-sm">
      <TransitionLink
        to={`/work/${slug}`}
        className="pointer-events-auto pill-link-solid w-full justify-center"
      >
        View case study <ArrowIcon size={12} />
      </TransitionLink>
      {liveUrl || repoUrl ? (
        <div className="flex gap-2.5 w-full">
          {liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="pointer-events-auto pill-link-large flex-1 justify-center"
            >
              Live site <ArrowOut size={11} />
            </a>
          ) : null}
          {repoUrl ? (
            <a
              href={repoUrl}
              target="_blank"
              rel="noreferrer"
              className="pointer-events-auto pill-link flex-1 justify-center"
            >
              GitHub <ArrowOut size={11} />
            </a>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default function ProjectCard({ project }) {
  return (
    <article
      className="group relative grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-10 items-start"
      data-project-card
    >
      {/* Thumbnail */}
      <div className="md:col-span-7">
        <TransitionLink
          to={`/work/${project.slug}`}
          className="block rounded-3xl overflow-hidden aspect-[16/11] sm:aspect-[4/3] md:aspect-[4/5] focus:outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-ink focus-visible:outline-offset-4 [&_.page-media]:!aspect-auto [&_.page-media]:h-full [&_.page-media]:w-full"
          aria-label={`Open case study — ${project.title}`}
        >
          <ProjectArt
            variant={project.thumbnail}
            number={project.index}
            total={project.total}
            tone="light"
          />
        </TransitionLink>
      </div>

      {/* Meta + CTAs + Scope — matches the /work InfoPanels structure */}
      <div className="md:col-span-5 flex flex-col">
        <div className="flex items-center gap-4 text-[10.5px] font-mono tracking-widest-2 uppercase text-ink/55 mb-4 md:mb-6">
          <span className="text-lg font-serif text-ink">{project.index}</span>
          <span>/</span>
          <span className="opacity-70">{project.total}</span>
        </div>

        <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.03em] leading-[0.98] text-ink mb-5 md:mb-6 max-w-[12ch]">
          <span className="text-line-mask">
            <span className="text-char-slide">
              {project.title}
              <span className="text-accent italic font-normal">.</span>
            </span>
          </span>
        </h3>

        <ProjectLinks
          slug={project.slug}
          liveUrl={project.liveUrl}
          repoUrl={project.repoUrl}
        />

        <div className="mt-6 md:mt-8 pt-5 md:pt-6 border-t border-ink/10">
          <p className="text-[10.5px] font-mono tracking-widest-2 uppercase text-ink/45 mb-2">
            {project.scopeLabel}
          </p>
          <p className="text-[12.5px] leading-relaxed text-ink/70 max-w-md">
            {project.scope}
          </p>
        </div>
      </div>
    </article>
  );
}
