import Account from '@/database/account'
import { connectToDB } from '@/lib/mongoose'
import { NextResponse } from 'next/server'
import { hash } from 'bcryptjs'

export const dynamic: 'force-dynamic' = 'force-dynamic'

export async function POST(req: Request) {
  try {
    await connectToDB()
    const { name, pin, uid } = await req.json()

    const isExist = await Account.findOne({ name })
    const allAccounts = await Account.find({ uid })

    if (isExist) {
      return NextResponse.json({
        success: false,
        message: 'Account already exist',
      })
    }

    if (allAccounts && allAccounts.length === 4) {
      return NextResponse.json({
        success: false,
        message: 'Account limit reached',
      })
    }

    const hashedPin = await hash(pin, 10)

    const account = await Account.create({ name, pin: hashedPin, uid })

    return NextResponse.json({ success: true, data: account })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Something went wrong',
    })
  }
}

// Get all accounts
export async function GET(req: Request) {
  try {
    await connectToDB()

    const { searchParams } = new URL(req.url)
    const uid = searchParams.get('uid')

    if (!uid)
      return NextResponse.json({
        success: false,
        message: "UID so'rovini olishda hatolik ketti!!",
      })

    const accounts = await Account.find({ uid })

    return NextResponse.json({ success: true, data: accounts })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "GET so'rovini olishda hatolik ketti!!",
    })
  }
}

// Delete account

export async function DELETE(req: Response) {
  try {
    await connectToDB()

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id)
      return NextResponse.json({
        success: false,
        message: "UID so'rovini olishda hatolik ketti!!",
      })

      await Account.findByIdAndDelete(id);

      return NextResponse.json({ success: true, message: "Account deleted succesfully" })
  } catch (error) {}
  return NextResponse.json({ success: false, message: 'Something went wrong' })
}