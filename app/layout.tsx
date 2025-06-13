import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";

// Contexts
import { ThemeProvider } from "next-themes";

// Wrapper Components
import PassGate from "@/components/wrappers/PassGate";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
});

export const metadata: Metadata = {
  title: "Proptzo - CRM",
  description: "(CRM) Proptzo",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://crm.proptzo.com" />
      </head>
      <body className={`${fredoka.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <PassGate> {children}</PassGate>
        </ThemeProvider>
      </body>
    </html>
  );
}
