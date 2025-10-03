import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Children in caring environment" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-accent/80 to-secondary/70" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-primary-foreground mb-6">
              Orphanage Management Platform
            </h1>
            <p className="font-heading text-2xl md:text-3xl text-primary-foreground/90 mb-4">
              Streamlining care, donations, and community support.
            </p>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto font-light">
              A modern web solution for orphanages to manage donations, records, and volunteers with ease.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              size="lg" 
              variant="secondary"
              className="font-heading font-semibold text-lg px-8 py-6 rounded-full transition-all hover:scale-105"
              asChild
            >
              <Link to="/signin">
                <LogIn className="mr-2 h-5 w-5" />
                Sign In / Create Account
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline-light"
              className="font-heading font-semibold text-lg px-8 py-6 rounded-full transition-all hover:scale-105"
              asChild
            >
              <Link to="/dashboard">
                <PlayCircle className="mr-2 h-5 w-5" />
                View Demo
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-primary-foreground flex items-start justify-center p-2"
        >
          <motion.div className="w-1 h-2 bg-primary-foreground rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};
