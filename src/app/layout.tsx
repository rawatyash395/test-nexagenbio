import type { Metadata, Viewport } from "next";
import "./globals.css";
// Distinct high-tech & clinical typography (self-hosted via @fontsource)
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/600.css";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
import dynamic from "next/dynamic";
const BioCursor = dynamic(() => import("@/components/ui/BioCursor"), { ssr: false });

export const metadata: Metadata = {
  title: "NexaGen Bio - Precision Biology at the Molecular Frontier",
  description:
    "NexaGen Bio engineers next-generation mRNA therapeutics through computational protein design and high-throughput synthetic biology. From sequence to clinical candidate in record time.",
  keywords: [
    "biotech",
    "mRNA therapeutics",
    "protein engineering",
    "synthetic biology",
    "computational biology",
    "precision medicine",
  ],
  authors: [{ name: "NexaGen Bio" }],
  openGraph: {
    title: "NexaGen Bio - Precision Biology at the Molecular Frontier",
    description:
      "Engineering next-generation mRNA therapeutics through computational protein design.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexaGen Bio",
    description: "Precision Biology at the Molecular Frontier",
  },
  icons: {
    icon: [
      { url: "/bio-cursor-cell-light.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/bio-cursor-cell-light.png",
    apple: "/bio-cursor-cell-light.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0E0C",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-brand-black text-brand-white font-sans antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SmoothScrollProvider>
          <BioCursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
