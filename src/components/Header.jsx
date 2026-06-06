import { Link } from "react-router-dom";
import { useLiquidTransition } from "./LiquidTransition";

export default function Header() {
  const { isMenuVisible, toggleMenu, navigateTo } = useLiquidTransition();

  const onLinkClick = (e, to) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    navigateTo(to);
  };

  return (
    <header
      id="main-nav"
      className="fixed top-0 left-0 w-full flex justify-between items-start px-[5vw] py-6 md:py-8 z-50 pointer-events-none"
    >
      <Link
        to="/"
        onClick={(e) => onLinkClick(e, "/")}
        className="pointer-events-auto leading-none group"
        aria-label="Munna — Home"
      >
        <span
          className={[
            "font-serif text-2xl md:text-[1.7rem] font-medium tracking-tight leading-none transition-colors duration-500",
            isMenuVisible ? "text-cream" : "text-ink",
          ].join(" ")}
        >
          munna
          <span
            className={[
              "italic transition-colors duration-500",
              isMenuVisible
                ? "text-accent group-hover:text-cream"
                : "text-accent group-hover:text-ink",
            ].join(" ")}
          >
            .
          </span>
        </span>
      </Link>

      {/* Hamburger trigger — single navigation affordance across all viewports. */}
      <button
        type="button"
        onClick={toggleMenu}
        aria-label={isMenuVisible ? "Close menu" : "Open menu"}
        aria-expanded={isMenuVisible}
        aria-controls="liquid-curtain-menu"
        className="pointer-events-auto flex items-center gap-3 md:gap-4 mt-2 group"
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
    </header>
  );
}
