/*
  Project thumbnails — CSS-only compositions that double as case-study heroes.
  Each variant is a distinct mood; no grey boxes.
*/

const variants = {
  cafuno: {
    base: 'radial-gradient(120% 90% at 70% 30%, #3a2a1f 0%, #221710 55%, #120a07 100%)',
    glow: {
      background:
        'radial-gradient(closest-side, rgba(214,178,140,0.55), rgba(214,178,140,0))',
      width: '70%',
      height: '70%',
      top: '10%',
      right: '-8%',
    },
    glow2: {
      background:
        'radial-gradient(closest-side, rgba(139,178,140,0.22), rgba(139,178,140,0))',
      width: '55%',
      height: '55%',
      bottom: '-12%',
      left: '6%',
    },
    shape: (
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center"
      >
        <div
          className="relative"
          style={{ width: '52%', aspectRatio: '1 / 1' }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: '1px solid rgba(245, 230, 210, 0.25)',
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              inset: '18%',
              border: '1px solid rgba(245, 230, 210, 0.18)',
            }}
          />
          <div
            className="absolute"
            style={{
              top: '50%',
              left: '50%',
              width: '8%',
              height: '8%',
              borderRadius: '50%',
              background: 'rgba(245, 230, 210, 0.55)',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>
      </div>
    ),
    label: 'C · 01',
    labelTone: 'rgba(245, 230, 210, 0.7)',
    glyph: 'café',
  },
  travel: {
    base: 'radial-gradient(140% 100% at 20% 70%, #14222c 0%, #0c1620 50%, #06090d 100%)',
    glow: {
      background:
        'radial-gradient(closest-side, rgba(154,196,224,0.5), rgba(154,196,224,0))',
      width: '70%',
      height: '70%',
      top: '12%',
      left: '-6%',
    },
    glow2: {
      background:
        'radial-gradient(closest-side, rgba(214,201,227,0.28), rgba(214,201,227,0))',
      width: '50%',
      height: '50%',
      bottom: '0%',
      right: '5%',
    },
    shape: (
      <div
        aria-hidden
        className="absolute inset-0"
      >
        <svg
          viewBox="0 0 400 300"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          <path
            d="M 0 230 Q 80 200 160 215 T 320 200 T 400 220"
            fill="none"
            stroke="rgba(214,224,234,0.45)"
            strokeWidth="0.8"
          />
          <path
            d="M 0 250 Q 80 230 160 240 T 320 230 T 400 245"
            fill="none"
            stroke="rgba(214,224,234,0.28)"
            strokeWidth="0.6"
          />
          <path
            d="M 0 210 Q 80 175 160 195 T 320 175 T 400 200"
            fill="none"
            stroke="rgba(214,224,234,0.18)"
            strokeWidth="0.5"
          />
          <circle cx="305" cy="92" r="22" fill="rgba(245,238,222,0.92)" />
          <circle cx="305" cy="92" r="36" fill="none" stroke="rgba(245,238,222,0.25)" strokeWidth="0.6" />
        </svg>
      </div>
    ),
    label: 'T · 02',
    labelTone: 'rgba(214,224,234,0.7)',
    glyph: 'route',
  },
  lumis: {
    base: 'radial-gradient(120% 95% at 30% 0%, #2a232c 0%, #1a1419 50%, #0b0809 100%)',
    glow: {
      background:
        'radial-gradient(closest-side, rgba(214,175,200,0.45), rgba(214,175,200,0))',
      width: '65%',
      height: '65%',
      top: '-5%',
      right: '10%',
    },
    glow2: {
      background:
        'radial-gradient(closest-side, rgba(214,201,227,0.32), rgba(214,201,227,0))',
      width: '55%',
      height: '55%',
      bottom: '-10%',
      left: '5%',
    },
    shape: (
      <div
        aria-hidden
        className="absolute inset-0"
      >
        <div
          className="absolute"
          style={{
            top: '22%',
            left: '14%',
            width: '24%',
            height: '56%',
            background:
              'linear-gradient(180deg, rgba(245,238,222,0.85) 0%, rgba(214,201,227,0.55) 100%)',
            mixBlendMode: 'screen',
            opacity: 0.7,
          }}
        />
        <div
          className="absolute"
          style={{
            top: '32%',
            left: '42%',
            width: '24%',
            height: '46%',
            background:
              'linear-gradient(180deg, rgba(214,175,200,0.75) 0%, rgba(154,196,224,0.4) 100%)',
            mixBlendMode: 'screen',
            opacity: 0.65,
          }}
        />
        <div
          className="absolute"
          style={{
            top: '18%',
            left: '70%',
            width: '18%',
            height: '60%',
            background:
              'linear-gradient(180deg, rgba(245,230,210,0.7) 0%, rgba(139,178,140,0.35) 100%)',
            mixBlendMode: 'screen',
            opacity: 0.6,
          }}
        />
      </div>
    ),
    label: 'L · 03',
    labelTone: 'rgba(245,238,222,0.7)',
    glyph: 'studio',
  },
  // Legacy variants — retained for the work page timeline.
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
    labelTone: 'rgba(214, 201, 227, 0.7)',
    glyph: null,
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
    labelTone: 'rgba(214, 201, 227, 0.7)',
    glyph: null,
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
    labelTone: 'rgba(214, 201, 227, 0.7)',
    glyph: null,
  },
}

export default function ProjectArt({
  variant = 'cafuno',
  number,
  total,
  tone = 'dark',
}) {
  const v = variants[variant] ?? variants.cafuno

  // Tone: 'dark' = project page hero (dark composition);
  //       'light' = landing page card (same composition, no corner labels).
  const isLight = tone === 'light'

  return (
    <div
      className="page-media relative w-full aspect-[3/4] md:aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_40px_80px_-30px_rgba(26,20,36,0.55)]"
      style={{ background: v.base }}
    >
      <div
        aria-hidden
        className="absolute rounded-full"
        style={{
          ...v.glow,
          position: 'absolute',
          filter: 'blur(28px)',
        }}
      />
      <div
        aria-hidden
        className="absolute rounded-full"
        style={{
          ...v.glow2,
          position: 'absolute',
          filter: 'blur(22px)',
        }}
      />
      {v.shape}
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
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 80% at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.45) 100%)',
        }}
      />
      {!isLight && number && (
        <div
          className="absolute top-5 left-5 flex items-center gap-2 text-[10px] font-mono tracking-widest-2 uppercase"
          style={{ color: v.labelTone }}
        >
          <span className="font-serif italic text-base">{number}</span>
          <span className="opacity-50">/ {total}</span>
        </div>
      )}
      {!isLight && (
        <div
          className="absolute bottom-5 right-5 label-eyebrow"
          style={{ color: v.labelTone }}
        >
          {v.label}
        </div>
      )}
    </div>
  )
}
