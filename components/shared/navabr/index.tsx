'use client'

import Image from 'next/image'
import { MenuItemProps } from '@/types'
import { menuItems } from '@/constants'
import { AiOutlineSearch } from 'react-icons/ai'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useGlobalContext } from '@/context'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import { useState } from 'react'

const Navbar = () => {
  const { account, setAccount } = useGlobalContext()
  const [showSearchBar, setShowSearchBar] = useState(false)

  const logout = () => {
    sessionStorage.removeItem('account')
    signOut()
    setAccount(null)
  }

  return (
    <div className="relative">
      <header className="header md:px-10 px-5 py-4">
        <div className="flex items-center h-full space-x-2 md:space-x-10">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            width={120}
            height={120}
            alt="NETFLIX"
            className="cursor-pointer object-contain"
          />
          <ul className="hidden md:space-x-4 md:flex cursor-pointer">
            {menuItems.map((item: MenuItemProps) => (
              <li
                className="cursor-pointer text-[16px] font-light text-[#e5e5e5] transition duration-[.4s] hover:text-[#b3b3b3]"
                key={item.path}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="font-light flex items-center space-x-4 text-sm">
         {showSearchBar ? (

         ) : (
           <AiOutlineSearch className="hidden sm:inline sm:w-6 sm:h-6 cursor-pointer" />
         )}

          <Popover>
            <PopoverTrigger>
              <div className="flex gap-2 items-center cursor-pointer">
                <img
                  src="https://occ-0-2611-3663.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABfNXUMVXGhnCZwPI1SghnGpmUgqS_J-owMff-jig42xPF7vozQS1ge5xTgPTzH7ttfNYQXnsYs4vrMBaadh4E6RTJMVepojWqOXx.png?r=1d4"
                  alt="Current Profile"
                  className="max-w-[30px] rounded min-w-[20px] max-h-[30px] min-h-[20px] object-cover w-[30px] h-[30px]"
                />
                <p>{account && account.name}</p>
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <button
                onClick={logout}
                className="mt-4 text-center w-full text-sm font-light hover:bg-slate-800 rounded-md py-2 border h-[56px] border-white"
              >
                <p>Sign out of Netlify</p>
              </button>
            </PopoverContent>
          </Popover>
        </div>
      </header>
    </div>
  )
}

export default Navbar

