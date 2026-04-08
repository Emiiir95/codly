import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useMemo } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import {
  I18nContext,
  buildI18n,
  type Translations,
} from "@/lib/i18n";
import Layout from "@/components/organisms/Layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export type SharedPageProps = {
  translations: Translations;
};

export default function MyApp({
  Component,
  pageProps,
  router,
}: AppProps<SharedPageProps>) {
  const i18n = useMemo(
    () => buildI18n(router.locale, pageProps.translations ?? {}),
    [router.locale, pageProps.translations],
  );

  return (
    <I18nContext.Provider value={i18n}>
      <div className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </I18nContext.Provider>
  );
}
