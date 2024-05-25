'use client'

import Common from '@/components/shared/common'
import Loader from '@/components/shared/loader'
import Login from '@/components/shared/login'
import ManageAccount from '@/components/shared/manage-account'
import { useGlobalContext } from '@/context'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

const Page = () => {
  const { account, pageLoader, setPageLoader } = useGlobalContext()
  const { data: session } = useSession()

  useEffect(()=> {
    setPageLoader(true)}, [])

  if (session === null) return <Login />
  if (account === null) return <ManageAccount />
  // if(pageLoader) return <Loader/>

  return <Common/>
}

export default Page