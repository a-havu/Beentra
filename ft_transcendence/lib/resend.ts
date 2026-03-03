import { Resend } from 'resend';

const resend = new Resend('re_JQVh5tLz_2SsVGMR6qHTeDqMt37xcg2yT');

resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'mohammad.khlouf@gmail.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
});
