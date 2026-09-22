import type { Metadata } from "next";
import "./css/globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import styles from "./css/RootLayout.module.css";

export const metadata: Metadata = {
  title: "Evently",
  description: "Event registration platform",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className={styles.main}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
