import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Caveat,
  Mansalva,
  Cormorant_Garamond,
} from "next/font/google";
import localFont from "next/font/local";
import { MarshmallowCursor } from "@/components/MarshmallowCursor";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const mansalva = Mansalva({
  variable: "--font-mansalva",
  weight: "400",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const geistPixel = localFont({
  src: "./fonts/GeistPixel-Regular-VariableFont_ELSH.ttf",
  variable: "--font-pixel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Marshmallow",
  description:
    "Simplify how you run your repos, starting with your notifications. Marshmallow — GitHub made beautiful.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} ${mansalva.variable} ${cormorant.variable} ${geistPixel.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {children}
        <MarshmallowCursor />
      </body>
    </html>
  );
}
