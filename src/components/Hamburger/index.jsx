import { useState } from "react";
import DropdownMenu from "../Dropdown";
import "./style.less";

export default function Hamburger({ clickedEl, title, links }) {
  const [isOpen, setIsOpen] = useState(false)

  const menuButton = () => {
    return (
      <div className="hb-button" onClick={e => setIsOpen(!isOpen)}>
        <span className="hb-line"></span>
        <span className="hb-line"></span>
        <span className="hb-line"></span>
      </div>
    )
  }

  const clickedButton = () => {
    return (
      <div className="hb-button" onClick={e => setIsOpen(!isOpen)}>
        <span className="hb-cross"></span>
        <span className="hb-cross"></span>
      </div>
    )
  }

  return (
    <div className="hb-menu">
      {isOpen ?
        clickedButton()
        :
        menuButton()
      }
      <DropdownMenu
        clickedEl={clickedEl}
        title={title}
        type={'hamburger'}
        links={links}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  )
}