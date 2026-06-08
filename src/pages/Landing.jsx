import { useEffect, useRef } from "react";
import MediaStage from "../components/MediaStage";
import InfoPanels from "../components/InfoPanels";
import { usePageEntrance } from "../hooks/usePageEntrance";
import { useScrollTimeline } from "../hooks/useScrollTimeline";
import { useLiquidTransition } from "../components/LiquidTransition";

function ArrowDown() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14M19 12l-7 7-7-7" />
    </svg>
  );
}

export default function Landing() {
  const rootRef = useRef(null);
  const scrollRootRef = useRef(null);
  const { isMenuVisible, toggleMenu } = useLiquidTransition();

  // Entrance reveal for the surrounding sections (intro, video, cta).
  // Scoped to rootRef so it never reaches across into the scroll showcase,
  // which is animated by useScrollTimeline.
  usePageEntrance(rootRef);

  // Scroll-driven work showcase. Scoped to scrollRootRef so the entrance
  // .text-char-slide reveal only animates the hero text inside the
  // showcase, never the surrounding landing-page sections.
  useScrollTimeline(scrollRootRef);

  // The landing hero has its own distributed top bar (logo, role,
  // label, menu). Hide the fixed <Header /> for this view so the
  // hero's top row is the only top element, matching the editorial
  // layout. The fixed header re-appears on every other route.
  useEffect(() => {
    const nav = document.getElementById("main-nav");
    if (!nav) return;
    const prevOpacity = nav.style.opacity;
    const prevPointerEvents = nav.style.pointerEvents;
    nav.style.opacity = "0";
    nav.style.pointerEvents = "none";
    nav.setAttribute("aria-hidden", "true");
    return () => {
      nav.style.opacity = prevOpacity;
      nav.style.pointerEvents = prevPointerEvents;
      nav.removeAttribute("aria-hidden");
    };
  }, []);

  // Showcase scroll indicator — fades in once the pinned-viewport is
  // active, then hands over to a scroll-driven fade as the user begins
  // the morph. Computes progress relative to the scroll-space's own
  // position so the fade timing stays correct regardless of where the
  // showcase sits on the page.
  const workIndicatorRef = useRef(null);
  useEffect(() => {
    const el = workIndicatorRef.current;
    if (!el) return;
    el.style.transition = "opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1)";

    let activated = false;
    let scrollHandler;

    const enterTimer = window.setTimeout(() => {
      el.style.opacity = "1";
    }, 1000);

    const activate = () => {
      if (activated) return;
      activated = true;
      el.style.transition = "opacity 0.4s ease-out";
      scrollHandler = () => {
        const ss = document.getElementById("scroll-space");
        if (!ss) return;
        const ssRect = ss.getBoundingClientRect();
        // Scroll progress within the scroll-space (0 at top, grows as user scrolls).
        const progress = Math.max(
          0,
          Math.min(
            1,
            -ssRect.top / Math.max(1, ss.offsetHeight - window.innerHeight),
          ),
        );
        // Fade over the first 18% of the morph so the indicator clears
        // before the first project panel settles in.
        el.style.opacity = String(Math.max(0, 1 - progress / 0.18));
      };
      window.addEventListener("scroll", scrollHandler, { passive: true });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            activate();
          }
        }
      },
      { threshold: [0, 0.3, 0.6, 0.9] },
    );
    const pinned = document.getElementById("pinned-viewport");
    if (pinned) observer.observe(pinned);

    // Fallback: if for some reason IntersectionObserver never fires,
    // activate after a long timeout so the indicator is still interactive.
    const fallbackTimer = window.setTimeout(activate, 3000);

    return () => {
      window.clearTimeout(enterTimer);
      window.clearTimeout(fallbackTimer);
      observer.disconnect();
      if (scrollHandler) window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <main ref={rootRef} className="relative">
      {/* SELECTED WORK — the dominant section, scroll-driven showcase */}
      <section id="work" className="relative" data-landing-work>
        <div
          ref={scrollRootRef}
          id="scroll-space"
          className="w-full relative h-[620vh] md:h-[800vh]"
        >
          <div
            id="pinned-viewport"
            className="sticky top-0 left-0 w-full h-[100svh] md:h-screen overflow-hidden"
          >
            {/* Distributed top bar — logo · role · label · menu.
                Replaces the fixed <Header /> for the hero view. */}
            <div
              id="hero-topbar"
              className="absolute top-0 left-0 w-full px-[5vw] md:px-[8vw] py-4 md:py-8 z-40 pointer-events-none flex justify-between items-start gap-4 md:gap-6"
            >
              <div className="pointer-events-auto leading-none">
                <div className="font-serif text-xl md:text-[1.75rem] font-medium tracking-tight text-ink leading-none">
                  munna
                </div>
                <div className="font-serif text-xl md:text-[1.75rem] font-medium italic text-accent leading-none mt-0.5">
                  .
                </div>
              </div>


              <button
                type="button"
                onClick={toggleMenu}
                className="pointer-events-auto flex items-center gap-2.5 md:gap-4 mt-1.5 group"
                aria-label={isMenuVisible ? "Close menu" : "Open menu"}
                aria-expanded={isMenuVisible}
              >
                <span
                  className={[
                    "label-eyebrow transition-colors duration-500",
                    isMenuVisible ? "text-cream" : "text-ink",
                  ].join(" ")}
                >
                  {isMenuVisible ? "Close" : "Menu"}
                </span>
                <span className="relative flex flex-col justify-center items-end h-3 w-[22px]">
                  <span
                    className={[
                      "absolute h-[1.5px] rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      isMenuVisible
                        ? "bg-cream w-[22px] rotate-45 translate-y-0"
                        : "bg-ink w-[22px] -translate-y-[4px]",
                    ].join(" ")}
                  />
                  <span
                    className={[
                      "absolute h-[1.5px] rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      isMenuVisible
                        ? "bg-cream w-[22px] -rotate-45 translate-y-0"
                        : "bg-ink w-[14px] group-hover:w-[22px] translate-y-[4px]",
                    ].join(" ")}
                  />
                </span>
              </button>
            </div>

            {/* Centered hero text with soft gradient backdrop. */}
            <div
              id="hero-text-wrapper"
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-[5vw] md:px-[5vw] z-20 pointer-events-none"
            >
              <div
                aria-hidden
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] md:w-[72vw] max-w-[920px] h-[46vh] md:h-[58vh] pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(179,158,210,0.45) 0%, rgba(154,196,224,0.32) 28%, rgba(214,175,200,0.24) 48%, rgba(245,230,210,0.12) 64%, transparent 78%)",
                  filter: "blur(58px)",
                }}
              />

              <span className="relative label-eyebrow text-ink/55 mb-6 md:mb-8">
                <span className="text-line-mask inline-block">
                  <span className="text-char-slide">
                    munna-68 · web developer
                  </span>
                </span>
              </span>

              <h1 className="relative font-serif text-[18vw] sm:text-[5.5rem] md:text-[8rem] lg:text-[10.5rem] font-medium tracking-[-0.04em] text-ink leading-[0.9] mb-5 md:mb-6 w-full max-w-6xl">
                <span className="text-line-mask inline-block">
                  <span className="text-char-slide">
                    Selected work
                    <span className="text-accent italic font-normal">.</span>
                  </span>
                </span>
              </h1>

              <p className="relative max-w-xl text-[12px] sm:text-[13px] md:text-[15.5px] text-ink/75 font-medium leading-relaxed tracking-wide mb-7 md:mb-8">
                <span className="text-line-mask">
                  <span className="text-char-slide">
                    An independent web developer crafting considered digital
                    experiences — type, motion, and code, in that order.
                  </span>
                </span>
              </p>

              <div ref={workIndicatorRef} className="relative scroll-indicator">
                <span>scroll</span>
                <ArrowDown />
                <div className="line">
                  <div className="dot" />
                </div>
              </div>
            </div>

            <MediaStage />
            <InfoPanels />
          </div>
        </div>
      </section>
    </main>
  );
}
