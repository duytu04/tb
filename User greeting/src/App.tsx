import { useEffect } from 'react'
import PetalsCanvas from './components/PetalsCanvas'
import EnvelopeOverlay from './components/EnvelopeOverlay'
import FloatingMusicButton from './components/FloatingMusicButton'
import FloatingGiftButton from './components/FloatingGiftButton'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Family from './components/Family'
import Events from './components/Events'
import Story from './components/Story'
import MemoryFilm from './components/MemoryFilm'
import Gallery from './components/Gallery'
import Rsvp from './components/Rsvp'
import Guestbook from './components/Guestbook'
import GiftModal from './components/GiftModal'
import MapModal from './components/MapModal'
import Lightbox from './components/Lightbox'
import Footer from './components/Footer'
import MobileDock from './components/MobileDock'

const runtimeScripts = [
  '/runtime/config.js',
  '/runtime/opening.js',
  '/runtime/music.js',
  '/runtime/app.js',
  '/runtime/overrides.js',
]

function loadScript(src: string, type?: string) {
  return new Promise<void>((resolve, reject) => {
    const el = document.createElement('script')
    el.src = src
    if (type) el.type = type
    el.onload = () => resolve()
    el.onerror = () => reject(new Error('Failed to load ' + src))
    document.body.appendChild(el)
  })
}

function isLiteDevice() {
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } }
  return (
    matchMedia('(prefers-reduced-motion: reduce)').matches ||
    nav.connection?.saveData === true ||
    (nav.deviceMemory !== undefined && nav.deviceMemory <= 2) ||
    nav.hardwareConcurrency <= 2
  )
}

let booted = false

async function bootInvitation() {
  if (booted) return
  booted = true
  for (const src of runtimeScripts) await loadScript(src)
  const w = window as unknown as Record<string, () => void>
  w.__weddingOverrides?.()
  w.__weddingBoot?.()
  if (isLiteDevice()) {
    document.documentElement.classList.add('lite-motion')
    return
  }
  const idle = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => void })
    .requestIdleCallback
  if (idle) idle(() => void loadScript('/runtime/silk.js', 'module'), { timeout: 1500 })
  else setTimeout(() => void loadScript('/runtime/silk.js', 'module'), 600)
}

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add('invitation-locked')
    document.body.classList.add('invitation-locked')
    bootInvitation()
    const root = document.documentElement
    const onScroll = () => root.classList.toggle('is-scrolled', window.scrollY > 90)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <PetalsCanvas />
      <EnvelopeOverlay />
      <FloatingMusicButton />
      <FloatingGiftButton />
      <Navbar />
      <Hero />
      <Family />
      <Events />
      <Story />
      <MemoryFilm />
      <Gallery />
      <Rsvp />
      <Guestbook />
      <GiftModal />
      <MapModal />
      <Lightbox />
      <Footer />
      <MobileDock />
    </>
  )
}
