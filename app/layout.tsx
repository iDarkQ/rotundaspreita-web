import { GoogleOAuthProvider } from "@react-oauth/google";
import type { Metadata } from "next";
import "./globals.css";

import { Roboto, Source_Code_Pro } from "next/font/google";
import { Layout } from "@/app/_components/layout/layout";

const roboto = Roboto({
  weight: ["200", "300", "800"],
  display: "swap",
  variable: "--font-roboto",
});

const sourceCodePro = Source_Code_Pro({
  weight: ["400"],
  display: "swap",
  variable: "--font-source-code-pro",
});

export const metadata: Metadata = {
  title: {
    default:
      "ROTUNDÁSPREITA - Torne-se Instrutor ou Diretor de Escola de Condução",
    template: "%s | ROTUNDÁSPREITA",
  },
  description:
    "ROTUNDÁSPREITA - Torne-se Instrutor ou Diretor de Escola de Condução",
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    siteName: "ROTUNDÁSPREITA",
    locale: "pt-PT",
    url: "https://rotundaspreita.com/",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ""}
    >
      <html lang="pt">
        <body
          className={`relative ${roboto.variable} ${sourceCodePro.variable} antialiased bg-background`}
        >
          <Layout>{children}</Layout>
        </body>
      </html>
    </GoogleOAuthProvider>
  );
}
