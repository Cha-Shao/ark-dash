import { AnimatedSprite, Container, useTick } from "@pixi/react"
import Enemy from "../objects/enemy"
import { RefObject, createRef, useRef } from "react"
import { Texture, type Container as ContainerClass } from "pixi.js"
import { Level } from "../assets/levels"

const Enemies = ({
  time: initTime,
  level,
  enemies,
}: {
  time: number
  level: Level
  enemies: Enemy[]
}) => {
  const time = useRef(initTime)
  const enemiesDisplayRef = useRef<RefObject<ContainerClass>[]>([])

  const summonEnemies = () => {
    let summonEnemies: Enemy[] = []
    enemies.forEach(enemy => {
      if (time.current >= enemy.summonTime && enemy.mounted === false) {
        enemy.mount()
        summonEnemies.push(enemy)
      }
    })
  }
  const moveEnemies = (delta: number) => {
    const distance = delta * level.speed * window.innerWidth / 256
    enemiesDisplayRef.current.forEach((ref, i) => {
      if (enemies[i].mounted)
        ref.current!.x -= distance
    })
  }
  useTick(delta => {
    time.current += delta / 60
    summonEnemies()
    moveEnemies(delta)
  })

  return (
    <Container>
      {enemies.map((enemy, i) => {
        enemiesDisplayRef.current[i] = createRef<ContainerClass>()
        return (
          <Container
            ref={enemiesDisplayRef.current[i]}
            key={enemy.uniqueId}
            x={enemy.position}
            y={enemy.isFly
              ? window.innerHeight / 7 * 2
              : window.innerHeight / 7 * 4}
            scale={Math.min(window.innerHeight, window.innerWidth) / 1920}
          >
            <AnimatedSprite
              anchor={enemy.anchor}
              isPlaying
              textures={
                [...Array(enemy.frames)].map((_, i) => Texture.from(
                  `/src/assets/enemies/${enemy.id}/${('00' + i).slice(-3)}.png`
                ))
              }
            />
          </Container>
        )
      })}
    </Container>
  )
}

export default Enemies
