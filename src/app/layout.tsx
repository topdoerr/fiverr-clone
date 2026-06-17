import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ServiceWorkerRegister } from "@/components/service-worker-register";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TopDoerr — Buy AI outcomes. Delivered by TopDoerr.",
    template: "%s · TopDoerr",
  },
  description:
    "Browse AI services, choose a package, and let TopDoerr assign internal AI talent, systems, and agents to deliver the work. No freelancers. No guessing. Just execution.",
  metadataBase: new URL("https://topdoerr.com"),
  openGraph: {
    title: "TopDoerr — Buy AI outcomes. Delivered by TopDoerr.",
    description:
      "A managed AI delivery system. Marketplace simplicity. Managed delivery.",
    type: "website",
  },
  applicationName: "TopDoerr",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "TopDoerr",
  },
  icons: {
    icon: "/brand/td_favicon_forest.svg",
    apple: "/icons/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-background font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
