import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryProvider } from "@/providers/query-provider";
import SheetProvider from "@/providers/SheetProvider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: {
    template: `%s | Moneyverse`,
    default: `Overview | Moneyverse`,
  },
  description:
    "Moneyverse, is designed to manage and analyze financial transactions efficiently.",
  icons: {
    icon: [
      {
        url: "/favicon.webp",
        type: "image/webp",
      },
    ],
  },
  openGraph: {
    title: "Moneyverse",
    description:
      "Moneyverse, is designed to manage and analyze financial transactions efficiently.",
    images: ["/preview.webp"],
    url: "https://money-verse-web.vercel.app/",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body suppressHydrationWarning={true}>
          <QueryProvider>
            <SheetProvider />
            <Toaster />
            {children}
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
