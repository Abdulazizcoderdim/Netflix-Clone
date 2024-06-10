'use client'

import Common from '@/components/shared/common'
import Loader from '@/components/shared/loader'
import Login from '@/components/shared/login'
import ManageAccount from '@/components/shared/manage-account'
import { useGlobalContext } from '@/context'
import { getTrendingMoview } from '@/lib/api'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

const Page = () => {
  const { account, pageLoader, setPageLoader } = useGlobalContext()
  const { data: session } = useSession()

  useEffect(() => {
    const getAllMovies = async () => {
      const [trendingMovies, trendingTv] = await Promise.all([
        getTrendingMoview("movie"),
        getTrendingMoview("tv")
      ])
 
      console.log("MOVIE", trendingMovies)
      console.log("TV", trendingTv)
    }

    setPageLoader(false)
    getAllMovies()
  }, [])

  if (session === null) return <Login />
  if (account === null) return <ManageAccount />
  if (pageLoader) return <Loader />

  return <Common />
}

export default Page
