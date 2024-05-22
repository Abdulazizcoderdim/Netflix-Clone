import Account from "@/database/account";
import { connectToDB } from "@/lib/mongoose"
import { NextResponse } from "next/server";
import {hash} from "bcryptjs";

export const dynamic: "force-dynamic" = 'force-dynamic'

export async function POST(req: Request) {
    try {
        await connectToDB();
        const {name, pin, uid} = await req.json();
        
        const isExist = await Account.findOne({name});
        const allAccounts = await Account.find({uid});

        if(isExist) {
            return NextResponse.json({success: false, message: "Account already exist"})
        }
        
        if(allAccounts && allAccounts.length === 4) {
            return NextResponse.json({success: false, message: "Account limit reached"})
        }

        const hashedPin = await hash(pin, 10);

        const account = await Account.create({name, pin: hashedPin, uid});

        return NextResponse.json({account})
    } catch (error) {
        return NextResponse.json({success: false, message: "Something went wrong"})         
    }
}
// 2:17:00