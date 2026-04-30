import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import MeetupSection from "@/components/MeetupSection";
import PhotosSection from "@/components/PhotosSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import ProjectsSection from "@/components/ProjectsSection";
import WhyJoinSection from "@/components/WhyJoinSection";
import CommunitySection from "@/components/CommunitySection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <MeetupSection />
        <PhotosSection />
        <ActivitiesSection />
        <ProjectsSection />
        <WhyJoinSection />
        <CommunitySection />
      </main>
      <FooterSection />
    </div>
  );
};

export default Index;
