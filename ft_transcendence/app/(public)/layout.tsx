import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Header from "../../components/main/Header";
import Footer from "../../components/main/Footer";
import { validateEnv } from "@/lib/validation";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
    <html lang="en">
      <body
        className={`flex flex-col min-h-screen ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Header */}
        <header className="w-full h-16 flex items-center px-6 text-[#7A3D02]">
          <Header />
        </header>

        {/* Main fills remaining height */}
        <main className="flex-1 p-6">{children}</main>

        {/* Footer */}
        <footer className="w-full h-14 flex items-center justify-center text-[#7A3D02]">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
