const COLUMN_LEFTS = [5, 27.5, 50, 72.5, 95]

export default function BackgroundDecor() {
  return (
    <>
      <div className="fixed inset-0 w-full h-full pointer-events-none z-10 flex justify-between px-[5vw]">
        {COLUMN_LEFTS.map((left) => (
          <div key={left} className="grid-column-line" style={{ left: `${left}vw` }} />
        ))}
      </div>
      <div
        id="dynamic-glow"
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vh] rounded-full glow-backdrop pointer-events-none z-0"
      />
    </>
  )
}
