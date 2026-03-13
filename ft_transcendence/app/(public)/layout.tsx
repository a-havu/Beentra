import type { Metadata } from "next";
import { Work_Sans, Afacad_Flux } from "next/font/google";
import "../globals.css";
import Header from "../../components/main/Header";
import Footer from "../../components/main/Footer";
import { validateEnv } from "@/lib/validation";


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
      <header className="h-16 flex items-center px-6 text-[#7A3D02]">
        <Header />
      </header>

      <main className="flex flex-col h-dvh flex-1 p-6">
        {children}
      </main>

      <footer className="h-14 flex items-center justify-center text-[#7A3D02]">
        <Footer />
      </footer>
    </>
  );
}
