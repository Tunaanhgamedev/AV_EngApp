import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { MusicProvider } from "@/context/MusicContext";
import { MusicWidget } from "@/components/MusicWidget";
import { LayoutWrapper } from "@/components/LayoutWrapper";

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
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
