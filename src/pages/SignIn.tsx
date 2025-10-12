import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Building2, Lock } from "lucide-react";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    orphanageId: "",
    orphanageName: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // TODO: Connect with backend orphanage authentication service
    // Placeholder validation
    if (!formData.orphanageId || !formData.orphanageName || !formData.password) {
      setError("All fields are required");
      return;
    }

    // Redirect to dashboard (no real auth yet)
    navigate("/dashboard");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Branding Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Building2 className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">HopeForge Aid</h1>
          </div>
          <p className="text-muted-foreground">Orphanage Management Platform</p>
        </div>

        {/* Login Card */}
        <div className="bg-card rounded-lg shadow-lg border border-border p-8">
          <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
            Sign In to HopeForge Aid
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Orphanage ID */}
            <div className="space-y-2">
              <Label htmlFor="orphanageId">Orphanage ID</Label>
              <Input
                id="orphanageId"
                name="orphanageId"
                type="text"
                placeholder="Enter your orphanage ID"
                value={formData.orphanageId}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            {/* Orphanage Name */}
            <div className="space-y-2">
              <Label htmlFor="orphanageName">Orphanage Name</Label>
              <Input
                id="orphanageName"
                name="orphanageName"
                type="text"
                placeholder="Enter your orphanage name"
                value={formData.orphanageName}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Forgot Password Link */}
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-primary hover:underline"
                onClick={() => {
                  // TODO: Implement forgot password functionality
                  console.log("Forgot password clicked");
                }}
              >
                Forgot Password?
              </button>
            </div>

            {/* Sign In Button */}
            <Button type="submit" className="w-full" size="lg">
              Sign In
            </Button>
          </form>

          {/* Additional Info */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <button
              type="button"
              className="text-primary hover:underline font-medium"
              onClick={() => navigate("/create-account")}
            >
              Create Account
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;
