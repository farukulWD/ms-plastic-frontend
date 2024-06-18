import { Inter } from "next/font/google";
import "./globals.css";
import Main from "./components/main/Main";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ms plastic",
  description: "This is inventory management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Main>{children}</Main>
      </body>
    </html>
  );
}
