import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Setby — Precision Delivery",
  description:
    "Enhanced logistics, global freight, and precision delivery for ambitious teams.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
