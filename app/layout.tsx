import type { Metadata, Viewport } from "next";
import { Lora, Dancing_Script } from "next/font/google";

import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
});

export const metadata: Metadata = {
  title: "Our Memories Together",
  description:
    "A romantic journey through our most cherished moments together",
};

export const viewport: Viewport = {
  themeColor: "#e8b4b8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lora.variable} ${dancingScript.variable} font-serif antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
