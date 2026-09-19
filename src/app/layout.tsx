import type { Metadata } from "next";
import "./css/globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Evently",
  description: "Event registration platform",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
