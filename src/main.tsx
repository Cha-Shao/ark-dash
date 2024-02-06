import React from "react"
import ReactDOM from "react-dom/client"
import "./styles.css"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Page from "./view/page"
import AlbumNamePage from "./view/[album]/[name]/page"

const router = createBrowserRouter([{
  path: '/',
  element: <Page />
}, {
  path: '/:album/:name',
  element: <AlbumNamePage />,
  loader: args => {
    const { params, request } = args
    return {
      album: params.album,
      name: params.name,
      challenge: Boolean(new URL(request.url).searchParams.get('challenge'))
    }
  }
}])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
