import { createContext, useContext, useState, useEffect } from "react";

const ClickContext = createContext()
const ClickPositionContext = createContext()

export const useClick = () => useContext(ClickContext)
export const useClickPosition = () => useContext(ClickPositionContext)

export const ClickProvider = ({ children }) => {
  const [clickTarget, setClickTarget] = useState(null)
  const [clickPosition, setClickPosition] = useState({})

  useEffect(() => setClickPosition({
    xPos: clickTarget?.clientX, yPos: clickTarget?.clientY
  }), [clickTarget])

  return (
    <ClickContext.Provider value={clickTarget?.target}>
      <ClickPositionContext.Provider value={clickPosition}>
        <div onClick={e => setClickTarget(e)}>
          {children}
        </div>
      </ClickPositionContext.Provider>
    </ClickContext.Provider>
  )
}