"use client"

import Login from "@/components/shared/login";
import ManageAccount from "@/components/shared/manage-account";
import { useGlobalContext } from "@/context"
import { useSession } from "next-auth/react";

const Page = () => {
   const {account} = useGlobalContext(); 
   const {data: session} = useSession();


   if(session === null) return <Login/>
    if(account === null) return <ManageAccount/>

  return (
    <div>Browse Page</div>
  )
}

export default Page