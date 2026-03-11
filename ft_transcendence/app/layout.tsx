import type { Metadata } from "next";
import { Work_Sans, Afacad_Flux } from "next/font/google";
import "./globals.css";
import { validateEnv } from "@/lib/validation";

const workSans = Work_Sans({ variable: "--font-work-sans", subsets: ["latin"] });
const afacadFlux = Afacad_Flux({ variable: "--font-afacad-flux", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Beentra", template: "Beentra | %s" },
};

validateEnv();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${workSans.variable} ${afacadFlux.variable}`}>
      <body className={`flex flex-col min-h-screen items-center justify-center ${workSans.variable} ${afacadFlux.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}