import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import connectDB from '@/lib/mongodb';
import Submission from '@/models/Submission';

export async function GET() {
  try {
    await connectDB();
    const submissions = await Submission.find({}).sort({ createdAt: -1 });
    return NextResponse.json(submissions);
  } catch (error) {
    console.error('Submissions GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Save to MongoDB
    await connectDB();
    const newSubmission = new Submission({
      name,
      email,
      subject: subject || 'No Subject',
      message,
    });
    const savedSubmission = await newSubmission.save();

    // 2. Send email notification (Premium Template)
    if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });

      const mailOptions = {
        from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
        to: 'nagpala362@gmail.com',
        replyTo: email,
        subject: `📬 New Message from ${name} — Portfolio`,
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: 'Segoe UI', Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f5; padding: 40px 16px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 32px rgba(0,0,0,0.12);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%); padding: 40px 40px 32px;">
                            <p style="margin: 0 0 6px; color: #befd4a; font-size: 12px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;">Portfolio Inquiry</p>
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">New Message Received</h1>
                        </td>
                    </tr>
                    <!-- Body -->
                    <tr>
                        <td style="padding: 36px 40px;">
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                                <tr>
                                    <td style="padding: 16px 20px; background-color: #fafafa; border-radius: 12px; border-left: 4px solid #befd4a;">
                                        <p style="margin: 0 0 4px; font-size: 11px; font-weight: 700; color: #888; text-transform: uppercase; letter-spacing: 2px;">From</p>
                                        <p style="margin: 0; font-size: 18px; font-weight: 700; color: #0a0a0a;">${name}</p>
                                        <p style="margin: 4px 0 0; font-size: 14px; color: #6366f1;">${email}</p>
                                    </td>
                                </tr>
                            </table>
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                                <tr>
                                    <td style="padding: 16px 20px; background-color: #fafafa; border-radius: 12px; border-left: 4px solid #000;">
                                        <p style="margin: 0 0 4px; font-size: 11px; font-weight: 700; color: #888; text-transform: uppercase; letter-spacing: 2px;">Subject</p>
                                        <p style="margin: 0; font-size: 16px; font-weight: 600; color: #0a0a0a;">${subject || 'No Subject'}</p>
                                    </td>
                                </tr>
                            </table>
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding: 24px; background-color: #f9fafb; border-radius: 12px; border: 1px solid #f3f4f6;">
                                        <p style="margin: 0 0 12px; font-size: 11px; font-weight: 700; color: #888; text-transform: uppercase; letter-spacing: 2px;">Message</p>
                                        <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #374151; white-space: pre-wrap;">${message}</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9fafb; padding: 24px 40px; text-align: center; border-top: 1px solid #f3f4f6;">
                            <p style="margin: 0; font-size: 12px; color: #9ca3af;">Sent via your portfolio contact form.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
        `,
      };

      // Serverless environments require us to await background tasks
      try {
        await transporter.sendMail(mailOptions);
        console.log('Notification email sent successfully');
      } catch (err) {
        console.error('Email error:', err);
      }
    }

    return NextResponse.json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact POST error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    await connectDB();
    await Submission.findByIdAndDelete(id);
    
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Submission DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
