
import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Montserrat, Montserrat_Alternates } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "./theme/theme-provider";
import Footer from "./components/Footer/Footer";
import ContactBlock from "./components/ContactBlock/ContactBlock";
import Header from "./components/Header/Header";
import BackToTopArrow from "./components/BackToTopArrow/BackToTopArrow";
import SessionProviderWrapper from "./components/SessionProviderWrapper";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


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
                {children}
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
