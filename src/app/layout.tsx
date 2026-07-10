import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Subhankar Nandi | AI Engineer & Developer",
  description: "Futuristic AI-powered Operating System portfolio of Subhankar Nandi, showcasing projects in Next.js, React, and Machine Learning.",
  keywords: ["Subhankar Nandi", "Portfolio", "AI Engineer", "Machine Learning", "Next.js", "React", "Frontend Developer", "Web OS"],
  authors: [{ name: "Subhankar Nandi" }],
  creator: "Subhankar Nandi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://subhankar.os",
    title: "Subhankar Nandi | AI Portfolio OS",
    description: "Experience my portfolio as a modern, interactive web-based operating system.",
    siteName: "Subhankar OS"
  },
  twitter: {
    card: "summary_large_image",
    title: "Subhankar Nandi | AI Engineer",
    description: "Futuristic AI-powered Operating System portfolio."
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

