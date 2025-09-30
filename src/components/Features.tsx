import { motion } from "framer-motion";
import { Heart, Users, Calendar, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Heart,
    title: "Donation Tracking",
    description: "Secure and transparent donation records. Track every contribution and ensure accountability to your donors.",
    color: "text-accent",
    bgColor: "bg-accent-light",
  },
  {
    icon: FileText,
    title: "Child Records",
    description: "Maintain safe, structured profiles for each child. Keep health, education, and personal records organized.",
    color: "text-primary",
    bgColor: "bg-primary-light",
  },
  {
    icon: Users,
    title: "Volunteer Management",
    description: "Easy scheduling and coordination. Manage volunteer shifts, track hours, and streamline communication.",
    color: "text-secondary",
    bgColor: "bg-secondary-light",
  },
  {
    icon: Calendar,
    title: "Events",
    description: "Organize and promote fundraising and community events. Increase engagement and build stronger support networks.",
    color: "text-accent",
    bgColor: "bg-accent-light",
  },
];

export const Features = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage your orphanage efficiently and transparently
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full border-none shadow-card hover:shadow-soft transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className={`w-14 h-14 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-4`}>
                    <feature.icon className={`h-7 w-7 ${feature.color}`} />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-card-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
