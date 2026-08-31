import HeroAbout from "../components/about/HeroAbout";
import StorySection from "../components/about/StorySection";
import ExperienceSection from "../components/about/ExperienceSection";
import ContributionsSection from "../components/about/ContributionsSection";
import TechStackSection from "../components/about/TechStackSection";
import WorkMethodSection from "../components/about/WorkMethodSection";
import TimelineSection from "../components/about/TimelineSection";
import CTASection from "../components/about/CTASection";

export default function AboutPage() {
  return (
    <div className="text-[#1c281b] space-y-16 md:space-y-28 pb-20 font-sans selection:bg-[#2c3e2b]/10">
      <HeroAbout />
      <StorySection />
      <ExperienceSection />
      <ContributionsSection />
      <TechStackSection />
      <WorkMethodSection />
      <TimelineSection />
      <CTASection />
    </div>
  );
}
