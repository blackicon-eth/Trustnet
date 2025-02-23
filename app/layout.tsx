import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import { FrameProvider } from "@/components/farcaster-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trustnet",
  description: "Undercollateralized lending protocol",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ErudaProvider = dynamic(() => import("../components/Eruda").then((c) => c.ErudaProvider), {
    ssr: false,
  });
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErudaProvider>
          <FrameProvider>{children}</FrameProvider>
        </ErudaProvider>
      </body>
    </html>
  );
}
