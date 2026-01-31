import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Moon and Mud Pottery | Handcrafted Ceramics',
  description: 'Discover unique, handcrafted pottery inspired by the beauty of moonlight and earth. Each piece tells a story of artistry and nature.',
  keywords: 'pottery, ceramics, handmade, artisan, mugs, bowls, vases',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://app.snipcart.com" />
        <link rel="preconnect" href="https://cdn.snipcart.com" />
        <link
          rel="stylesheet"
          href="https://cdn.snipcart.com/themes/v3.2.0/default/snipcart.css"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />

        {/* Snipcart container */}
        <div
          hidden
          id="snipcart"
          data-api-key="MWQ4YjcwODAtODQxYS00NDNlLTliMGItZTlmMjlkMTZkOTUxNjM5MDU0NzM2NjEyMDU5OTU1"
          data-config-modal-style="side"
        ></div>
        <script
          async
          src="https://cdn.snipcart.com/themes/v3.2.0/default/snipcart.js"
        ></script>
      </body>
    </html>
  );
}
