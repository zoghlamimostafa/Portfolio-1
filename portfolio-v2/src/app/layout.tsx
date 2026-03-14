import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Mustapha Zoghlami | AI Portfolio",
  description:
    "Cybersecurity Engineer specializing in Cloud Security and DevSecOps. Ask me anything about my experience, skills, and projects.",
  keywords: [
    "Cybersecurity",
    "Cloud Security",
    "DevSecOps",
    "Penetration Testing",
    "Security Engineer",
  ],
  authors: [{ name: "Mustapha Zoghlami" }],
  openGraph: {
    title: "Mustapha Zoghlami | AI Portfolio",
    description:
      "Cybersecurity Engineer specializing in Cloud Security and DevSecOps",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
