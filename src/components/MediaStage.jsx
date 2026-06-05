import { slides, PEXELS_VIDEO, LOCAL_FALLBACK } from '../data/slides'

export default function MediaStage() {
  return (
    <div id="media-container" className="rounded-[2.5rem] shadow-2xl">
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className="media-slide"
          id={`media-${slide.id}`}
          style={i > 0 ? { clipPath: 'inset(100% 0% 0% 0%)' } : undefined}
        >
          <video muted loop autoPlay playsInline preload="auto">
            <source src={PEXELS_VIDEO} type="video/mp4" />
            <source src={LOCAL_FALLBACK} type="video/mp4" />
          </video>
          {slide.overlay && (
            <div className={`absolute inset-0 ${slide.overlay}`} />
          )}
          {slide.heading && (
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8">
              <span className="font-mono text-xs tracking-widest uppercase opacity-75 mb-2">
                {slide.label}
              </span>
              <h4 className="font-serif text-3xl font-medium tracking-tight">
                {slide.heading}
              </h4>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
