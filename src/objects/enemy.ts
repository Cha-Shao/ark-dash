export interface EnemyConfig {
  id: string
  count: number
  anchor: [number, number]
  isFly: boolean
  frames: number
}

export default class Enemy {
  id: string
  uniqueId: number
  mounted: boolean = false
  summonTime: number
  count: number
  anchor: [number, number] = [0.5, 0.5]
  isFly: boolean
  frames: number
  position: number = window.innerWidth
  moveInterval: number | null = null

  constructor({
    id,
    summonTime,
    count,
    anchor,
    isFly,
    frames
  }: EnemyConfig & {
    summonTime: number
  }) {
    this.id = id
    this.uniqueId = Math.random()
    this.summonTime = summonTime
    this.count = count
    this.anchor = anchor
    this.isFly = isFly
    this.frames = frames
  }

  mount() {
    this.mounted = true
    this.onMount()
  }

  onMount() {
  }

  move(distance: number) {
    this.position -= distance
    this.onMove()
  }

  onMove() {

  }

  die() {
    this.onDie()
  }

  onDie() {

  }

  onEscape() {

  }
}
