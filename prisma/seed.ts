import "dotenv/config";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
const terms: string = `
<p><strong>Effective Date: March 14, 2025</strong></p>
<br/>
<p>Please read these Terms of Service carefully before using Beentra. By accessing or using the platform, you agree to be bound by these terms.</p>

<br/>
<p><strong>1. About Beentra</strong></p>
<p>Beentra (accessible at beentra.fi) is a platform developed by students of Hive Helsinki, a member school of the 42 Network. The platform allows Hive students to showcase their projects, post and discover events, and connect with the broader Hive community.</p>
<br/>
<p>For questions or concerns, contact us at: <strong>beentra@beentra.fi</strong></p>

<br/>
<p><strong>2. Eligibility</strong></p>
<p>Beentra is intended exclusively for students of Hive Helsinki. By registering, you confirm that:</p>
<p>- You are a current or past student of Hive Helsinki.</p>
<p>- You are at least 18 years old, or have the consent of a legal guardian.</p>
<p>- You will use the platform in accordance with these Terms.</p>

<br/>
<p><strong>3. User Accounts</strong></p>
<p>You may register for an account using:</p>
<p>- Email address and password</p>
<p>- GitHub OAuth login</p>
<br/>
<p>You may also enable <strong>two-factor authentication (2FA)</strong> for additional account security, which we strongly recommend.</p>
<br/>
<p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>

<br/>
<p><strong>4. User Content</strong></p>
<p>You may upload content to Beentra, including:</p>
<p>- Project descriptions and related images</p>
<p>- Event listings and thumbnail images</p>
<br/>
<p>By uploading content, you confirm that:</p>
<p>- You own the content or have the right to share it.</p>
<p>- The content does not violate any applicable laws or third-party rights.</p>
<p>- The content is not offensive, misleading, or harmful.</p>
<br/>
<p>We reserve the right to remove any content that violates these Terms without prior notice.</p>

<br/>
<p><strong>5. Prohibited Conduct</strong></p>
<p>You agree not to:</p>
<p>- Use Beentra for any illegal or unauthorised purpose.</p>
<p>- Upload malicious files, spam, or content that infringes intellectual property rights.</p>
<p>- Attempt to gain unauthorised access to any part of the platform.</p>
<p>- Impersonate another person or misrepresent your affiliation.</p>

<br/>
<p><strong>6. Intellectual Property</strong></p>
<p>All original content and code on Beentra (excluding user-uploaded content) is the property of the Beentra team. User-uploaded content remains the property of the respective users.</p>

<br/>
<p><strong>7. Third-Party Services</strong></p>
<p>Beentra integrates with the following third-party services:</p>
<p>- <strong>GitHub</strong> — for OAuth authentication</p>
<p>- <strong>Nodemailer / Gmail</strong> — for transactional email delivery</p>
<p>- <strong>Neon</strong> — for database hosting (PostgreSQL)</p>
<p>- <strong>ImageKit</strong> — for image storage and delivery</p>
<br/>
<p>Your use of these services is also subject to their respective terms and privacy policies.</p>

<br/>
<p><strong>8. Disclaimers</strong></p>
<p>Beentra is provided <strong>'as is'</strong> without warranties of any kind. As a student project, we do not guarantee uninterrupted availability or error-free operation. We are not liable for any loss or damage arising from your use of the platform.</p>

<br/>
<p><strong>9. Termination</strong></p>
<p>We reserve the right to suspend or terminate your account at any time if you violate these Terms or engage in behaviour harmful to other users or the platform.</p>

<br/>
<p><strong>10. Changes to These Terms</strong></p>
<p>We may update these Terms from time to time. Continued use of Beentra after changes are posted constitutes your acceptance of the revised Terms.</p>

<br/>
<p><strong>11. Contact</strong></p>
<p>If you have any questions about these Terms, please contact us at: <strong>beentra@beentra.fi</strong></p>
`;

