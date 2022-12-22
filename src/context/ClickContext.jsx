import { createContext, useContext, useState, useEffect } from "react";

const ClickContext = createContext()

export const useClick = () => useContext(ClickContext)

export const ClickProvider = ({ children }) => {
  const [clickTarget, setClickTarget] = useState(null)

  return (
    <ClickContext.Provider value={clickTarget}>
        <div onClick={e => setClickTarget(e.target)}>
          {children}
        </div>
    </ClickContext.Provider>
  )
}