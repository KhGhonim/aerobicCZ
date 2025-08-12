import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  // deploy
  // second deploy
  // add new comments
  // new deploy
  metadataBase: new URL("https://aerobiccupkyjov.cz"),
  title: "Aerobic Centrum Kyjov - Profesionální kurzy aerobiku a fitness",
  description:
  "V termínu 15. 4. 2023 od 10.00 hod. se bude konat již 6. ročník soutěže, a proto doufáme, že bude opět pro všechny zúčastněné skvělým zážitkem.",
  keywords: "aerobic, soutěž, Kyjov, fitness, tanec, cvičení, aerobic cup, fitness aerobik, komerční aerobic, závodní aerobic, sportovní aerobic, soustředění, kurzy aerobiku, fitness centrum, aerobic pro děti, aerobic pro dospělé",
  authors: [{ name: "Aerobic Centrum Kyjov" }],
  creator: "Aerobic Centrum Kyjov",
  publisher: "Aerobic Centrum Kyjov",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1.0",
  icons: {
    icon: "/images/logo.ico",
    apple: "/images/logo.ico",
  },
  alternates: {
    canonical: "https://aerobiccupkyjov.cz",
  },
  openGraph: {
    title: "Aerobic Centrum Kyjov - Profesionální kurzy aerobiku a fitness",
    description:
      "V termínu 15. 4. 2023 od 10.00 hod. se bude konat již 6. ročník soutěže, a proto doufáme, že bude opět pro všechny zúčastněné skvělým zážitkem.",
    url: "https://aerobiccupkyjov.cz",
    siteName: "Aerobic Cup Kyjov - Celorepubliková soutěž v aerobicu",
    locale: "cs_CZ",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Aerobic Centrum Kyjov - Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aerobic Centrum Kyjov",
    description:
      "V termínu 15. 4. 2023 od 10.00 hod. se bude konat již 6. ročník soutěže, a proto doufáme, že bude opět pro všechny zúčastněné skvělým zážitkem.",
    images: ["/images/logo.png"],
    creator: "@aerobiccupkyjov",
    site: "@aerobiccupkyjov",
  },
  other: {
    "theme-color": "#ec4899",
    "msapplication-TileColor": "#ec4899",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Aerobic Centrum Kyjov",
    "format-detection": "telephone=no",
    "msapplication-config": "/browserconfig.xml",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body
        className="font-montserrat antialiased"
        style={{ fontFamily: "Montserrat, sans-serif" }}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
