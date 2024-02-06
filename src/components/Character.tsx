import { AnimatedSprite, Container, useTick } from "@pixi/react"
import { Texture } from "pixi.js"
import type {
  Container as ContainerClass,
  AnimatedSprite as AnimatedSpriteClass
} from "pixi.js"
import { useEffect, useRef } from "react"
import getCharacterById from "../lib/utils/getCharacterById"

enum AnimationType {
  Start = 'start',
  Idle = 'idle',
  AttackUp = 'attackUp',
  AttackDown = 'attackDown',
  Die = 'die'
}

const Character = () => {
  const characterId = 'amiya'
  const character = getCharacterById(characterId)
  if (!character) throw new Error(`Character ${characterId} not found`)

  const characterGroupRef = useRef<ContainerClass>(null)
  const characterSpriteRef = useRef<AnimatedSpriteClass>(null)
  const animation = useRef(AnimationType.Idle)
  const animationTimeout = useRef<number | null>(null)
  const isFly = useRef(false)
  const toGroundTimeout = useRef<number | null>(null)

  const playAnimation = (type: AnimationType) => {
    if (animation.current === type) {
      if (type === AnimationType.AttackUp || type === AnimationType.AttackDown) {
        characterSpriteRef.current!.stop()
        characterSpriteRef.current!.play()
      }
    }
    if (animationTimeout.current)
      clearTimeout(animationTimeout.current)
    animation.current = type
    characterSpriteRef.current!.textures =
      [...Array(character.frames[type])]
        .map((_, i) => Texture.from(
          `/src/assets/characters/${character.id}/${type}/${('00' + i).slice(-3)}.png`
        ))
    characterSpriteRef.current!.play()
    if (type !== AnimationType.Idle) {
      animationTimeout.current = setTimeout(() => {
        playAnimation(AnimationType.Idle)
      }, character.frames[type] * 1000 / 60)
    }
  }

  useEffect(() => {
    const listenKeyPress = (e: KeyboardEvent) => {
      // asdf的任意一个（空中）
      if (['a', 's', 'd', 'f'].includes(e.key)) {
        const hit = false
        if (toGroundTimeout.current) {
          // 浮空中
          // 打到了，重置掉落时间
          if (hit) {
            clearTimeout(toGroundTimeout.current)
            toGroundTimeout.current = setTimeout(() => {
              isFly.current = false
              toGroundTimeout.current = null
            }, 1e3)
          } else {
            // 没打到，继续先前计划的掉落
          }
        } else {
          // 没有浮空
          isFly.current = true
          // 设置掉落
          toGroundTimeout.current = setTimeout(() => {
            isFly.current = false
            toGroundTimeout.current = null
          }, 1e3)
        }

        console.log('up')
        characterSpriteRef.current!.stop()
        playAnimation(AnimationType.AttackUp)
        return
      }

      // jkl;的任意一个（地面）
      if (['j', 'k', 'l', ';'].includes(e.key)) {
        console.log('down')
        characterSpriteRef.current!.stop()
        if (toGroundTimeout.current) {
          clearTimeout(toGroundTimeout.current)
          isFly.current = false
          toGroundTimeout.current = null
        }
        playAnimation(AnimationType.AttackDown)
        return
      }
    }

    playAnimation(AnimationType.Start)

    addEventListener('keydown', listenKeyPress)
    return () => {
      removeEventListener('keydown', listenKeyPress)
    }
  }, [])

  useTick(() => {
    console.log(toGroundTimeout.current)
    console.log(isFly.current)
    if (isFly.current) {
      // 浮空
      characterGroupRef.current!.y = window.innerHeight / 7 * 2
    } else {
      // 地面
      characterGroupRef.current!.y = window.innerHeight / 7 * 4
    }
  })

  return (
    <Container
      ref={characterGroupRef}
      scale={Math.min(window.innerHeight, window.innerWidth) / 1920}
      x={window.innerWidth / 9}
      y={window.innerHeight / 7 * 4}
    >
      <AnimatedSprite
        ref={characterSpriteRef}
        anchor={character.anchor}
        isPlaying
        textures={
          [...Array(character.frames.start)].map((_, i) => Texture.from(
            `/src/assets/characters/${character.id}/${animation.current}/${('00' + i).slice(-3)}.png`
          ))
        }
      />
    </Container>
  )
}

export default Character
