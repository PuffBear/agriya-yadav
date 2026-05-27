import React from 'react';
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Agriya Yadav | Quant Editorial",
  description: "Personal site of Agriya Yadav.",
  icons: {
    icon: "/assets/logo-mark.svg",
  },
  openGraph: {
    title: "Agriya Yadav",
    description: "Personal site of Agriya Yadav.",
    url: "https://agriyayadav.com",
    siteName: "Agriya Yadav",
    images: [
      {
        url: "/assets/logo-mark.svg",
        width: 800,
        height: 600,
      },
    ],
    type: "website",
  },
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
