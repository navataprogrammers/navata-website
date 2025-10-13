import nodemailer from 'nodemailer';
import formidable from 'formidable';
import fs from 'fs';

const transporter = nodemailer.createTransport({  
  service: "gmail",
  auth: {
    user: process.env.ADMIN_USER, // from .env
    pass: process.env.ADMIN_PASS  // app password from .env
  }});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end();
  }

  const form = formidable({});

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parsing error:', err);
      return res.status(500).json({ message: 'Error parsing form data' });
    }

    const { firstName, lastName, email, phone, experience, jobSource, jobId, jobName } = fields;
    const resumeFile = files.resume;

    try {
      await transporter.sendMail({
        from: `"Job Application" <${process.env.ADMIN_USER}>`,
        to: process.env.EMAIL_USER,
        subject: `New Job Application - ${jobName} (ID: ${jobId}) From website`,
        html: `
        <p style="text-align:left;">Hello,<br><br>
        Job Details are as follows:<br><br>
        Name: ${firstName} ${lastName}
        Email: ${email}
        Phone: ${phone}
        Experience: ${experience}
        Job Source: ${jobSource}
        Job ID: ${jobId}
        Job Name: ${jobName}
        Regards,<br>
        <strong>Web Administrator</strong><br>
        Navata Road Transport.<br>
        URL: <a href="https://www.navata.com/">https://www.navata.com/</a>
        </p>
        `,        
        attachments: resumeFile
          ? [{
              filename: resumeFile.originalFilename,
              content: fs.createReadStream(resumeFile.filepath),
            }]
          : [],
      });

      res.status(200).json({ message: 'Application sent successfully' });
    } catch (error) {
      console.error('Email sending error:', error);
      res.status(500).json({ message: 'Failed to send application' });
    }
  });
}