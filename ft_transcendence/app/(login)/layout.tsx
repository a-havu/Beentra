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
        <main className="flex flex-col  flex-1 p-6 ">{children}</main>
  );
}
