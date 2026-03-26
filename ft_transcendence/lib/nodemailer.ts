import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function apikeyEmail(data: {
  email: string;
  apikey: string;
}): Promise<boolean> {
  try {
    const info = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: data.email,
      subject: "Beentra public API key",
      html: `<p>Here is your public API key:</p> <p>${data.apikey}</p>`,
    });
    console.log("email sent correctly", info.messageId);
    return true;
  } catch (e) {
    console.log("email failed to send", e);
    return false;
  }
}
