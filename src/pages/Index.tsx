import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import MeetupSection from "@/components/MeetupSection";
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
