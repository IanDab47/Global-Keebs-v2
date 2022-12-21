import { useState } from "react";
import DropdownMenu from "../Dropdown";
import "./style.less";

export default function Hamburger({ links }) {
  const [isOpen, setIsOpen] = useState(false)

  const menuButton = () => {
    return (
      <div className="hb-button">
        <span className="hb-line"></span>
        <span className="hb-line"></span>
        <span className="hb-line"></span>
      </div>
    )
  }

  const clickedButton = () => {
    return (
      <div className="hb-button">
        <span className="hb-cross"></span>
        <span className="hb-cross"></span>
      </div>
    )
  }

  return (
    <div className="hb-menu" onClick={() => setIsOpen(!isOpen)}>
      {isOpen ?
        clickedButton()
        :
        menuButton()
      }
      <DropdownMenu
        links={links}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  )
}