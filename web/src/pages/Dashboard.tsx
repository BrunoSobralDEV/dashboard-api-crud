import { Outlet } from 'react-router-dom'
 
import { Menu } from "../components/Nav";

export function Dashboard() {
  return (
    <div className="d-flex">
      <Menu />

      <div className="d-flex vw-100 vh-100 justify-content-center align-items-center" style={{marginLeft: "280px"}}>
        <Outlet /> 
      </div>
    </div>
  )
}