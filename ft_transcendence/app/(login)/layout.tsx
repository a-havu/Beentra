import type { Metadata } from "next";
import { Work_Sans, Afacad_Flux } from "next/font/google";
import "@/app/globals.css";
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
    default: "Beentra",
    template: "Beentra | %s",
  },
};

validateEnv();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
        <main className="flex flex-col flex-1 p-6 ">{children}</main>
  );
}
