import {
  useTick,
} from "@pixi/react"
import Enemy from "../objects/enemy"
import { useEffect, useRef } from "react"
import { Level as LevelInterface } from "../assets/levels"
import getEnemyById from "../lib/utils/getEnemyById"
import Enemies from "./Enemies"
import Character from "./Character"
import Music from "./Music"

const Level = ({
  level,
  challenge
}: {
  level: LevelInterface
  challenge: boolean
}) => {
  const time = useRef(0)
  const summonTime = useRef(0)
  const enemies = useRef<Enemy[]>(
    (challenge
      ? level.score.challenge
      : level.score.normal
    )
      .join(' ')
      .split(' ')
      .map(displayName => {
        const component = level.components.find(({ displayName: display }) => display === displayName)
        if (!component) throw new Error(`Component ${displayName} not found`)
        if (component.type === 'delay') {
          summonTime.current += component.time / 1000
          return
        }
        const config = getEnemyById(component.id)
        if (!config) throw new Error(`Enemy ${component.id} not found`)
        return new Enemy({
          ...config,
          summonTime: summonTime.current
        })
      })
      .filter(Boolean) as Enemy[]
  )

  useTick(delta => {
    time.current += delta / 60
  })

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        window.location.href = '/'
      }
    }
    addEventListener('keydown', handleKeyDown)
    return () => {
      removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (<>
    <Enemies
      time={time.current}
      level={level}
      enemies={enemies.current}
    />
    <Character />
    <Music
      level={level}
      onEnd={() => {
        console.log('end')
      }}
    />
  </>)
}

export default Level
