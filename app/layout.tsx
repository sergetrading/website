import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat, Fraunces } from "next/font/google";
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
      className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Atmosphere />
      </body>
    </html>
  );
}
