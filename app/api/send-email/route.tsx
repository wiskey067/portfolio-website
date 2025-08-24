import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    const nodemailer = require("nodemailer")

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your Gmail app password
      },
    })

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "ab9777816@gmail.com",
      subject: `Portfolio Contact: Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0ea5e9;">New Contact Form Submission</h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>
          <p style="color: #64748b; font-size: 14px;">
            This message was sent from your portfolio website contact form.
          </p>
        </div>
      `,
      replyTo: email,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true, message: "Email sent successfully!" })
  } catch (error) {
    console.error("Email sending failed:", error)
    return NextResponse.json({ success: false, message: "Failed to send email. Please try again." }, { status: 500 })
  }
}
