import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, TrendingUp } from "lucide-react";
import { useState } from "react";

export const Demo = () => {
  const [donated, setDonated] = useState(false);

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
            See It In Action
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the simplicity and power of our platform
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Interactive Demo Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shadow-soft border-none overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="bg-gradient-hero text-primary-foreground">
                <CardTitle className="font-heading flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Emergency Medical Fund
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="font-heading font-semibold text-foreground">
                      ${donated ? "2,850" : "2,500"} / $5,000
                    </span>
                  </div>
                  <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: "50%" }}
                      animate={{ width: donated ? "57%" : "50%" }}
                      transition={{ duration: 0.5 }}
                      className="h-full bg-gradient-warm"
                    />
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Help us provide essential medical care and supplies for children in need.
                </p>

                <div className="bg-muted/50 rounded-xl p-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <TrendingUp className="h-4 w-4 text-accent" />
                    <span>Recent Donations</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Anonymous</span>
                      <span className="font-semibold text-primary">$100</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Sarah M.</span>
                      <span className="font-semibold text-primary">$250</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => setDonated(!donated)}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-semibold rounded-xl"
                >
                  {donated ? "✓ Donated $350" : "Donate Now"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="font-heading text-3xl font-bold text-foreground">
              Real-Time Donation Tracking
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Try clicking the "Donate Now" button to see how donors can contribute 
              and track their impact in real-time. Our platform makes every transaction 
              transparent and immediate.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <div>
                  <p className="font-heading font-semibold text-foreground">Instant Updates</p>
                  <p className="text-muted-foreground">
                    See donation progress update in real-time
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-secondary mt-2" />
                <div>
                  <p className="font-heading font-semibold text-foreground">Complete Transparency</p>
                  <p className="text-muted-foreground">
                    Track where every dollar goes
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                <div>
                  <p className="font-heading font-semibold text-foreground">Donor Recognition</p>
                  <p className="text-muted-foreground">
                    Celebrate and acknowledge every contribution
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
