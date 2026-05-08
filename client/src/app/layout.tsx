import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { AuthProvider } from "@/context/AuthContext";

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
    <html lang="en" className="h-full">
      <body
        className={`${inter.variable} ${poppins.variable} antialiased flex min-h-full bg-background`}
      >
        <AuthProvider>
          <Sidebar />
          <main className="flex-1 ml-64 min-h-screen">
            <div className="max-w-7xl mx-auto p-8">
              {children}
            </div>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
