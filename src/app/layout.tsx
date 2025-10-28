import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://manav-portfolio-three.vercel.app"),
  title: {
    default: "Manav Singh Jamwal | Cybersecurity Engineer & AI Security Expert",
    template: "%s | Manav Singh Jamwal"
  },
  description: "Portfolio of Manav Singh Jamwal — Cybersecurity Engineer specializing in application security, mobile reverse engineering, smart contract auditing, and AI-powered detection systems. Experienced in penetration testing, blockchain security, and DevSecOps.",
  keywords: [
    "cybersecurity",
    "security engineer",
    "penetration testing",
    "mobile security",
    "reverse engineering",
    "blockchain security",
    "smart contracts",
    "AI security",
    "machine learning",
    "DevSecOps",
    "Frida",
    "MobSF",
    "Web3",
    "Solidity",
    "security audit",
    "InfoSec",
    "ethical hacking",
    "OWASP",
    "TryHackMe"
  ],
  authors: [{ name: "Manav Singh Jamwal", url: "https://manav-portfolio-three.vercel.app" }],
  creator: "Manav Singh Jamwal",
  publisher: "Manav Singh Jamwal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://manav-portfolio-three.vercel.app",
    siteName: "Manav Singh Jamwal Portfolio",
    title: "Manav Singh Jamwal | Cybersecurity Engineer",
    description: "Explore my cybersecurity projects, mobile security research, smart contract audits, and AI-powered security solutions. Available for security consulting and penetration testing.",
    images: [
      {
        url: "/mascot.jpg",
        width: 1200,
        height: 630,
        alt: "Manav Singh Jamwal - Cybersecurity Engineer Portfolio",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manav Singh Jamwal | Cybersecurity Engineer",
    description: "Cybersecurity engineer specializing in mobile security, blockchain audits, and AI-powered detection systems.",
    images: ["/mascot.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://manav-portfolio-three.vercel.app",
  },
  category: "technology",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
