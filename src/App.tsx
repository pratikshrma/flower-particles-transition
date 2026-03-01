import { Canvas } from "@react-three/fiber"
import Experience from "./Components/Experience"
import { OrbitControls } from "@react-three/drei"
import style from './Styles/app.module.css'
import gsap from 'gsap'
import { useControls, folder } from "leva"
import { useEffect, useRef } from "react"
import PostProcessing from "./Components/PostProcessing"

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
  // const { progress } = useControls({
  //   'random controls': folder({
  //     progress: {
  //       value: 0.0,
  //       min: 0.0,
  //       max: 1.0,
  //       step: 0.0001
  //     },
  //     uTimeLineProgress: {
  //       value: 0.0,
  //       min: 0.0,
  //       max: 20.0,
  //       step: 0.0001,
  //       onChange: (v) => {
  //         if (tl.current) {
  //           tl.current.seek(v)
  //         }
  //       }
  //     }
  //   })
  // })

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
    const EPIC_EASE = "expo.inOut"
    const BLOOM_PEAK = 3.0

    tl.current = gsap.timeline({
      paused: false,
      repeat: -1
    })

    // flower 1 (starts at 0)
    tl.current.to(video1PlayerHolderRef.current, { zIndex: 3, duration: 0.01 }, 0)
    tl.current.call(() => video1PlayerRef.current?.play(), null, 0)
    tl.current.to(canvasHolderRef.current, { opacity: 0, duration: 0.01 }, 0.1)
    tl.current.to(video1PlayerHolderRef.current, { zIndex: -1, duration: 0.01 }, 3.9622)
    tl.current.to(canvasHolderRef.current, { opacity: 1, duration: 0.01 }, 3.9622)
    tl.current.to(progress, { current: 1, duration: 10, ease: EPIC_EASE }, 3.9622)
    tl.current.to(bloomIntensity, { current: BLOOM_PEAK, duration: 3, ease: EPIC_EASE }, 5.9622)
    tl.current.to(bloomIntensity, { current: BLOOM_INITIAL, duration: 3, ease: EPIC_EASE }, 8.9622)

    // flower 2 (starts at 14)
    tl.current.to(video2PlayerHolderRef.current, { zIndex: 3, duration: 0.01 }, 14)
    tl.current.call(() => video2PlayerRef.current?.play(), null, 14)
    tl.current.to(canvasHolderRef.current, { opacity: 0, duration: 0.01 }, 14.1)
    tl.current.to(video2PlayerHolderRef.current, { zIndex: -1, duration: 0.01 }, 17.9622)
    tl.current.to(canvasHolderRef.current, { opacity: 1, duration: 0.01 }, 17.9622)
    tl.current.to(progress, { current: 2, duration: 10, ease: EPIC_EASE }, 17.9622)
    tl.current.to(bloomIntensity, { current: BLOOM_PEAK, duration: 3, ease: EPIC_EASE }, 19.9622)
    tl.current.to(bloomIntensity, { current: BLOOM_INITIAL, duration: 3, ease: EPIC_EASE }, 22.9622)

    // flower 3 (starts at 28.1)
    tl.current.to(video3PlayerHolderRef.current, { zIndex: 3, duration: 0.01 }, 28.1)
    tl.current.call(() => video3PlayerRef.current?.play(), null, 28.1)
    tl.current.to(canvasHolderRef.current, { opacity: 0, duration: 0.01 }, 28.2)
    tl.current.to(video3PlayerHolderRef.current, { zIndex: -1, duration: 0.01 }, 32.0622)
    tl.current.to(canvasHolderRef.current, { opacity: 1, duration: 0.01 }, 32.0622)
    tl.current.to(progress, { current: 3, duration: 10, ease: EPIC_EASE }, 32.0622)
    tl.current.to(bloomIntensity, { current: BLOOM_PEAK, duration: 3, ease: EPIC_EASE }, 34.0622)
    tl.current.to(bloomIntensity, { current: BLOOM_INITIAL, duration: 3, ease: EPIC_EASE }, 37.0622)

    return () => {
      tl.current.kill()
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
          <Canvas linear camera={{
            position: [0, 0, -1.1],
          }}>
            <color attach="background" args={['#000']} />
            <OrbitControls />
            <PostProcessing />
            <Experience progress={progress} bloomIntensity={bloomIntensity} />
          </Canvas>
        </div>
      </div>
    </>
  )
}

export default App
