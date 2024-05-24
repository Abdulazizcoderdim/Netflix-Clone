import Account from "@/database/account"
import { connectToDB } from "@/lib/mongoose"
import { compare } from "bcryptjs"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
    try {
        await connectToDB()
        const {pin,uid,accountId} = await req.json()
        
        const currentAccount = await Account.findOne({_id: accountId,uid})

        if (!currentAccount) {
           return NextResponse.json({ success: false, message: 'Account not found' }) 
        }

        const isMatch = await compare(pin, currentAccount.pin)

        if(isMatch){
            return NextResponse.json({ success: true, data: currentAccount })
        }else{
            return NextResponse.json({ success: false, message: 'Wrong PIN' })
        }

    } catch (error) {
        return NextResponse.json({ success: false, message: 'Something went wrong' })
    }
}