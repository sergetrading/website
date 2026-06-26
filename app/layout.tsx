import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Montserrat,
  Fraunces,
  Herr_Von_Muellerhoff,
} from "next/font/google";
import "./globals.css";
import { Atmosphere } from "@/components/ui/atmosphere";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// High-contrast display serif — used only for headlines, against the geometric
// Montserrat for eyebrows/labels. The serif/sans contrast is the couture code.
// `opsz` lets large headlines pick up the highest-contrast optical cut.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

// Hand-signature script — modelled on a genuine fountain-pen signature, with
// the irregular baseline and flourish a real hand leaves. Used in one place:
// the founder's signature in the About section, set in brass like wet ink.
const signature = Herr_Von_Muellerhoff({
  variable: "--font-signature",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Observation Log: Anomaly 7",
  description: "Matter in a state of constant, beautiful flux.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${fraunces.variable} ${signature.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Atmosphere />
      </body>
    </html>
  );
}
