import { createContext, useContext, useState } from "react";

const ClickContext = createContext()
const ClickUpdateContext = createContext()

export const useClick = () => useContext(ClickContext)
export const useClickUpdate = () => useContext(ClickUpdateContext)

export const ClickProvider = ({ children }) => {
  const [clickTarget, setClickTarget] = useState(null)

  const selectTarget = (e) => {
    setClickTarget(e.target)
  }

  return (
    <ClickContext.Provider value={clickTarget}>
      <ClickUpdateContext.Provider value={selectTarget}>
        {children}
      </ClickUpdateContext.Provider>
    </ClickContext.Provider>
  )
}