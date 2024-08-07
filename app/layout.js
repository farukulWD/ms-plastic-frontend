import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/main.scss";

import dynamic from "next/dynamic";
import { Providers } from "./redux/provider";
import { Toaster } from "sonner";
import AntConfigProvider from "@/components/common/antdDesignConfig/AntConfigProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ms plastic",
  description: "This is inventory management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AntConfigProvider>{children}</AntConfigProvider>

          <Toaster position="top-center" richColors />
        </Providers>
      </body>
    </html>
  );
}