const privacy: string = `
<p><strong>Effective Date: March 14, 2025</strong></p>
<br/>
<p>This Privacy Policy explains how Beentra collects, uses, and protects your personal data. We are committed to complying with the EU General Data Protection Regulation (GDPR) and applicable Finnish data protection law.</p>

<br/>
<p><strong>1. Data Controller</strong></p>
<p>Beentra is operated by students of Hive Helsinki (42 Network), Finland.</p>
<br/>
<p>Contact: <strong>beentra@beentra.fi</strong></p>

<br/>
<p><strong>2. What Data We Collect</strong></p>
<p>We collect only the personal data you provide directly to us when creating an account or using the platform:</p>
<p>- Name and/or username</p>
<p>- Email address</p>
<p>- Password (stored in <strong>hashed form</strong> — never in plain text)</p>
<p>- GitHub profile information (if you sign in via GitHub OAuth)</p>
<p>- Profile or project images you upload</p>
<br/>
<p>We do not collect any additional personal data beyond what is listed above. We do not use tracking pixels, advertising networks, or behavioural analytics.</p>

<br/>
<p><strong>3. How We Use Your Data</strong></p>
<p>Your personal data is used solely for the following purposes:</p>
<p>- Creating and managing your Beentra account</p>
<p>- Enabling authentication (password login, GitHub OAuth, and 2FA)</p>
<p>- Sending transactional emails (e.g. account verification, password reset) via Nodemailer/Gmail</p>
<p>- Displaying your projects and events within the platform</p>

<br/>
<p><strong>4. Legal Basis for Processing (GDPR)</strong></p>
<p>We process your data on the following legal bases:</p>
<p>- <strong>Contractual necessity</strong> — to provide you with access to the platform and its features.</p>
<p>- <strong>Legitimate interests</strong> — to maintain platform security and prevent abuse.</p>
<p>- <strong>Consent</strong> — where you have explicitly provided it (e.g. optional features).</p>

<br/>
<p><strong>5. Cookies</strong></p>
<p>Beentra uses HTTP cookies strictly for the purpose of maintaining your login session. We do not use cookies for advertising, tracking, or analytics.</p>
<br/>
<p>Session cookies are deleted when you log out or close your browser. You may also clear cookies through your browser settings at any time.</p>

<br/>
<p><strong>6. Data Storage & Third-Party Processors</strong></p>
<p>Your data is processed and stored using the following services:</p>
<p>- <strong>Neon (neon.tech)</strong> — PostgreSQL database hosting. Your account data is stored here.</p>
<p>- <strong>ImageKit (imagekit.io)</strong> — Images you upload are stored and served via ImageKit.</p>
<p>- <strong>GitHub (github.com)</strong> — Used for OAuth login. GitHub may share your public profile data with us.</p>
<p>- <strong>Google / Gmail (via Nodemailer)</strong> — Used to send transactional emails.</p>
<br/>
<p>All third-party processors are selected for their compliance with applicable data protection standards. Data may be stored outside Finland but within services that meet GDPR adequacy requirements.</p>

<br/>
<p><strong>7. Data Retention</strong></p>
<p>We retain your personal data for as long as your account is active. If you request account deletion, your personal data will be removed from our systems within a reasonable timeframe, except where retention is required by law.</p>

<br/>
<p><strong>8. Your Rights (GDPR)</strong></p>
<p>As a data subject under the GDPR, you have the following rights:</p>
<p>- <strong>Right of access</strong> — you can request a copy of the personal data we hold about you.</p>
<p>- <strong>Right to rectification</strong> — you can request correction of inaccurate data.</p>
<p>- <strong>Right to erasure</strong> — you can request deletion of your personal data.</p>
<p>- <strong>Right to restriction</strong> — you can request that we limit how we process your data.</p>
<p>- <strong>Right to data portability</strong> — you can request your data in a machine-readable format.</p>
<p>- <strong>Right to object</strong> — you can object to certain types of processing.</p>
<br/>
<p>To exercise any of these rights, please contact us at: <strong>beentra@beentra.fi</strong></p>
<br/>
<p>You also have the right to lodge a complaint with the Finnish Data Protection Ombudsman (<strong>tietosuoja.fi</strong>) if you believe your data has been processed unlawfully.</p>

<br/>
<p><strong>9. Data Security</strong></p>
<p>We take appropriate technical and organisational measures to protect your personal data, including:</p>
<p>- Passwords are stored using <strong>cryptographic hashing</strong>.</p>
<p>- <strong>HTTPS encryption</strong> for all data transmitted between your browser and our servers.</p>
<p>- <strong>Two-factor authentication (2FA)</strong> available for your account.</p>
<p>- Access to personal data is restricted to authorised team members only.</p>

<br/>
<p><strong>10. Children's Data</strong></p>
<p>Beentra is not intended for individuals under the age of 18. We do not knowingly collect data from minors. If you believe a minor has registered, please contact us immediately at <strong>beentra@beentra.fi</strong>.</p>

<br/>
<p><strong>11. Changes to This Privacy Policy</strong></p>
<p>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. The effective date at the top of this document will be updated accordingly. We encourage you to review this policy periodically.</p>

<br/>
<p><strong>12. Contact</strong></p>
<p>For any questions, requests, or concerns regarding your privacy or this policy, please reach out to us at:</p>
<br/>
<p><strong>Beentra Team — beentra@beentra.fi</strong></p>
<p>Hive Helsinki, 42 Network, Finland</p>
`;

async function addingPages() {
  const admin = await prisma.user.findUniqueOrThrow({
    where: { email: "admin@beentra.fi" },
  });

  const pages = [
    { title: "Terms of Service", slug: "terms", text: terms },
    { title: "Privacy Policy", slug: "privacy", text: privacy },
  ];

  for (const page of pages) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: { title: page.title, text: page.text },
      create: {
        ...page,
        author: { connect: { id: admin.id } },
      },
    });
  }
  console.log("✅ Pages are seeded");
}

async function addingAdmin() {
  const hashedPassword = await bcrypt.hash("ABCD@123456", 10);

  await prisma.user.upsert({
    where: { email: "admin@beentra.fi" },
    update: {},
    create: {
      email: "admin@beentra.fi",
      username: "admin",
      fullName: "Admin",
      passwordHash: hashedPassword,
      role: "admin",
    },
  });

  console.log("✅ Admin user seeded");
}

async function main() {
  await addingAdmin();
  await addingPages();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
