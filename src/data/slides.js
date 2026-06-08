import cafeVideo from '../videos/cafe.mp4'
import travelVideo from '../videos/travel.mp4'
import lumisVideo from '../videos/lumis.mp4'

export const PEXELS_VIDEO =
  'https://videos.pexels.com/video-files/3163534/3163534-uhd_2560_1440_30fps.mp4'

export const slides = [
  {
    id: 1,
    video: cafeVideo,
    overlay: null,
    label: null,
    heading: null,
  },
  {
    id: 2,
    video: travelVideo,
    overlay: null,
    label: null,
    heading: null,
  },
  {
    id: 3,
    video: lumisVideo,
    overlay: null,
    label: null,
    heading: null,
  },
  {
    id: 4,
    video: PEXELS_VIDEO,
    overlay: 'bg-stone-950/55 mix-blend-multiply',
    label: 'available',
    heading: 'Get in touch',
  },
]
