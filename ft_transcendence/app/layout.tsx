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
<<<<<<< HEAD
    <html lang="en" className={`h-full ${workSans.variable} ${afacadFlux.variable}`}>
      <body className={`flex flex-col h-full items-center justify-center ${workSans.variable} ${afacadFlux.variable} antialiased`}>
        <div className="flex flex-col h-full w-full max-w-7xl min-w-0 overflow-hidden">
=======
    <html lang="en" className={`${workSans.variable} ${afacadFlux.variable}`}>
      <body className={`flex flex-col min-h-screen items-center ${workSans.variable} ${afacadFlux.variable} antialiased`}>
          <div className="flex flex-col h-full w-full max-w-7xl min-w-0 overflow-hidden">
>>>>>>> staged
          {children}
        </div>
      </body>
    </html>
  );
}
