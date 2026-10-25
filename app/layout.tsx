import type { Metadata } from "next";
import { Suspense } from "react";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";
import ConvexClientProvider from "@/components/convex-client-provider";
import Nav from "@/components/nav";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";

const googleSans = localFont({
  src: [
    {
      path: "../public/assets/brand/fonts/Google_Sans/GoogleSans-VariableFont_GRAD,opsz,wght.ttf",
      style: "normal",
    },
    {
      path: "../public/assets/brand/fonts/Google_Sans/GoogleSans-Italic-VariableFont_GRAD,opsz,wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-google-sans",
  display: "swap",
  fallback: ["Google Sans", "ui-sans-serif", "system-ui", "sans-serif"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sting.delivery"),
  title: {
    default: "Sting — Alcohol & Drinks Delivered On Demand | South Africa",
    template: "%s | Sting",
  },
  description:
    "Sting delivers cold drinks, alcohol, mixers, and ice on demand across South Africa — order from your phone the way you would on Uber Eats or Mr D Food, and get your round delivered before the ice melts.",
  keywords: [
    // Tier 1: core shopper intent
    "alcohol delivery South Africa",
    "liquor delivery app",
    "order alcohol online",
    "cold drinks delivered",
    "drinks delivery app",
    "on-demand alcohol delivery",
    "buy alcohol online South Africa",
    "liquor store delivery",
    // Tier 2: how people find category-adjacent apps
    "like Uber Eats for alcohol",
    "like Mr D Food for drinks",
    "alcohol delivery app South Africa",
    "split a round app",
    "group buy alcohol delivery",
    // Tier 3: geography
    "Gauteng alcohol delivery",
    "Johannesburg alcohol delivery",
    // Brand / developer
    "Sting",
    "Sting app",
    "Craig Gazimbi",
  ],
  authors: [{ name: "Craig Gazimbi", url: "https://www.gazimbi.com/" }],
  creator: "Craig Gazimbi",
  publisher: "Sting",
  category: "On-demand alcohol & beverage delivery",
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "https://sting.delivery",
    siteName: "Sting",
    title: "Sting — Alcohol & Drinks Delivered On Demand | South Africa",
    description:
      "Sting delivers cold drinks, alcohol, mixers, and ice on demand across South Africa — order from your phone the way you would on Uber Eats or Mr D Food, and get your round delivered before the ice melts.",
    images: [
      {
        url: "/assets/platform/sting-og.png",
        width: 1200,
        height: 630,
        alt: "Sting — cold drinks and alcohol delivered on demand",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sting — Alcohol & Drinks Delivered On Demand | South Africa",
    description:
      "Sting delivers cold drinks, alcohol, mixers, and ice on demand across South Africa — order from your phone the way you would on Uber Eats or Mr D Food, and get your round delivered before the ice melts.",
    images: ["/assets/platform/sting-og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://sting.delivery",
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClientProvider>
      <html
        lang="en"
        className={`${googleSans.variable} ${geistMono.variable} h-full antialiased`}
        suppressHydrationWarning
      >
        <head></head>
        <body className="min-h-full flex flex-col">
          <TooltipProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Suspense>
                <Nav />
                {children}
                <Analytics />
                <SpeedInsights />
                <Toaster position="top-center" richColors />
              </Suspense>
            </ThemeProvider>
          </TooltipProvider>
        </body>
      </html>
    </ConvexClientProvider>
  );
}
