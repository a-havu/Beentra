import type { Metadata } from "next";
import { Work_Sans, Afacad_Flux } from "next/font/google";
import "../globals.css";

import { validateEnv } from "@/lib/validation";
import Header from "@/components/main/Header";
import Footer from "@/components/main/Footer";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const afacadFlux = Afacad_Flux({
  variable: "--font-afacad-flux",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Beentra", // this will show on the tab when no title is defined
    template: "Beentra | %s", // here the %s becomes the page's title
  },
};

validateEnv();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <>
        {/* Header */}
        <header className="w-full h-16 bg-blue-800 flex items-center px-6 text-white">
          <Header />
        </header>

        {/* Main fills remaining height */}
        <main className="flex-1 bg-gray-100 p-6 overflow-auto min-w-0">{children}</main>

        {/* Footer */}
        <footer className="w-full h-14 bg-gray-900 flex items-center justify-center text-white">
          <Footer />
        </footer>
</>
  );
}
