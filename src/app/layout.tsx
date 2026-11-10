import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Newsreader } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import RevealObserver from "@/components/RevealObserver";
import WhatsAppFlutuante from "@/components/WhatsAppFlutuante";
import { organizacao } from "@/lib/schema";
import { site } from "@/lib/site";
import "./globals.css";

const display = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

const text = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Segurança patrimonial e facilities em SP | Fort Protection",
  description:
    "Portaria 24 horas, segurança eletrônica, limpeza e facilities para residências, empresas e instituições. Peça seu orçamento.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${text.variable}`}>
      <body>
        <a className="skip" href="#conteudo">
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <WhatsAppFlutuante />
        <RevealObserver />
        <JsonLd dados={organizacao()} />
      </body>
    </html>
  );
}
