import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
})

export async function apikeyEmail(data: { email: string, apikey: string }): Promise<void> {
  const info = await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: data.email,
    subject: 'Beentra public API key',
    html: `<p>Here is your public API key:</p> <p>${data.apikey}</p>`
  })
  if (!info) {
    throw new Error('send email failed')
  }
}
