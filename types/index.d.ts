import { Dispatch, ReactNode, SetStateAction } from "react";

export interface ContextType {
    account: AccountProps | null,
    setAccount: Dispatch<SetStateAction<AccountProps | null>> 
}

export interface AccountProps {
    _id: string
    uid: string
    name: string
    pin: string
}

export interface ChildProps {
    children: ReactNode
}

export interface AxiosResponse {
    success: boolean
    message?: string
}

export interface AccountResponse extends AxiosResponse {
<<<<<<< HEAD
    data: AccountProps[] | AccountProps
=======
    data: AccountProps[]
>>>>>>> 2a052f97ffa720dd248161555dc4409ce06c726f
}