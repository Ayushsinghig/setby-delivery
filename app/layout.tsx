import type { Metadata } from "next";
import { Chivo_Mono, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const chivoMono = Chivo_Mono({
  subsets: ["latin"],
  variable: "--font-chivo-mono",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Setby — Precision Delivery",
  description:
    "Enhanced logistics, global freight, and precision delivery for ambitious teams.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      className="scroll-pt-22 scroll-smooth motion-reduce:scroll-auto"
      lang="en"
    >
      <body
        className={`${manrope.variable} ${chivoMono.variable} overflow-x-hidden bg-[#f8f7f3] font-(--font-manrope) text-[#0c0c0c] selection:bg-[#ff5c32] selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
