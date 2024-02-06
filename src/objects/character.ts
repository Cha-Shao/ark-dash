export interface CharacterConfig {
  id: string
  name: string
  anchor: [number, number]
  frames: {
    start: number
    idle: number
    attackUp: number
    attackDown: number
    die: number
  }
}

export default class Character {
  id: string
  name: string
  frames: {
    start: number
  }

  constructor({
    id,
    name,
    frames
  }: CharacterConfig) {
    this.id = id
    this.name = name
    this.frames = frames
  }

  attackDown() {
    this.onAttackDown()
  }

  onAttackDown() {
    console.log(`Character ${this.id} attack down at ${new Date().getTime()}`)
  }
}