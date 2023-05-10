import { NavLink } from "react-router-dom"
import Wrapper from "../assets/wrapper/BigSidebar"
import NavLinks from "./NavLinks"

function Sidebar() {
  return (
    <Wrapper>
      <div
        className={
          false ? 'sidebar-container ' : 'sidebar-container show-sidebar'
        }
      >
        <div className='content'>
          <header>
           
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  )
}

export default Sidebar