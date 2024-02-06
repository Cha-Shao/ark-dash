import levels from "../../../assets/levels"
import Level from "../../../components/Level"
import Scene from "../../../components/Scene"
import { useLoaderData } from "react-router-dom"

interface Params {
  album: string
  name: string
  challenge: boolean
}

const AlbumNamePage = () => {
  const { album, name, challenge } = useLoaderData() as Params

  if (!levels[album]) return <div>Album not found</div>
  if (!levels[album][name]) return <div>Level not found</div>

  return (
    <main>
      <Scene >
        <Level
          level={levels[album][name]}
          challenge={challenge}
        />
      </Scene>
    </main>
  )
}

export default AlbumNamePage
