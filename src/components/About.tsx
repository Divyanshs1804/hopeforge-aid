import { motion } from "framer-motion";
import { Target, Eye, Sparkles } from "lucide-react";

export const About = () => {
  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            About Our Platform
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Empowering orphanages with technology-driven transparency and organization
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-foreground mb-3">
              Our Purpose
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              To empower orphanages worldwide with modern tools that streamline operations, 
              increase transparency, and ensure that every child receives the care they deserve.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-accent-light rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Eye className="h-8 w-8 text-accent" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-foreground mb-3">
              Our Vision
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Bridging the gap between donors, volunteers, and children in need through 
              technology, creating a connected community dedicated to making a lasting impact.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-secondary-light rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-foreground mb-3">
              Coming Soon
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              AI-powered features will soon help with administrative tasks, answer donor questions, 
              and provide insights — making orphanage management even more efficient.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 max-w-3xl mx-auto text-center"
        >
          <div className="bg-card p-8 rounded-3xl shadow-card">
            <p className="text-lg text-card-foreground leading-relaxed mb-6">
              We believe that every child deserves a safe, nurturing environment. 
              By providing orphanages with the right tools, we're helping create a future 
              where resources are managed efficiently, donors feel connected, 
              and children receive the support they need to thrive.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span className="px-4 py-2 bg-primary-light rounded-full">Transparent</span>
              <span className="px-4 py-2 bg-secondary-light rounded-full">Efficient</span>
              <span className="px-4 py-2 bg-accent-light rounded-full">Community-Driven</span>
              <span className="px-4 py-2 bg-primary-light rounded-full">Child-Focused</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
