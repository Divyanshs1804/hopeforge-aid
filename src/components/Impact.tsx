import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 50, suffix: "+", label: "Orphanages Supported" },
  { value: 1000, suffix: "+", label: "Donations Processed" },
  { value: 500, suffix: "+", label: "Active Volunteers" },
  { value: 2000, suffix: "+", label: "Children Helped" },
];

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const duration = 2000;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-heading text-5xl md:text-6xl font-bold text-primary">
      {count}{suffix}
    </span>
  );
};

export const Impact = () => {
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
            Our Impact
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Making a difference in communities worldwide
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center bg-card p-8 rounded-3xl shadow-card"
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="mt-2 text-muted-foreground font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-card p-10 rounded-3xl shadow-soft border-l-4 border-primary">
            <p className="text-lg text-card-foreground italic mb-4 leading-relaxed">
              "This platform has transformed how we operate. We can now track donations transparently, 
              manage our volunteers efficiently, and most importantly, provide better care for our children. 
              It's been a game-changer for our organization."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground font-heading font-bold">
                MJ
              </div>
              <div>
                <p className="font-heading font-semibold text-foreground">Maria Johnson</p>
                <p className="text-sm text-muted-foreground">Director, Hope Children's Home</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
