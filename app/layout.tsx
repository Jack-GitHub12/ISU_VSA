import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/Footer";
import AnimatedPageWrapper from "@/components/layout/AnimatedPageWrapper";

export const metadata: Metadata = {
  metadataBase: new URL('https://isuvsa.vercel.app'),
  title: "ISU VSA - Iowa State University Vietnamese Student Association",
  description: "Connecting Cyclones to Vietnamese Culture. Join ISU VSA for cultural events, community building, and the exciting VSA Royale game!",
  keywords: "ISU, Iowa State, Vietnamese, Student Association, VSA, Culture, Tết, VSA Royale",
  authors: [{ name: "ISU VSA" }],
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
  openGraph: {
    title: "ISU VSA - Iowa State University Vietnamese Student Association",
    description: "Connecting Cyclones to Vietnamese Culture",
    url: "https://isuvsa.vercel.app",
    siteName: "ISU VSA",
    images: [
      {
        url: "/images/app-logo.jpg",
        width: 1200,
        height: 630,
        alt: "ISU VSA - Iowa State Vietnamese Student Association",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ISU VSA - Iowa State University Vietnamese Student Association',
    description: 'Connecting Cyclones to Vietnamese Culture',
    images: ['/images/app-logo.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <AnimatedPageWrapper>
            {children}
          </AnimatedPageWrapper>
        </main>
        <Footer />
      </body>
    </html>
  );
}
