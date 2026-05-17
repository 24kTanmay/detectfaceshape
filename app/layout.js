import localFont from "next/font/local";
import { ThemeProvider } from "../components/ThemeProvider";
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

export const metadata = {
  metadataBase: new URL('https://detectfaceshape.shop'),
  title: "Detect Face Shape - Free AI Face Shape Analyzer & Symmetry Test",
  description: "Get your exact face shape in seconds using our free AI face shape detector. Analyze facial symmetry, jawline sharpness, and discover optimal hairstyles.",
  keywords: ["detect face shape", "face shape detector", "face shape analyzer", "what is my face shape", "face symmetry test", "facial symmetry calculator"],
  authors: [{ name: "DetectFaceShape" }],
  creator: "DetectFaceShape",
  openGraph: {
    title: "Detect Face Shape - Free AI Face Shape Analyzer",
    description: "Discover your exact face shape and symmetry score instantly. 100% private, client-side AI analysis.",
    url: "https://detectfaceshape.shop",
    siteName: "Detect Face Shape",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Detect Face Shape - Free AI Face Shape Analyzer",
    description: "Discover your exact face shape and symmetry score instantly.",
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
    canonical: "https://detectfaceshape.shop",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Detect Face Shape",
  "operatingSystem": "Web Browser",
  "applicationCategory": "HealthAndBeautyApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Free AI face shape detector and facial symmetry calculator. Analyzes 468 facial landmarks locally in your browser to determine face shape and symmetry.",
  "url": "https://detectfaceshape.shop"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
