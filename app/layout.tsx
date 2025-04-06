import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MetaGraph",
  description: "A React-based 2D force-graph visualizer",
  icons: {
    icon: "/node.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
