import cafeVideo from '../videos/cafe.mp4'
import travelVideo from '../videos/travel.mp4'
import lumisVideo from '../videos/lumis.mp4'

export const slides = [
  {
    id: 1,
    video: cafeVideo,
    overlay: 'bg-stone-900/10 mix-blend-multiply',
    label: null,
    heading: null,
  },
  {
    id: 2,
    video: travelVideo,
    overlay: 'bg-purple-950/25 mix-blend-multiply',
    label: null,
    heading: null,
  },
  {
    id: 3,
    video: lumisVideo,
    overlay: 'bg-stone-950/35 mix-blend-multiply',
    label: null,
    heading: null,
  },
  {
    id: 4,
    video: null,
    overlay: 'bg-stone-950/55 mix-blend-multiply',
    label: 'available',
    heading: 'Get in touch',
  },
]
