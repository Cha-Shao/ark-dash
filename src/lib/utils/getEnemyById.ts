import enemies from "../../assets/enemies"

const getEnemyById = (id: string) => {
  return enemies.find((enemy) => enemy.id === id)
}

export default getEnemyById
