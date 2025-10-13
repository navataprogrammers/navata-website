import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.ADMIN_USER,
    pass: process.env.ADMIN_PASS,
  },
});


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { name, email, mobile, message } = req.body;

  try {
    await transporter.sendMail({
      from: `"Contact Form" <${process.env.ADMIN_USER}>`,
      to: process.env.EMAIL_USER,
      subject: 'New Contact enqiry from - Navata website',
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

    res.status(200).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('API Route Error:', error);
    res.status(500).json({ message: 'Failed to send contact form' });
  }
}