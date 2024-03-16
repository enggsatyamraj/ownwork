import { Actor } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";

const actor = Actor({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "QuickAPI",
  description: "QuickAPI is your go-to platform for lightning-fast API creation. Designed with simplicity and efficiency in mind, QuickAPI empowers developers to create custom APIs with ease, eliminating the complexities of traditional backend developmen",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={actor.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
