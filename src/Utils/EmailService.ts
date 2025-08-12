import nodemailer from 'nodemailer';

interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

const emailConfig: EmailConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
};

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport(emailConfig);
};

// Send email from admin to user
export const sendContactEmail = async (data: EmailData): Promise<boolean> => {
  try {
    const transporter = createTransporter();
    
    // Email from admin to user
    const mailOptions = {
      from: `${emailConfig.auth.user}`,
      to: data.email,
      subject: data.subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Message from ${process.env.SITE_NAME || 'Your Website'}</h2>
          <p>Dear ${data.name},</p>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <div style="background-color: white; padding: 15px; border-radius: 5px;">
              ${data.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p>Best regards,<br>${process.env.SITE_NAME || 'Your Website'} Team</p>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

// Test email configuration
export const testEmailConfig = async (): Promise<boolean> => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    return true;
  } catch (error) {
    console.error('Email configuration test failed:', error);
    return false;
  }
}; 