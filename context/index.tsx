"use client"

import { createContext, useContext, useState } from "react"
import { AccountProps, ChildProps, ContextType } from "@/types"

export const Context = createContext<ContextType | null>(null)

const GlobalContext = ({children}: ChildProps) => {
  const [account, setAccount] = useState<AccountProps | null>(null)
  
  return (
    <Context.Provider value={{account, setAccount}}>
      {children}
    </Context.Provider>
  )
}

export default GlobalContext

export const useGlobalContext = () => {
  const context = useContext(Context)
  if(context === null) {
    throw new Error("No context provided")
  }

  return context
}

