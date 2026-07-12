import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { Features } from "@/components/home/features";
import { HowItWorks } from "@/components/home/how-it-works";
import { SupportedModels } from "@/components/home/supported-models";
import { WhySelfConsistency } from "@/components/home/why-self-consistency";
import { CTA } from "@/components/home/cta";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="pb-28">
        <Hero />
        <Features />
        <HowItWorks />
        <SupportedModels />
        <WhySelfConsistency />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
