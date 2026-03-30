import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MD2PDF Pro - Convertisseur Markdown vers PDF",
  description: "Application web moderne pour convertir du Markdown en PDF de haute qualité. Éditeur en temps réel avec prévisualisation instantanée.",
  keywords: ["Markdown", "PDF", "Convertisseur", "Éditeur", "Next.js", "React"],
  authors: [{ name: "MD2PDF Pro Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "MD2PDF Pro",
    description: "Convertissez votre Markdown en PDF de haute qualité",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
