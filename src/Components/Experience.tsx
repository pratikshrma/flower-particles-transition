import { useTexture } from "@react-three/drei"
import { useMemo, useRef } from "react"
import * as THREE from 'three'
import pointVertShader from "../Shaders/Points/vert.glsl"
import pointFragShader from '../Shaders/Points/frag.glsl'
import { useFrame } from "@react-three/fiber"

const Experience = ({ progress, bloomIntensity }: { progress: any, bloomIntensity: any }) => {
  const textureVid1F = useTexture('images/video-01-first.jpg') as THREE.Texture
  const textureVid1E = useTexture('images/video-01-end.jpg') as THREE.Texture
  const textureVid2F = useTexture('images/video-02-first.jpg') as THREE.Texture
  const textureVid2E = useTexture('images/video-02-end.jpg') as THREE.Texture
  const textureVid3F = useTexture('images/video-03-first.jpg') as THREE.Texture
  const textureVid3E = useTexture('images/video-03-end.jpg') as THREE.Texture
  const primitiveRef = useRef<THREE.Mesh | null>(null)

  const { video1PointCloud } = useMemo(() => {
    const isMobile = window.innerWidth < 768
    const width = isMobile ? 500 * 0.5 : 800
    const height = isMobile ? 1000 * 0.5 : 600
    const video1Geometry = new THREE.PlaneGeometry(
      1,
      (textureVid1F.image as HTMLImageElement).height / (textureVid1F.image as HTMLImageElement).width,
      width,
      height
    )
    video1Geometry.deleteAttribute('normal')
    video1Geometry.setIndex(null)

    const video1Material = new THREE.ShaderMaterial({
      vertexShader: pointVertShader,
      fragmentShader: pointFragShader,
      uniforms: {
        uTextureVid1F: { value: null },
        uTextureVid1E: { value: null },
        uTextureVid2F: { value: null },
        uTextureVid2E: { value: null },
        uTextureVid3F: { value: null },
        uTextureVid3E: { value: null },
        uProgress: { value: 0 },
        uTime: { value: 0 },
        uLuminosity: { value: 1.0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) }

      }
    })

    const video1PointCloud = new THREE.Points(video1Geometry, video1Material)
    return { video1PointCloud }

  }, [textureVid1F])

  useFrame((state) => {
    if (primitiveRef.current) {
      const pointCloudMaterial = primitiveRef.current.material as THREE.ShaderMaterial
      pointCloudMaterial.uniforms.uTextureVid1F.value = textureVid1F
      pointCloudMaterial.uniforms.uTextureVid1E.value = textureVid1E
      pointCloudMaterial.uniforms.uTextureVid2F.value = textureVid2F
      pointCloudMaterial.uniforms.uTextureVid2E.value = textureVid2E
      pointCloudMaterial.uniforms.uTextureVid3F.value = textureVid3F
      pointCloudMaterial.uniforms.uTextureVid3E.value = textureVid3E
      pointCloudMaterial.uniforms.uProgress.value = progress.current
      pointCloudMaterial.uniforms.uTime.value = state.clock.elapsedTime * 0.1
      pointCloudMaterial.uniforms.uLuminosity.value = bloomIntensity.current
    }
  })

  return (
    <>
      <primitive ref={primitiveRef} object={video1PointCloud} />
    </ >
  )
}

export default Experience
