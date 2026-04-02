import type { Metadata } from "next";
import { Work_Sans, Afacad_Flux } from "next/font/google";
import "../globals.css";

import { validateEnv } from "@/lib/validation";
import Header from "@/components/main/Header";
import Footer from "@/components/main/Footer";
import { Suspense } from "react";
import Loading from "../(public)/loading";

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
	  <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #fbffcd 0%, #ffead8 100%)" }}>
		<header className="h-16 flex items-center px-6 text-[#7A3D02]">
		  <Header />
		</header>
  
		<main className="flex flex-col flex-1 p-2 sm:p-6">
		  <Suspense fallback={<Loading />}>{children}</Suspense>
		</main>
  
		<footer className="h-14 shrink-0 flex items-center justify-center text-[#7A3D02]">
		  <Footer />
		</footer>
	  </div>
	);
}
