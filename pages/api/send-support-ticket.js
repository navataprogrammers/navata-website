import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
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

  const { name, email, category, subject, message } = req.body;

  try {
    await transporter.sendMail({
      from: `"Support Inquiry" <${process.env.ADMIN_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Support Ticket: ${category} from website`,
      html: `
        <h3>Support Ticket Details:</h3>
        <ul>
          <li><strong>Customer Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Issue Category:</strong> ${category}</li>
          <li><strong>Subject:</strong> ${subject}</li>
          <li><strong>Description:</strong> ${message}</li>
        </ul>
        Regards,<br>
        <strong>Web Administrator,</strong><br>
        Navata Road Transport.<br>
        URL: https://www.navata.com/<br>
      `,
    });

    res.status(200).json({ message: 'Support inquiry sent successfully' });
  } catch (error) {
  console.error("API Route Error Details:", error);
  res.status(500).json({
    message: 'Failed to send contact form',
    error: error.message,
    stack: error.stack,
  });
}

}