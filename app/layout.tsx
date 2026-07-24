import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Manrope,
} from "next/font/google";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "01 Adana Ocakbaşı Marina",
  description:
    "Kuşadası Marina'da seçkin ocakbaşı lezzetleri, özel sunumlar ve benzersiz bir atmosfer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${manrope.variable} ${cormorant.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}