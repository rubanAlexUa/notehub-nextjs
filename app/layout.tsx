import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Notehub App",
  description: `Notehub is a streamlined, minimalist workspace
    designed for effortless note management. It allows
    you to instantly capture your ideas, edit them on the fly,
    and delete outdated entries with a single click, keeping
    your digital life organized and clutter-free. Perfectly
    balanced between speed and simplicity, Notehub ensures
    your mostimportant thoughts are always accessible and easy to manage.`,
  openGraph: {
    title: "Notehub App",
    description: `Notehub is a streamlined, minimalist workspace
    designed for effortless note management. It allows
    you to instantly capture your ideas, edit them on the fly,
    and delete outdated entries with a single click, keeping
    your digital life organized and clutter-free.`,
    url: "https://notehub.com",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        alt: "Notehab App",
        width: 1200,
        height: 630,
      },
    ],
    type: "article",
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
