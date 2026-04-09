import type { Metadata } from "next";
import { Work_Sans, Afacad_Flux } from "next/font/google";
import "./globals.css";
import { validateEnv } from "@/lib/validation";
import { HeartbeatWrapper } from "@/components/dashboard/HeartbeatWrapper";
import { getSession } from "@/lib/auth";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});
const afacadFlux = Afacad_Flux({
  variable: "--font-afacad-flux",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "Beentra", template: "Beentra | %s" },
};

validateEnv();

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await getSession();
  const isLoggedIn = !!session?.userId;

  return (
    <html
      lang="en"
      className={`h-full ${workSans.variable} ${afacadFlux.variable}`}
    >
      <body
        className={`flex flex-col w-full min-h-screen items-center ${workSans.variable} ${afacadFlux.variable} antialiased`}
      >
        {isLoggedIn && <HeartbeatWrapper />}
        <div className="flex flex-1 flex-col w-full min-w-0">
          {children}
        </div>
      </body>
    </html>
  );
}
