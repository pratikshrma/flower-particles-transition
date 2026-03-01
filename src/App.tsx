import { Canvas } from "@react-three/fiber"
import Experience from "./Components/Experience"
import style from './Styles/app.module.css'
import gsap from 'gsap'
import { useEffect, useRef } from "react"
import { CustomEase } from "gsap/all"

gsap.registerPlugin(CustomEase)

const App = () => {
  const canvasHolderRef = useRef<HTMLDivElement | null>(null)
  const videoPlayerHolderRef = useRef<HTMLDivElement | null>(null)
  const video1PlayerRef = useRef<HTMLVideoElement | null>(null)
  const video2PlayerRef = useRef<HTMLVideoElement | null>(null)
  const video3PlayerRef = useRef<HTMLVideoElement | null>(null)
  const video1PlayerHolderRef = useRef<HTMLDivElement | null>(null)
  const video2PlayerHolderRef = useRef<HTMLDivElement | null>(null)
  const video3PlayerHolderRef = useRef<HTMLDivElement | null>(null)
  const tl = useRef<gsap.core.Timeline>(null)


  const BLOOM_INITIAL = 1
  const progress = useRef<number>(0.0)
  const bloomIntensity = useRef<number>(BLOOM_INITIAL)

  useEffect(() => {
    if (
      !video1PlayerHolderRef.current ||
      !video2PlayerHolderRef.current ||
      !video3PlayerHolderRef.current ||
      !canvasHolderRef.current
    ) return

    gsap.set(video1PlayerHolderRef.current, { zIndex: -1 })
    gsap.set(video2PlayerHolderRef.current, { zIndex: -1 })
    gsap.set(video3PlayerHolderRef.current, { zIndex: -1 })

    // const EPIC_EASE = "cubic-bezier(0.95, 0.0, 0.05, 1)"
    // const EPIC_EASE = "expo.inOut"
    // const EPIC_EASE = CustomEase.create("custom", "M0,0 C0.795,0 1,0.299 1,1 ");
    const EPIC_EASE = CustomEase.create("custom", "M0,0 C1.026,0 0.754,1 1,1 ")
    const BLOOM_PEAK = 3.0

    tl.current = gsap.timeline({
      paused: false,
      repeat: -1
    })

    tl.current.set(progress, { current: 0 }, 0)
    tl.current.to(video1PlayerHolderRef.current, { zIndex: 3, duration: 0.01 }, 0)
    tl.current.call(() => { video1PlayerRef.current?.play() }, undefined, 0)
    tl.current.to(canvasHolderRef.current, { opacity: 0, duration: 0.01 }, 0.1)
    tl.current.to(video1PlayerHolderRef.current, { zIndex: -1, duration: 0.01 }, 3.9622)
    tl.current.to(canvasHolderRef.current, { opacity: 1, duration: 0.01 }, 3.9652)
    tl.current.to(progress, { current: 1, duration: 5, ease: EPIC_EASE }, 3.9652)
    tl.current.to(bloomIntensity, { current: BLOOM_PEAK, duration: 2.5, ease: EPIC_EASE }, 3.9652)
    tl.current.to(bloomIntensity, { current: BLOOM_INITIAL, duration: 2.5, ease: EPIC_EASE }, 6.4652)

    // flower 2 (starts at 8.9652 — right when transition ends)
    tl.current.to(video2PlayerHolderRef.current, { zIndex: 3, duration: 0.01 }, 8.9652)
    tl.current.call(() => { video2PlayerRef.current?.play() }, undefined, 8.9652)
    tl.current.to(canvasHolderRef.current, { opacity: 0, duration: 0.01 }, 9.0652)
    tl.current.set(progress, { current: 1.0001 }, 9.1652)
    tl.current.to(video2PlayerHolderRef.current, { zIndex: -1, duration: 0.01 }, 12.9274)
    tl.current.to(canvasHolderRef.current, { opacity: 1, duration: 0.01 }, 12.9274)
    tl.current.to(progress, { current: 2, duration: 5, ease: EPIC_EASE }, 12.9274)
    tl.current.to(bloomIntensity, { current: BLOOM_PEAK, duration: 2.5, ease: EPIC_EASE }, 12.9274)
    tl.current.to(bloomIntensity, { current: BLOOM_INITIAL, duration: 2.5, ease: EPIC_EASE }, 15.4274)

    // flower 3 (starts at 17.9274 — right when transition ends)
    tl.current.to(video3PlayerHolderRef.current, { zIndex: 3, duration: 0.01 }, 17.9274)
    tl.current.call(() => { video3PlayerRef.current?.play() }, undefined, 17.9274)
    tl.current.to(canvasHolderRef.current, { opacity: 0, duration: 0.01 }, 18.0274)
    tl.current.set(progress, { current: 2.0001 }, 18.1274)
    tl.current.to(video3PlayerHolderRef.current, { zIndex: -1, duration: 0.01 }, 21.8896)
    tl.current.to(canvasHolderRef.current, { opacity: 1, duration: 0.01 }, 21.8896)
    tl.current.to(progress, { current: 3, duration: 5, ease: EPIC_EASE }, 21.8896)
    tl.current.to(bloomIntensity, { current: BLOOM_PEAK, duration: 2.5, ease: EPIC_EASE }, 21.8896)
    tl.current.to(bloomIntensity, { current: BLOOM_INITIAL, duration: 2.5, ease: EPIC_EASE }, 24.3896)

    return () => {
      if (tl.current) {
        tl.current.kill()
      }
    }
  }, [])



  return (
    <>
      <div className={style.appHolder}>
        <div ref={videoPlayerHolderRef} className={style.videoPlayerHolder}>
          <div ref={video1PlayerHolderRef} className={style.individualVideoHolder1}>
            <video ref={video1PlayerRef} src="videos/video-01.mp4" muted playsInline />
          </div>
          <div ref={video2PlayerHolderRef} className={style.individualVideoHolder2}>
            <video ref={video2PlayerRef} src="videos/video-02.mp4" muted playsInline />
          </div>
          <div ref={video3PlayerHolderRef} className={style.individualVideoHolder3} >
            <video ref={video3PlayerRef} src="videos/video-03.mp4" muted playsInline />
          </div>
        </div>
        <div ref={canvasHolderRef} className={style.canvasHolder}>
          <Canvas flat camera={{
            position: [0, 0, -1.1],
          }}
            dpr={[1.0, 1.5]}
          >
            <color attach="background" args={['#000']} />
            <Experience progress={progress} bloomIntensity={bloomIntensity} />
          </Canvas>
        </div>
      </div>
    </>
  )
}

export default App
