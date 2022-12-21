import { createContext, useMemo, useContext, useState } from "react";

const ClickContext = createContext()
const ClickUpdateContext = createContext()

export const useClick = () => useContext(ClickContext)
export const useClickUpdate = () => useContext(ClickUpdateContext)

export const ClickProvider = ({ children }) => {
  const [clickTarget, setClickTarget] = useState(null)

  const memoizedClickTarget = useMemo(() => clickTarget, [clickTarget])

  const selectTarget = (e) => {
    setClickTarget(e.target)
  }

  return (
    <ClickContext.Provider value={memoizedClickTarget}>
        <div onClick={selectTarget}>
          {children}
        </div>
    </ClickContext.Provider>
  )
}