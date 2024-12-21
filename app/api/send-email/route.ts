import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const { name, email, message } = JSON.parse(body);

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const sanitize = (str: string) => str.replace(/[<>]/g, "");
    const safeName = sanitize(name);
    const safeEmail = sanitize(email);
    const safeMessage = sanitize(message);

    const data = await resend.emails.send({
      from: "Chanaka Prasanna <contact@chanakaprasanna.com>",
      to: ["chanaka7518@gmail.com"],
      replyTo: safeEmail,
      subject: `New Contact Form Message from ${safeName}`,
      html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 20px auto; background-color: #11142b; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 30px 20px; text-align: center;">
              <h2 style="color: #ffffff; margin: 0; padding-bottom: 20px; font-size: 24px; border-bottom: 1px solid #2a2d4a;">New Contact Form Submission</h2>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 10px 0;">
                    <p style="margin: 0; color: #9ca3af; font-size: 16px;">
                      <strong style="color: #ffffff;">Name:</strong>
                      <span style="margin-left: 8px;">${safeName}</span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0;">
                    <p style="margin: 0; color: #9ca3af; font-size: 16px;">
                      <strong style="color: #ffffff;">Email:</strong>
                      <span style="margin-left: 8px;">${safeEmail}</span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0;">
                    <p style="margin: 0; color: #ffffff; font-size: 16px;">
                      <strong>Message:</strong>
                    </p>
                    <div style="margin-top: 10px; padding: 15px; background-color: #1d2147; border-radius: 6px; color: #9ca3af;">
                      ${safeMessage.split("\n").join("<br>")}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px; text-align: center;">
              <div style="background: linear-gradient(to right, #4F46E5, #7C3AED); padding: 2px; border-radius: 6px; display: inline-block;">
                <div style="background: #11142b; padding: 10px 20px; border-radius: 5px;">
                  <p style="margin: 0; color: #ffffff; font-size: 14px;">Sent from your website contact form</p>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </body>
    </html>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
