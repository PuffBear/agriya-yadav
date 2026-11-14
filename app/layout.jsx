import React from 'react';
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  metadataBase: new URL("https://agriya-yadav.vercel.app"),
  title: { default: "Agriya Yadav", template: "%s · Agriya Yadav" },
  description: "Agriya Yadav — mathematics and computer science at Ashoka. Multi-agent RL, game theory, and the occasional tennis model.",
  icons: {
    icon: "/assets/logo-mark.svg",
  },
  openGraph: {
    title: "Agriya Yadav",
    description: "Personal site of Agriya Yadav.",
    url: "/",
    siteName: "Agriya Yadav",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="shell">
          <Header />
          <main className="page-body">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
