import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  Users,
  AlertTriangle,
  FileText,
  UserPlus,
  Upload,
  Bell,
  Bot,
  Syringe,
  Activity,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for stats cards
const statsData = [
  {
    title: "Children Due for Vaccine",
    value: 12,
    icon: Syringe,
    color: "text-secondary",
    bgColor: "bg-secondary-light",
  },
  {
    title: "Flagged Allergies",
    value: 5,
    icon: AlertTriangle,
    color: "text-destructive",
    bgColor: "bg-red-50 dark:bg-red-950",
  },
  {
    title: "Reports Uploaded This Week",
    value: 8,
    icon: FileText,
    color: "text-accent",
    bgColor: "bg-accent-light",
  },
  {
    title: "Active Volunteers",
    value: 20,
    icon: Users,
    color: "text-primary",
    bgColor: "bg-primary-light",
  },
];

// Mock data for recent activity
const recentActivity = [
  {
    id: 1,
    text: "Report uploaded for Ananya Sharma",
    date: "Sept 29, 2025",
    status: "ok",
  },
  {
    id: 2,
    text: "Vaccine overdue for Rohan Gupta",
    date: "Sept 28, 2025",
    status: "overdue",
  },
  {
    id: 3,
    text: "New allergy reported for Priya Singh",
    date: "Sept 27, 2025",
    status: "pending",
  },
  {
    id: 4,
    text: "Health checkup completed for 15 children",
    date: "Sept 26, 2025",
    status: "ok",
  },
  {
    id: 5,
    text: "Reminder sent: Vaccination drive on Oct 2",
    date: "Sept 25, 2025",
    status: "pending",
  },
  {
    id: 6,
    text: "Report uploaded for Aarav Kumar",
    date: "Sept 24, 2025",
    status: "ok",
  },
];

// Mock data for children overview
const childrenData = [
  {
    id: "rahul-kumar",
    name: "Rahul Kumar",
    age: 8,
    healthAlert: "⚠️ Vaccine due",
    alertType: "warning",
  },
  {
    id: "ananya-sharma",
    name: "Ananya Sharma",
    age: 6,
    healthAlert: "✅ All up to date",
    alertType: "ok",
  },
  {
    id: "rohan-gupta",
    name: "Rohan Gupta",
    age: 10,
    healthAlert: "⚠️ Vaccine overdue",
    alertType: "overdue",
  },
  {
    id: "priya-singh",
    name: "Priya Singh",
    age: 7,
    healthAlert: "⚠️ Allergy flagged",
    alertType: "warning",
  },
  {
    id: "aarav-patel",
    name: "Aarav Patel",
    age: 9,
    healthAlert: "✅ All up to date",
    alertType: "ok",
  },
  {
    id: "kavya-reddy",
    name: "Kavya Reddy",
    age: 5,
    healthAlert: "✅ All up to date",
    alertType: "ok",
  },
];

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Placeholder handlers for future backend integration
  const handleSearch = () => {
    // TODO: Connect to LLM API endpoint /api/query
    console.log("Search query:", searchQuery);
  };

  const handleAddChild = () => {
    // TODO: Connect to /api/add-child
    console.log("Add child clicked");
  };

  const handleUploadReport = () => {
    // TODO: Connect to /api/upload-report
    console.log("Upload report clicked");
  };

  const handleSendReminder = () => {
    // TODO: Connect to /api/send-reminder
    console.log("Send reminder clicked");
  };

  const handleAskAI = () => {
    // TODO: Connect to LLM integration
    console.log("Ask AI assistant clicked");
  };

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "overdue":
        return "destructive";
      case "pending":
        return "secondary";
      case "ok":
        return "default";
      default:
        return "outline";
    }
  };

  const getBadgeText = (status: string) => {
    switch (status) {
      case "overdue":
        return "Overdue";
      case "pending":
        return "Pending";
      case "ok":
        return "Completed";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header Section */}
      <motion.header
        className="bg-card shadow-soft py-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-2">
            Orphanage Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage children's health, reports, and alerts
          </p>
        </div>
      </motion.header>

      <div className="container mx-auto px-6 py-8">
        {/* Search / Query Section */}
        <motion.section
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Ask about vaccines, allergies, or reports…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="pl-10 h-12 text-base"
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  size="lg"
                  className="h-12 px-8"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Quick Stats Cards */}
        <motion.section
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="shadow-card hover:shadow-soft transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`${stat.bgColor} p-3 rounded-lg`}
                      >
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-foreground mb-1">
                      {stat.value}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {stat.title}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Quick Actions Row */}
        <motion.section
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleAddChild}
                    variant="outline"
                    className="w-full h-auto py-4 flex flex-col items-center gap-2"
                  >
                    <UserPlus className="h-6 w-6" />
                    <span className="text-sm font-medium">Add Child</span>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleUploadReport}
                    variant="outline"
                    className="w-full h-auto py-4 flex flex-col items-center gap-2"
                  >
                    <Upload className="h-6 w-6" />
                    <span className="text-sm font-medium">Upload Report</span>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleSendReminder}
                    variant="outline"
                    className="w-full h-auto py-4 flex flex-col items-center gap-2"
                  >
                    <Bell className="h-6 w-6" />
                    <span className="text-sm font-medium">Send Reminder</span>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleAskAI}
                    variant="outline-accent"
                    className="w-full h-auto py-4 flex flex-col items-center gap-2"
                  >
                    <Bot className="h-6 w-6" />
                    <span className="text-sm font-medium">Ask AI Assistant</span>
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Children Overview Section */}
        <motion.section
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                Children Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Child Name</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Health Alert</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {childrenData.map((child, index) => (
                      <motion.tr
                        key={child.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.05 * index }}
                        className="group"
                      >
                        <TableCell className="font-medium">
                          {child.name}
                        </TableCell>
                        <TableCell>{child.age}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center ${
                              child.alertType === "ok"
                                ? "text-primary"
                                : child.alertType === "overdue"
                                ? "text-destructive"
                                : "text-secondary"
                            }`}
                          >
                            {child.healthAlert}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Link to={`/child/${child.id}`}>
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button
                                variant={
                                  child.alertType === "overdue"
                                    ? "destructive"
                                    : child.alertType === "warning"
                                    ? "secondary"
                                    : "default"
                                }
                                size="sm"
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                View Profile
                              </Button>
                            </motion.div>
                          </Link>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {/* TODO: Later this will be backed by /api/children */}
            </CardContent>
          </Card>
        </motion.section>

        {/* Main Content Grid: Recent Activity + AI Insights */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Activity / Alerts List */}
          <motion.section
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Activity className="h-6 w-6 text-primary" />
                  Recent Activity & Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 * index }}
                      className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="text-foreground font-medium mb-1">
                          {item.text}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.date}
                        </p>
                      </div>
                      <Badge variant={getBadgeVariant(item.status)}>
                        {getBadgeText(item.status)}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
                {/* TODO: Later this will be backed by /api/activity */}
              </CardContent>
            </Card>
          </motion.section>

          {/* AI Insights Placeholder */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="shadow-card bg-gradient-to-br from-accent-light to-primary-light dark:from-accent/10 dark:to-primary/10">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Bot className="h-6 w-6 text-accent" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-card">
                    <Bot className="h-8 w-8 text-accent" />
                  </div>
                  <p className="text-muted-foreground mb-2 font-medium">
                    Coming Soon
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Here, AI will analyze reports and provide recommendations.
                  </p>
                  {/* TODO: This section will be used for RAG agent integration */}
                </div>
              </CardContent>
            </Card>
          </motion.aside>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
