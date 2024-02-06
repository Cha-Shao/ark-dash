import characters from "../../assets/characters"

const getCharacterById = (id: string) => {
  return characters.find((character) => character.id === id)
}

export default getCharacterById
