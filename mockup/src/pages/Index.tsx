import Navbar from "@/components/wedding/Navbar";
import HeroSection from "@/components/wedding/HeroSection";
import CountdownSection from "@/components/wedding/CountdownSection";
import CoupleSection from "@/components/wedding/CoupleSection";
import StorySection from "@/components/wedding/StorySection";
import EventsSection from "@/components/wedding/EventsSection";
import GallerySection from "@/components/wedding/GallerySection";
import WeddingPartySection from "@/components/wedding/WeddingPartySection";
import RSVPSection from "@/components/wedding/RSVPSection";
import Footer from "@/components/wedding/Footer";
import FireworksToggle from "@/components/wedding/FireworksToggle";
import BackgroundMusic from "@/components/wedding/BackgroundMusic";

const Index = () => {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <CountdownSection />
      <CoupleSection />
      <StorySection />
      <EventsSection />
      <GallerySection />
      {/* <WeddingPartySection /> */}
      {/* <RSVPSection /> */}
      <Footer />
      {/* <FireworksToggle /> */}
      <BackgroundMusic />
    </main>
  );
};

export default Index;
