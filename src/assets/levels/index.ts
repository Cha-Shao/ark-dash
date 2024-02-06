import { load } from "js-yaml"

interface DisplayName {
  displayName: string
}

interface ComponentDelay extends DisplayName {
  type: 'delay'
  time: number
}
interface ComponentEnemy extends DisplayName {
  type: 'enemy'
  id: string
  count: number
  isFly: number
}

export interface Level {
  album: string
  name: string
  authors: string[]
  speed: number
  delay: number
  components: (ComponentDelay | ComponentEnemy)[]
  score: {
    normal: string[]
    challenge: string[]
  }
}

const levels = import.meta.glob(
  './**/*.yml',
  {
    as: 'raw',
    eager: true
  }
)

let output: { [key: string]: { [key: string]: any } } = {}

Object.entries(levels)
  .map(([key, val]) => {
    const album = key.split('/')[1]
    const name = key.split('/')[2].replace('.yml', '')
    if (!output[album]) {
      output[album] = {}
    }
    output[album][name] = load(val)
  })

export default output as Record<string, Record<string, Level>>
