import {
  Stage,
} from '@pixi/react'
import {
  PropsWithChildren,
  useEffect,
  useState
} from 'react'

const Scene = ({
  children
}: PropsWithChildren) => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight)

  useEffect(
    () => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    },
    []
  )

  return (
    <Stage
      width={windowWidth}
      height={windowHeight}
      options={{
        backgroundColor: 0x86acb1,
        autoDensity: true
      }}
    >
      {children}
    </Stage>
  )
}

export default Scene
