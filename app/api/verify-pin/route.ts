import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { pin } = await request.json()

    // Get the PIN from environment variable
    const correctPin = process.env.ADMIN_PIN

    if (!correctPin) {
      return NextResponse.json(
        {
          success: false,
          message: "Please set ADMIN_PIN environment variable in your project settings",
        },
        { status: 500 },
      )
    }

    const isValid = String(pin).trim() === String(correctPin).trim()

    return NextResponse.json({
      success: isValid,
      message: isValid ? "PIN verified successfully" : "Invalid PIN",
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}
