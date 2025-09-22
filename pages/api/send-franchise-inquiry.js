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

  const { name, mobile, email, location, franchiseName } = req.body;

  try {
    await transporter.sendMail({
      from: `"Franchise Inquiry" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Franchise Inquiry - ${franchiseName}`,
      html: `
        <h3>Franchise Inquiry Details:</h3>
        <ul>
          <li><strong>Franchise:</strong> ${franchiseName}</li>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Mobile:</strong> ${mobile}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Location:</strong> ${location}</li>
        </ul>
      `,
    });

    res.status(200).json({ message: 'Inquiry sent successfully' });
  } catch (error) {
    console.error('API Route Error:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
}