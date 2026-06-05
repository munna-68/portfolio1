/*
  Dark, moody CSS "stills" used as project image placeholders.
  Each variant is a distinct composition — no grey boxes.
*/

const variants = {
  atlas: {
    base: 'radial-gradient(120% 90% at 75% 30%, #2a1f3d 0%, #1a1424 55%, #0e0a16 100%)',
    glow: {
      background:
        'radial-gradient(closest-side, rgba(179,158,210,0.55), rgba(179,158,210,0))',
      width: '70%',
      height: '70%',
      top: '12%',
      right: '-10%',
    },
    glow2: {
      background:
        'radial-gradient(closest-side, rgba(139,126,168,0.35), rgba(139,126,168,0))',
      width: '50%',
      height: '50%',
      bottom: '-10%',
      left: '10%',
    },
    shape: (
      <div
        aria-hidden
        className="absolute"
        style={{
          top: '18%',
          right: '12%',
          width: '38%',
          aspectRatio: '1 / 1',
          border: '1px solid rgba(214, 201, 227, 0.25)',
          borderRadius: '50%',
        }}
      />
    ),
    label: 'A · 01',
  },
  meridian: {
    base: 'radial-gradient(140% 100% at 20% 80%, #1f2519 0%, #141810 50%, #0a0d08 100%)',
    glow: {
      background:
        'radial-gradient(closest-side, rgba(182,196,210,0.5), rgba(182,196,210,0))',
      width: '65%',
      height: '65%',
      top: '20%',
      left: '-5%',
    },
    glow2: {
      background:
        'radial-gradient(closest-side, rgba(139,126,168,0.28), rgba(139,126,168,0))',
      width: '45%',
      height: '45%',
      bottom: '5%',
      right: '5%',
    },
    shape: (
      <div
        aria-hidden
        className="absolute inset-0 flex flex-col justify-center gap-3 px-[12%]"
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-px"
            style={{
              background:
                'linear-gradient(90deg, rgba(214,201,227,0) 0%, rgba(214,201,227,0.35) 50%, rgba(214,201,227,0) 100%)',
              width: `${70 + i * 5}%`,
              marginLeft: `${i * 4}%`,
            }}
          />
        ))}
      </div>
    ),
    label: 'M · 02',
  },
  folio: {
    base: 'radial-gradient(130% 95% at 50% 0%, #2b1f2a 0%, #1a1218 55%, #0d0809 100%)',
    glow: {
      background:
        'radial-gradient(closest-side, rgba(214,175,200,0.5), rgba(214,175,200,0))',
      width: '60%',
      height: '60%',
      top: '8%',
      left: '20%',
    },
    glow2: {
      background:
        'radial-gradient(closest-side, rgba(139,126,168,0.4), rgba(139,126,168,0))',
      width: '55%',
      height: '55%',
      bottom: '-15%',
      right: '-10%',
    },
    shape: (
      <div
        aria-hidden
        className="absolute"
        style={{
          bottom: '15%',
          left: '8%',
          width: '60%',
          height: '1px',
          background:
            'linear-gradient(90deg, rgba(214,201,227,0.6) 0%, rgba(214,201,227,0) 100%)',
          transform: 'rotate(-12deg)',
          transformOrigin: 'left center',
        }}
      />
    ),
    label: 'F · 03',
  },
}

export default function ProjectArt({ variant = 'atlas', number, total }) {
  const v = variants[variant] ?? variants.atlas

  return (
    <div
      className="page-media relative w-full aspect-[4/3] md:aspect-[16/11] rounded-3xl overflow-hidden shadow-[0_40px_80px_-30px_rgba(26,20,36,0.55)]"
      style={{ background: v.base }}
    >
      {/* primary glow */}
      <div
        aria-hidden
        className="absolute rounded-full"
        style={{
          ...v.glow,
          position: 'absolute',
          filter: 'blur(28px)',
        }}
      />
      {/* secondary glow */}
      <div
        aria-hidden
        className="absolute rounded-full"
        style={{
          ...v.glow2,
          position: 'absolute',
          filter: 'blur(22px)',
        }}
      />
      {/* shape composition */}
      {v.shape}
      {/* grain on the art */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          opacity: 0.18,
          mixBlendMode: 'overlay',
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />
      {/* subtle vignette */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 80% at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.45) 100%)',
        }}
      />
      {/* corner index */}
      <div className="absolute top-5 left-5 flex items-center gap-2 text-[10px] font-mono tracking-widest-2 uppercase text-mauve/70">
        <span className="font-serif italic text-base not-italic-none text-mauve/90">
          {number}
        </span>
        <span className="opacity-50">/ {total}</span>
      </div>
      <div className="absolute bottom-5 right-5 label-eyebrow text-mauve/55">
        {v.label}
      </div>
    </div>
  )
}
