import { Outlet } from "react-router"
import "./detail.scss"

function Details(){
  return (
    <>
      <div className="detailItem">
        <Outlet/>
      </div>
    </>
  )
}

export default Details