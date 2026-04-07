import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Background from "./Background";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Background />
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
