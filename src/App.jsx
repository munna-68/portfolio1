import BackgroundDecor from './components/BackgroundDecor'
import CustomCursor from './components/CustomCursor'
import Header from './components/Header'
import MediaStage from './components/MediaStage'
import InfoPanels from './components/InfoPanels'
import { useScrollTimeline } from './hooks/useScrollTimeline'

export default function App() {
  useScrollTimeline()

  return (
    <div className="select-none antialiased">
      <BackgroundDecor />
      <CustomCursor />

      <div id="scroll-space" className="w-full relative h-[800vh]">
        <div
          id="pinned-viewport"
          className="sticky top-0 left-0 w-full h-screen overflow-hidden flex justify-center items-center"
        >
          <Header />

          <div
            id="hero-text-wrapper"
            className="absolute inset-0 flex flex-col justify-center items-center text-center z-20 pointer-events-none px-4"
          >
            <h1 className="font-serif text-7xl md:text-8xl lg:text-[11rem] font-medium tracking-tight text-ink leading-none mb-4">
              <span className="text-line-mask">
                <span className="text-char-slide" style={{ transform: 'translateY(0%)' }}>
                  Selected work
                </span>
              </span>
            </h1>
            <p className="max-w-xl text-sm md:text-base text-ink/80 font-medium leading-relaxed tracking-wide px-4">
              <span className="text-line-mask">
                <span className="text-char-slide" style={{ transform: 'translateY(0%)' }}>
                  Every project is shaped around the client — not a template — with a
                  focus on clarity, character, and craft.
                </span>
              </span>
            </p>
          </div>

          <MediaStage />
          <InfoPanels />
        </div>
      </div>
    </div>
  )
}
