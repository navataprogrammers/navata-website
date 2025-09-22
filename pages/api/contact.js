import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
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
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: 'New Message from Contact Form',
      html: `
        <h3>Contact Form Submission:</h3>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Mobile:</strong> ${mobile}</li>
          <li><strong>Message:</strong> ${message}</li>
        </ul>
      `,
    });

    res.status(200).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('API Route Error:', error);
    res.status(500).json({ message: 'Failed to send contact form' });
  }
}