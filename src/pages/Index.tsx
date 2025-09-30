import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Impact } from "@/components/Impact";
import { Demo } from "@/components/Demo";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <Impact />
      <Demo />
      <About />
      <Footer />
    </div>
  );
};

export default Index;
