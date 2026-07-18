import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { MusicProvider } from "@/context/MusicContext";
import { MusicWidget } from "@/components/MusicWidget";
import { LayoutWrapper } from "@/components/LayoutWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
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
    <html lang="en" className={`h-full ${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <body
        className="antialiased flex min-h-full bg-background font-sans"
        suppressHydrationWarning
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
