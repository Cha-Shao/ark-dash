import { useEffect } from "react"
import { Level } from "../assets/levels"
import { Howl } from 'howler'

const Music = ({
  level,
  onEnd
}: {
  level: Level
  onEnd: () => void
}) => {
  const musicUrl = `/src/assets/musics/${level.album}/${level.name}.mp3`

  const music = new Howl({
    src: [musicUrl],
    onend: () => {
      onEnd()
    }
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      // music.play()
    }, level.delay);

    return () => {
      clearTimeout(timer)
      music.stop()
    }
  }, [])

  return (
    <></>
  )
}

export default Music
