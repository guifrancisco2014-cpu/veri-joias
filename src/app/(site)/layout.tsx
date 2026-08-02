import { Header } from "@/components/site/Header";
import { BrandHighlights } from "@/components/site/BrandHighlights";
import { Footer } from "@/components/site/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <BrandHighlights />
      <Footer />
    </>
  );
}
