import { createAccountSchema } from '@/lib/validation'
import React, { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import PinInput from 'react-pin-input'
import axios from 'axios'
import { AccountProps, AccountResponse } from '@/types'
import { toast } from '@/components/ui/use-toast'

interface Props {
  uid: string,
  setOpen: Dispatch<SetStateAction<boolean>>
  setAccount: Dispatch<SetStateAction<AccountProps[]>>
}

const CreateAccountForm = ({uid, setOpen,setAccount}: Props) => {
  const form = useForm<z.infer<typeof createAccountSchema>>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      name: '',
      pin: '',
    },
  })

  const { isValid, isSubmitting } = form.formState

  async function onSubmit(values: z.infer<typeof createAccountSchema>) {
      try {
        const {data} = await axios.post<AccountResponse>('/api/account', {...values, uid})
        if(data.success){
          setOpen(false)
          form.reset()
          return toast({
            title: 'Account created successfully',
            description: 'Your account has been created successfully. You can now login.',
          })    
        }else{
          return toast({
            title: "Error",
            description: data.message,
            variant: "destructive",
          })
        }
      } catch (error) {
          return toast({
            title: "Error",
            description: "Something went wrong. Please try again later.",
            variant: "destructive",
          })
      }
  }

  return (
    <>
      <h1 className="text-white text-center font-bold text-3xl">
        Create your account
      </h1>

      <div className="w-full h-[2px] bg-slate-500/20 mb-4" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="off"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormDescription>
                  Your name is used to identify your account.
                </FormDescription>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PIN Code</FormLabel>
                <FormControl>
                  <PinInput
                    length={4}
                    initialValue={field.value}
                    secret
                    disabled={isSubmitting}
                    secretDelay={100}
                    onChange={(value) => field.onChange(value)}
                    type={'numeric'}
                    inputMode={'number'}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4, 1fr)',
                      gap: '10px',
                    }}
                    inputStyle={{
                      borderColor: 'RGBA(255, 255, 255, 0.16)',
                      height: '56px',
                      width: '100%',
                      fontSize: '40px',
                    }}
                    inputFocusStyle={{
                      borderColor: 'RGBA(255, 255, 255, 0.80)',
                    }}
                    autoSelect={true}
                  />
                </FormControl>
                <FormDescription>
                  Your pin is used to identify your account.
                </FormDescription>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          <Button 
           className="w-full bg-red-600 mt-4 hover:bg-red-700 flex justify-center items-center h-[56px] !text-white"
           disabled={isSubmitting}
           type='submit'
          >
            Create account
          </Button>
        </form>
      </Form>
    </>
  )
}

export default CreateAccountForm
