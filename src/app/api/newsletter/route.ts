import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface NewsletterData {
  email: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: NewsletterData = await request.json();
    const { email } = body;

    // Basic validation
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Prosím zadejte platnou emailovou adresu.' },
        { status: 400 }
      );
    }

    // Create transporter using SMTP configuration
    const transporter = nodemailer.createTransport({
      host: 'mail.noubodiez.ae',
      port: 465,
      secure: true,
      auth: {
        user: 'info@noubodiez.ae',
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email content for admin notification
    const adminMailOptions = {
      from: 'info@noubodiez.ae',
      to: 'ackyjov@gmail.com',
      subject: 'Nový odběratel newsletteru',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #B12468; border-bottom: 2px solid #B12468; padding-bottom: 10px;">
            Nový odběratel newsletteru
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Čas přihlášení:</strong> ${new Date().toLocaleString('cs-CZ')}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
            <p>Tento email byl odeslán z formuláře newsletteru na webu Aerobic Cup Kyjov.</p>
          </div>
        </div>
      `,
      text: `
        Nový odběratel newsletteru
        
        Email: ${email}
        Čas přihlášení: ${new Date().toLocaleString('cs-CZ')}
        
        ---
        Tento email byl odeslán z formuláře newsletteru na webu Aerobic Cup Kyjov.
      `
    };

    // Email content for user confirmation
    const userMailOptions = {
      from: 'info@noubodiez.ae',
      to: email,
      subject: 'Potvrzení přihlášení k newsletteru - Aerobic Cup Kyjov',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #B12468; border-bottom: 2px solid #B12468; padding-bottom: 10px;">
            Děkujeme za přihlášení k newsletteru!
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p>Vážený odběrateli,</p>
            <p>děkujeme za přihlášení k našemu newsletteru. Budeme vás informovat o:</p>
            <ul style="margin: 15px 0; padding-left: 20px;">
              <li>Novinkách a událostech</li>
              <li>Speciálních nabídkách a slevách</li>
              <li>Tipů pro cvičení a zdravý životní styl</li>
              <li>Aktualizacích našich služeb</li>
            </ul>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              Pokud se chcete odhlásit z newsletteru, můžete tak učinit kdykoliv kliknutím na odkaz v patičce našich emailů.
            </p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
            <p>Tento email byl odeslán z webu Aerobic Cup Kyjov.</p>
            <p>Sportcentrum Želva, Hodonínská 1680, Dubňany 696 03</p>
          </div>
        </div>
      `,
      text: `
        Děkujeme za přihlášení k newsletteru!
        
        Vážený odběrateli,
        děkujeme za přihlášení k našemu newsletteru. Budeme vás informovat o novinkách, událostech, speciálních nabídkách a tipů pro cvičení.
        
        Pokud se chcete odhlásit z newsletteru, můžete tak učinit kdykoliv kliknutím na odkaz v patičce našich emailů.
        
        ---
        Aerobic Cup Kyjov
        Sportcentrum Želva, Hodonínská 1680, Dubňany 696 03
      `
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ]);

    return NextResponse.json(
      { message: 'Úspěšně jste se přihlásili k newsletteru!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    return NextResponse.json(
      { error: 'Nepodařilo se přihlásit k newsletteru. Zkuste to prosím později.' },
      { status: 500 }
    );
  }
}
