import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { name, email, mobile, message } = req.body;

  // Log environment variables for debugging
  console.log('Environment check:', {
    hasHost: !!process.env.EMAIL_HOST,
    hasPort: !!process.env.EMAIL_PORT,
    hasUser: !!process.env.ADMIN_USER,
    hasPass: !!process.env.ADMIN_PASS,
    hasEmailUser: !!process.env.EMAIL_USER,
    port: process.env.EMAIL_PORT,
    host: process.env.EMAIL_HOST,
  });

  // Validate environment variables
  if (!process.env.EMAIL_HOST || !process.env.ADMIN_USER || !process.env.ADMIN_PASS || !process.env.EMAIL_USER) {
    console.error('Missing required environment variables');
    return res.status(500).json({ 
      message: 'Email configuration error',
      error: 'Missing credentials',
      details: {
        hasHost: !!process.env.EMAIL_HOST,
        hasUser: !!process.env.ADMIN_USER,
        hasPass: !!process.env.ADMIN_PASS,
        hasEmailUser: !!process.env.EMAIL_USER,
      }
    });
  }

  try {
    // Parse port and determine secure setting
    const port = parseInt(process.env.EMAIL_PORT || '587', 10);
    const isSecure = port === 465;

    console.log('Creating transporter with:', {
      host: process.env.EMAIL_HOST,
      port: port,
      secure: isSecure,
      user: process.env.ADMIN_USER,
    });

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: port,
      secure: isSecure, // true for 465, false for 587
      auth: {
        user: process.env.ADMIN_USER,
        pass: process.env.ADMIN_PASS,
      },
      // Add these for better compatibility
      tls: {
        rejectUnauthorized: false, // Use true in production with valid certs
      },
    });

    // Verify connection
    await transporter.verify();
    console.log('Transporter verified successfully');

    // Send email
    const info = await transporter.sendMail({
      from: `"Contact Form" <${process.env.ADMIN_USER}>`,
      to: process.env.EMAIL_USER,
      subject: 'New Contact enquiry from - Navata website',
      html: `
        <h3>Hello, enquiry details are as follows:</h3>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Mobile:</strong> ${mobile}</li>
          <li><strong>Message:</strong> ${message}</li>
        </ul>
        Regards,<br>
        <strong>Web Administrator,</strong><br>
        Navata Road Transport.<br>
        URL: https://www.navata.com/<br>
      `,
    });

    console.log('Email sent successfully:', info.messageId);
    res.status(200).json({ 
      message: 'Contact form submitted successfully',
      messageId: info.messageId 
    });

  } catch (error) {
    console.error('API Route Error:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      command: error.command,
    });
    
    res.status(500).json({ 
      message: 'Failed to send contact form',
      error: error.message,
      code: error.code,
    });
  }
}