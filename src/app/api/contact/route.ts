import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = contactSchema.parse(body);
    
    // Create transporter (configure with your email service)
    // For production, use environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.SMTP_FROM || 'noreply@manavjamwal.dev',
      to: process.env.CONTACT_EMAIL || 'jamwalmanav69@gmail.com',
      replyTo: validatedData.email,
      subject: `Portfolio Contact: ${validatedData.name}`,
      text: `
Name: ${validatedData.name}
Email: ${validatedData.email}

Message:
${validatedData.message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(to bottom, #0f172a, #1e293b); color: #f8fafc; border-radius: 10px;">
          <h2 style="color: #3b82f6; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">New Portfolio Contact</h2>
          <div style="margin: 20px 0;">
            <p><strong style="color: #0ea5e9;">Name:</strong> ${validatedData.name}</p>
            <p><strong style="color: #0ea5e9;">Email:</strong> <a href="mailto:${validatedData.email}" style="color: #60a5fa;">${validatedData.email}</a></p>
          </div>
          <div style="background: #1e293b; padding: 15px; border-radius: 5px; border-left: 4px solid #3b82f6;">
            <p style="margin: 0;"><strong style="color: #0ea5e9;">Message:</strong></p>
            <p style="margin-top: 10px; line-height: 1.6;">${validatedData.message.replace(/\n/g, '<br>')}</p>
          </div>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #334155; text-align: center; color: #94a3b8; font-size: 12px;">
            <p>This message was sent from your portfolio contact form</p>
          </div>
        </div>
      `,
    };

    // Send email
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      await transporter.sendMail(mailOptions);
    } else {
      // Log to console in development if SMTP not configured
      console.log('📧 Contact Form Submission (SMTP not configured):');
      console.log('Name:', validatedData.name);
      console.log('Email:', validatedData.email);
      console.log('Message:', validatedData.message);
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message sent successfully! I\'ll get back to you soon.' 
      },
      { status: 200 }
    );

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation error',
          errors: error.issues 
        },
        { status: 400 }
      );
    }

    console.error('Contact form error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to send message. Please try again or email directly.' 
      },
      { status: 500 }
    );
  }
}
