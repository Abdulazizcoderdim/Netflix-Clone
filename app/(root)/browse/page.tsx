"use client"

import Login from "@/components/shared/login";
import { useGlobalContext } from "@/context"

const Page = () => {
   const {account} = useGlobalContext(); 

   if(account === null) return <Login/>

  return (
    <div>Browse Page</div>
  )
}

export default Page
// 37:00