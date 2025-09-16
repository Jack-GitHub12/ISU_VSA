import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/Footer";
import AnimatedPageWrapper from "@/components/layout/AnimatedPageWrapper";

export const metadata: Metadata = {
  title: "ISU VSA - Iowa State University Vietnamese Student Association",
  description: "Connecting Cyclones to Vietnamese Culture. Join ISU VSA for cultural events, community building, and the exciting VSA Royale game!",
  keywords: "ISU, Iowa State, Vietnamese, Student Association, VSA, Culture, Tết, VSA Royale",
  authors: [{ name: "ISU VSA" }],
  openGraph: {
    title: "ISU VSA - Iowa State University Vietnamese Student Association",
    description: "Connecting Cyclones to Vietnamese Culture",
    url: "https://isuvsa.org",
    siteName: "ISU VSA",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
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
