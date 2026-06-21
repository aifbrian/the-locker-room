import { createFileRoute } from "@tanstack/react-router";
import { AnnouncementBar } from "@/components/landing/AnnouncementBar";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { BrandStrip } from "@/components/landing/BrandStrip";
import { Categories } from "@/components/landing/Categories";
import { BestSellers } from "@/components/landing/BestSellers";
import { Vintage } from "@/components/landing/Vintage";
import { Clubs } from "@/components/landing/Clubs";
import { NationalTeams } from "@/components/landing/NationalTeams";
import { WhyUs } from "@/components/landing/WhyUs";
import { Reviews } from "@/components/landing/Reviews";
import { InstagramGrid } from "@/components/landing/InstagramGrid";
import { Newsletter } from "@/components/landing/Newsletter";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { StickyMobileCTA } from "@/components/landing/StickyMobileCTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Locker Room — Jersey Bola Original di Indonesia" },
      {
        name: "description",
        content:
          "Destinasi jersey sepak bola original di Indonesia. Koleksi liga top dunia, tim nasional, hingga jersey vintage langka — terkurasi dan terjamin keasliannya.",
      },
      { property: "og:title", content: "The Locker Room — Jersey Bola Original" },
      {
        property: "og:description",
        content:
          "Koleksi jersey original dari berbagai liga dunia, musim terbaru hingga vintage langka. 100% original, garansi keaslian.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main id="main">
        <Hero />
        <BrandStrip />
        <Categories />
        <BestSellers />
        <Vintage />
        <Clubs />
        <NationalTeams />
        <WhyUs />
        <Reviews />
        <InstagramGrid />
        <Newsletter />
        <FinalCTA />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
