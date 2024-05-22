'use client'

import { LockKeyhole, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent } from '../ui/dialog'
import LoginAccountForm from '../form/login-account-form'
import CreateAccountForm from '../form/create-account-form'
import { AccountProps, AccountResponse } from '@/types'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { toast } from '@/components/ui/use-toast'

const ManageAccount = () => {
  const [isDelete, setIsDelete] = useState<boolean>(
    JSON.parse(localStorage.getItem('isDelete') || 'false')
  )
  const [open, setOpen] = useState(false)
  const [state, setState] = useState<'login' | 'create'>('create')
  const [account, setAccount] = useState<AccountProps[]>([])

  const { data: session }: any = useSession()

  useEffect(() => {
    const getAllAccounts = async () => {
      try {
        const { data } = await axios.get<AccountResponse>(
          `/api/account?uid=${session.user.uid}`
        )
        console.log(data)
        data.success && setAccount(data.data)
      } catch (error) {
        return toast({
          title: "Error",
          description: "Something went wrong. Please try again later.",
          variant: "destructive",
        })
      }
    }

    getAllAccounts()
  }, [session])

  const handleChange = () => {
    setIsDelete((prev) => !prev)
    localStorage.setItem('isDelete', JSON.stringify(!isDelete))
  }

  return (
    <div className="min-h-screen flex justify-center flex-col items-center relative">
      <div className="flex justify-center flex-col items-center">
        <h1 className="text-white font-bold text-5xl my-12">
          Who&apos;s Watching?
        </h1>

        <ul className="flex flex-wrap justify-center p-0 my-12">
          {account.map((account: AccountProps) => (
            <li
              key={account._id}
              onClick={() => {
                setOpen(true)
                setState('login')
              }}
              className="max-w-[200px] w-[155px] cursor-pointer flex flex-col items-center gap-3 min-w-[200px]"
            >
              <div className="relative">
                <div className="max-w-[200px] rounded min-w-[84px] max-h-[200px] min-h-[84px] object-cover w-[155px] h-[155px] relative">
                  <Image
                    src={
                      'https://occ-0-2611-3663.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABfNXUMVXGhnCZwPI1SghnGpmUgqS_J-owMff-jig42xPF7vozQS1ge5xTgPTzH7ttfNYQXnsYs4vrMBaadh4E6RTJMVepojWqOXx.png?r=1d4'
                    }
                    alt={'account'}
                    fill
                  />
                </div>
                {isDelete ? (
                  <div className="absolute transform bottom-0 z-10 contain-paint">
                    <Trash2 className="w-8 h-8 text-red-600" />
                  </div>
                ) : null}
              </div>
              <div className="flex items-center gap-1">
                <span className="font-mono font-bold text-xl">{account.name}</span>
                <LockKeyhole />
              </div>
            </li>
          ))}
          <li
            onClick={() => {
              setOpen(true)
              setState('create')
            }}
            className="borde bg-[#e5b109] font-bold text-xl border-black max-w-[200px] rounded min-w-[84px] max-h-[200px] min-h-[84px] w-[155px] h-[155px] cursor-pointer flex justify-center items-center"
          >
            Add account
          </li>
        </ul>
        <Button
          onClick={handleChange}
          className="bg-transparent rounded-none hover:bg-transparent !text-white border border-gray-100 cursor-pointer tracking-wide inline-flex text-sm px-[1.5rem] py-[0.5rem]"
        >
          Manage Profiles
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          {state === 'login' && <LoginAccountForm />}
          {state === 'create' && <CreateAccountForm uid={session?.user?.uid} setOpen={setOpen} setAccount={setAccount} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ManageAccount
