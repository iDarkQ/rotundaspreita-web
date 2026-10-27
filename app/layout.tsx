import { GoogleOAuthProvider } from "@react-oauth/google";
import type { Metadata } from "next";
import "./globals.css";

import { Roboto, Source_Code_Pro } from "next/font/google";
import { Layout } from "@/app/_components/layout/layout";
import { LogSession } from "@/app/_components/log-session";
import { GoogleAnalytics } from "@next/third-parties/google";

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
      "ROTUNDÁSPREITA - Prepare-se para ser Instrutor, Diretor ou Examinador de Segurança Rodoviária",
    template: "%s | ROTUNDÁSPREITA",
  },
  description:
    "Prepare-se para os exames de Instrutor, Diretor de Escola de Condução e Examinador de Segurança Rodoviária com mais de 1000 questões, mini-testes de 30 minutos e análises inteligentes.",
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    siteName: "ROTUNDÁSPREITA",
    locale: "pt-PT",
    url: "https://rotundaspreita.com/",
  },
  icons: {
    icon: "/favicon.png?v=2",
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
          className={`relative ${roboto.variable} ${sourceCodePro.variable} bg-background antialiased`}
        >
          <GoogleAnalytics gaId="AW-17799390098" />
          <Layout>{children}</Layout>
          <LogSession />
        </body>
      </html>
    </GoogleOAuthProvider>
  );
}
