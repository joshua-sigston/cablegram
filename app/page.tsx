import Cta from "@/components/layouts/cta";
import EnhancedCta from "@/components/layouts/enhanced-cta";
import FeaturesSection from "@/components/layouts/features-section";
import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";



export default function Home() {
  return (
    <main className="container mx-auto px-3">
      <Header />
      <Cta />
      <FeaturesSection />
      <EnhancedCta />
      <Footer />
    </main>
  );
}
