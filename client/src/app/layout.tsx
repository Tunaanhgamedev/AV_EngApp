import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { MusicProvider } from "@/context/MusicContext";
import { MusicWidget } from "@/components/MusicWidget";
import { LayoutWrapper } from "@/components/LayoutWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AVEngApp | AI-Powered English Learning",
  description: "Learn English effectively with AI-powered features and gamification.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${poppins.variable} antialiased flex min-h-full bg-background`}
      >
        <AuthProvider>
          <MusicProvider>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
            <MusicWidget />
          </MusicProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
