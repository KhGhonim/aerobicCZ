import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactFormData {
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
  description: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { firstName, lastName, email, phone, description } = body;

    // Basic validation
    if (!firstName || !description) {
      return NextResponse.json(
        { error: 'Jméno a popis jsou povinné položky.' },
        { status: 400 }
      );
    }

    // Create transporter using SMTP configuration
    const transporter = nodemailer.createTransport({
      host: 'mail.noubodiez.ae',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'info@noubodiez.ae',
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: 'info@noubodiez.ae',
      to: 'ackyjov@gmail.com', // Main recipient
      cc: email ? email : undefined, // Send copy to user if email provided
      subject: `Nová kontaktní zpráva od ${firstName}${lastName ? ` ${lastName}` : ''}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #B12468; border-bottom: 2px solid #B12468; padding-bottom: 10px;">
            Nová kontaktní zpráva
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Informace o odesílateli:</h3>
            <p><strong>Jméno:</strong> ${firstName}${lastName ? ` ${lastName}` : ''}</p>
            ${email ? `<p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>` : ''}
            ${phone ? `<p><strong>Telefon:</strong> <a href="tel:${phone}">${phone}</a></p>` : ''}
          </div>
          
          <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Zpráva:</h3>
            <p style="line-height: 1.6; color: #555;">${description.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
            <p>Tato zpráva byla odeslána z kontaktního formuláře na webu Aerobic Cup Kyjov.</p>
            <p>Čas odeslání: ${new Date().toLocaleString('cs-CZ')}</p>
          </div>
        </div>
      `,
      text: `
        Nová kontaktní zpráva
        
        Informace o odesílateli:
        Jméno: ${firstName}${lastName ? ` ${lastName}` : ''}
        ${email ? `Email: ${email}` : ''}
        ${phone ? `Telefon: ${phone}` : ''}
        
        Zpráva:
        ${description}
        
        ---
        Tato zpráva byla odeslána z kontaktního formuláře na webu Aerobic Cup Kyjov.
        Čas odeslání: ${new Date().toLocaleString('cs-CZ')}
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Zpráva byla úspěšně odeslána.' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);

    return NextResponse.json(
      { error: 'Nepodařilo se odeslat zprávu. Zkuste to prosím později.' },
      { status: 500 }
    );
  }
}

