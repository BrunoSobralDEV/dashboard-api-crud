import { Menu } from "../components/Nav";
import { Customers } from "./Customers";
import { Http } from "./Http";
import { RandomDogs } from "./RandomDogs";
import { RandomUsers } from "./RandomUsers";

export function Dashboard() {
  return (
    <div className="d-flex">
      <Menu />

      <div className="d-flex vw-100 vh-100 justify-content-center align-items-center" style={{marginLeft: "280px"}}>
        {/* <RandomUsers /> */}
        {/* <Http />   */}
        {/* <RandomDogs /> */}
        <Customers />
      </div>
    </div>
  )
}