export default function Header() {
  return (
    <header
      id="main-nav"
      className="absolute top-0 left-0 w-full flex justify-between items-start px-[5vw] py-8 z-50 transition-all duration-700"
    >
      <div className="flex flex-col">
        <span className="font-serif text-2xl font-bold tracking-tight text-ink hover:opacity-80 transition-opacity cursor-pointer">
          marimba.
        </span>
        <span className="font-serif text-xl italic font-medium text-ink -mt-1 pl-2">
          designs
        </span>
      </div>
      <div className="hidden md:flex gap-16 text-[11px] font-medium tracking-widest uppercase font-mono text-ink/70 mt-1">
        <span className="hover:text-ink transition-colors cursor-pointer">
          digital developer
        </span>
        <span className="hover:text-ink transition-colors cursor-pointer">
          based in calgary, ca
        </span>
      </div>
      <div className="flex flex-col items-end gap-1.5 text-xs font-semibold tracking-wider uppercase">
        <a href="#" className="text-ink hover:opacity-60 transition-opacity">
          Home
        </a>
        <a href="#" className="text-ink/50 hover:text-ink transition-colors">
          • Work
        </a>
        <a href="#" className="text-ink/50 hover:text-ink transition-colors">
          About
        </a>
        <a href="#" className="text-ink/50 hover:text-ink transition-colors">
          Contact
        </a>
      </div>
    </header>
  )
}
