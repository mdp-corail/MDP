
import type { Metadata } from "next";
import { Montserrat, Montserrat_Alternates } from "next/font/google";
import "./globals.css";
import Providers from "./api/auth/providers";
import ThemeRegistry from "./theme/theme-provider";
import Footer from "./components/Footer/Footer";
import ContactBlock from "./components/ContactBlock/ContactBlock";
import Header from "./components/Header/Header";
import BackToTopArrow from "./components/BackToTopArrow/BackToTopArrow";
import SessionProviderWrapper from "./components/SessionProviderWrapper";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
});

const montserratAlternates = Montserrat_Alternates({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat-alt',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Meetwork | Échanges entre Professionnels",
  description: "Meetwork propose des échanges internationaux entre professionnels pour ouvrir son horizon d'expertise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <ThemeRegistry>
        <body className={`${montserrat.variable} ${montserratAlternates.variable}`}>
          <SessionProviderWrapper>
            <Header />
            <main className="page-container">
              <Providers>
                {children}
              </Providers>
            </main>
            <BackToTopArrow />
            <ContactBlock />
            <Footer />
          </SessionProviderWrapper>
        </body>
      </ThemeRegistry>

    </html>
  );
}
