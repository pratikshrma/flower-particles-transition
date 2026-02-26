import { EffectComposer, Bloom } from '@react-three/postprocessing'

const PostProcessing = () => {
  return (
    <EffectComposer>
      <Bloom
        luminanceThreshold={1}
        intensity={1.5}
        radius={.9}
      />
    </EffectComposer>
  )
}

export default PostProcessing
