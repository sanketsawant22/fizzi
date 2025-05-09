import localFont from "next/font/local";

import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";

import "@/app/app.css";

import Header from "@/components/Header";
import ViewCanvas from "@/components/ViewCanvas";
import Footer from "@/components/Footer";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const alpino = localFont({
  src: "../../public/fonts/Alpino-Variable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-alpino",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={alpino.variable}>
      <body className="overflow-x-hidden bg-yellow-300">
        {/* <div
          id="scroll-progress-bar"
          className="fixed top-0 left-1/2 z-[9999] h-1 origin-center bg-orange-700 mt-[1px]"
          style={{ transform: "translateX(-50%) scaleX(0)", width: "100%" }}
        /> */}

        <div
          id="scroll-progress-bar"
          className="fixed top-0 left-0 z-[9999] h-1 mt-[1.5px] bg-gray-600"
          style={{ width: "0%" }}
        />

        <SmoothScrollProvider>
          <Header />
          <main>
            {children}
            <ViewCanvas />
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
