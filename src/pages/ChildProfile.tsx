import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  User,
  Calendar,
  AlertTriangle,
  Syringe,
  FileText,
  Heart,
  Phone,
  MapPin,
  Edit,
  Upload,
  Bot,
  Send,
  Activity,
  Ruler,
  Weight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AIChat } from "@/components/AIChat";

// Mock data for child profiles
const mockChildData: Record<string, any> = {
  "rahul-kumar": {
    name: "Rahul Kumar",
    age: 8,
    dateOfBirth: "March 15, 2017",
    gender: "Male",
    height: "120 cm",
    weight: "25 kg",
    uniqueId: "ORF-2017-001",
    guardianContact: "+91 98765 43210",
    location: "Room 3B",
    bloodGroup: "O+",
    allergies: ["None"],
    chronicConditions: ["None"],
    vaccinesDue: ["COVID-19 Booster", "HPV Vaccine"],
    vaccinesCompleted: [
      { name: "BCG", date: "April 2017" },
      { name: "Hepatitis B", date: "May 2017" },
      { name: "DPT", date: "June 2017" },
      { name: "Polio", date: "July 2017" },
      { name: "MMR", date: "March 2018" },
    ],
    recentReports: [
      { date: "Sept 20, 2025", type: "Health Checkup", status: "Normal" },
      { date: "Aug 15, 2025", type: "Dental Checkup", status: "Normal" },
      { date: "July 10, 2025", type: "Vision Test", status: "Normal" },
    ],
    healthStatus: "warning",
    healthNotes:
      "Vaccines due soon. Schedule appointment for COVID-19 booster and HPV vaccine.",
    documents: [
      { name: "Annual Health Checkup 2025.pdf", date: "Sept 20, 2025" },
      { name: "Vaccination Record.pdf", date: "March 15, 2024" },
      { name: "Dental Checkup Report.pdf", date: "Aug 15, 2025" },
    ],
    staffNotes:
      "Doctor recommended flu shot by next week. Child is doing well in sports activities.",
  },
  "ananya-sharma": {
    name: "Ananya Sharma",
    age: 6,
    dateOfBirth: "June 22, 2019",
    gender: "Female",
    height: "110 cm",
    weight: "20 kg",
    uniqueId: "ORF-2019-003",
    guardianContact: "+91 98765 43211",
    location: "Room 2A",
    bloodGroup: "A+",
    allergies: ["None"],
    chronicConditions: ["None"],
    vaccinesDue: [],
    vaccinesCompleted: [
      { name: "BCG", date: "July 2019" },
      { name: "Hepatitis B", date: "August 2019" },
      { name: "DPT", date: "September 2019" },
      { name: "Polio", date: "October 2019" },
      { name: "MMR", date: "June 2020" },
      { name: "Chickenpox", date: "January 2021" },
    ],
    recentReports: [
      { date: "Sept 29, 2025", type: "Annual Checkup", status: "Excellent" },
      { date: "June 12, 2025", type: "Dental Checkup", status: "Normal" },
    ],
    healthStatus: "ok",
    healthNotes: "All vaccinations up to date. Next checkup due in 6 months.",
    documents: [
      { name: "Annual Checkup 2025.pdf", date: "Sept 29, 2025" },
      { name: "Dental Report June 2025.pdf", date: "June 12, 2025" },
    ],
    staffNotes: "Excellent health. Regular checkups scheduled.",
  },
  "rohan-gupta": {
    name: "Rohan Gupta",
    age: 10,
    dateOfBirth: "January 8, 2015",
    gender: "Male",
    height: "135 cm",
    weight: "32 kg",
    uniqueId: "ORF-2015-002",
    guardianContact: "+91 98765 43212",
    location: "Room 4C",
    bloodGroup: "B+",
    allergies: ["None"],
    chronicConditions: ["None"],
    vaccinesDue: ["Tdap Booster", "HPV Vaccine"],
    vaccinesCompleted: [
      { name: "BCG", date: "February 2015" },
      { name: "Hepatitis B", date: "March 2015" },
      { name: "DPT", date: "April 2015" },
      { name: "Polio", date: "May 2015" },
      { name: "MMR", date: "January 2016" },
    ],
    recentReports: [
      { date: "Aug 5, 2025", type: "Health Checkup", status: "Normal" },
    ],
    healthStatus: "overdue",
    healthNotes:
      "URGENT: Tdap booster is overdue by 2 months. Schedule immediately.",
    documents: [
      { name: "Health Checkup Aug 2025.pdf", date: "Aug 5, 2025" },
      { name: "Vaccination Card.pdf", date: "Feb 1, 2015" },
    ],
    staffNotes: "Reminder sent to guardian. Follow up needed urgently.",
  },
  "priya-singh": {
    name: "Priya Singh",
    age: 7,
    dateOfBirth: "November 30, 2018",
    gender: "Female",
    height: "115 cm",
    weight: "22 kg",
    uniqueId: "ORF-2018-005",
    guardianContact: "+91 98765 43213",
    location: "Room 2B",
    bloodGroup: "AB+",
    allergies: ["Peanuts", "Penicillin"],
    chronicConditions: ["None"],
    vaccinesDue: [],
    vaccinesCompleted: [
      { name: "BCG", date: "December 2018" },
      { name: "Hepatitis B", date: "January 2019" },
      { name: "DPT", date: "February 2019" },
      { name: "Polio", date: "March 2019" },
      { name: "MMR", date: "November 2019" },
    ],
    recentReports: [
      { date: "Sept 27, 2025", type: "Allergy Test", status: "Alert" },
      { date: "Sept 20, 2025", type: "Health Checkup", status: "Normal" },
    ],
    healthStatus: "warning",
    healthNotes:
      "New allergies detected: Peanuts and Penicillin. Update all medical records and inform kitchen staff.",
    documents: [
      { name: "Allergy Test Report.pdf", date: "Sept 27, 2025" },
      { name: "Health Checkup Sept 2025.pdf", date: "Sept 20, 2025" },
      { name: "Vaccination Record.pdf", date: "Dec 1, 2018" },
    ],
    staffNotes:
      "Kitchen staff informed about peanut allergy. Medical bracelet ordered.",
  },
  "aarav-patel": {
    name: "Aarav Patel",
    age: 9,
    dateOfBirth: "May 5, 2016",
    gender: "Male",
    height: "130 cm",
    weight: "28 kg",
    uniqueId: "ORF-2016-004",
    guardianContact: "+91 98765 43214",
    location: "Room 3A",
    bloodGroup: "O-",
    allergies: ["None"],
    chronicConditions: ["None"],
    vaccinesDue: [],
    vaccinesCompleted: [
      { name: "BCG", date: "June 2016" },
      { name: "Hepatitis B", date: "July 2016" },
      { name: "DPT", date: "August 2016" },
      { name: "Polio", date: "September 2016" },
      { name: "MMR", date: "May 2017" },
      { name: "Typhoid", date: "March 2020" },
    ],
    recentReports: [
      { date: "Sept 15, 2025", type: "Sports Physical", status: "Excellent" },
    ],
    healthStatus: "ok",
    healthNotes: "Excellent health. Active in sports programs.",
    documents: [
      { name: "Sports Physical Report.pdf", date: "Sept 15, 2025" },
      { name: "Annual Checkup 2025.pdf", date: "May 5, 2025" },
    ],
    staffNotes: "Participating in football team. Excellent fitness level.",
  },
  "kavya-reddy": {
    name: "Kavya Reddy",
    age: 5,
    dateOfBirth: "September 12, 2020",
    gender: "Female",
    height: "105 cm",
    weight: "18 kg",
    uniqueId: "ORF-2020-006",
    guardianContact: "+91 98765 43215",
    location: "Room 1A",
    bloodGroup: "A-",
    allergies: ["None"],
    chronicConditions: ["None"],
    vaccinesDue: [],
    vaccinesCompleted: [
      { name: "BCG", date: "October 2020" },
      { name: "Hepatitis B", date: "November 2020" },
      { name: "DPT", date: "December 2020" },
      { name: "Polio", date: "January 2021" },
      { name: "MMR", date: "September 2021" },
    ],
    recentReports: [
      { date: "Sept 10, 2025", type: "Annual Checkup", status: "Normal" },
    ],
    healthStatus: "ok",
    healthNotes: "All vaccinations completed for age group.",
    documents: [
      { name: "Annual Checkup Sept 2025.pdf", date: "Sept 10, 2025" },
    ],
    staffNotes: "Youngest child. All milestones being met properly.",
  },
};

const ChildProfile = () => {
  const { id } = useParams<{ id: string }>();
  const child = id ? mockChildData[id] : null;
  const [aiQuery, setAiQuery] = useState("");
  const [isDocumentsOpen, setIsDocumentsOpen] = useState(false);

  if (!child) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <Card className="shadow-card max-w-md w-full mx-4">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground mb-4">
              Child profile not found
            </p>
            <Link to="/dashboard">
              <Button className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getHealthStatusBadge = () => {
    switch (child.healthStatus) {
      case "ok":
        return <Badge variant="default">Healthy</Badge>;
      case "warning":
        return <Badge variant="secondary">Attention Needed</Badge>;
      case "overdue":
        return <Badge variant="destructive">Urgent</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Placeholder handlers for future backend integration
  const handleEditProfile = () => {
    // TODO: Connect to /api/child/:id/edit
    console.log("Edit profile clicked");
  };

  const handleUploadReport = () => {
    // TODO: Connect to /api/child/:id/upload-report
    console.log("Upload report clicked");
  };

  const handleAskAI = () => {
    // TODO: Connect to LLM/RAG backend for child-specific queries
    console.log("AI query:", aiQuery);
    setAiQuery("");
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <motion.header
        className="bg-card shadow-soft py-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6">
          <Link to="/dashboard">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-2">
            Child Profile: {child.name}
          </h1>
          <p className="text-muted-foreground text-lg">
            Detailed health and activity record
          </p>
        </div>
      </motion.header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Health Alert Section */}
            {child.healthStatus !== "ok" && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card
                  className={`shadow-card ${
                    child.healthStatus === "overdue"
                      ? "border-destructive"
                      : "border-secondary"
                  }`}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <AlertTriangle
                        className={`h-6 w-6 ${
                          child.healthStatus === "overdue"
                            ? "text-destructive"
                            : "text-secondary"
                        }`}
                      />
                      <div>
                        <h3 className="font-semibold text-lg mb-1">
                          Health Alert
                        </h3>
                        <p className="text-muted-foreground">
                          {child.healthNotes}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.section>
            )}

            {/* Profile Snapshot */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-6 w-6 text-primary" />
                    Profile Snapshot
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Photo Placeholder */}
                    <div className="flex justify-center">
                      <div className="w-32 h-32 rounded-lg bg-muted flex items-center justify-center">
                        <User className="h-16 w-16 text-muted-foreground" />
                      </div>
                    </div>

                    {/* Key Info */}
                    <div className="md:col-span-2 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p className="font-medium">{child.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Age</p>
                        <p className="font-medium">{child.age} years</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Gender</p>
                        <p className="font-medium">{child.gender}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Unique ID
                        </p>
                        <p className="font-medium font-mono text-sm">
                          {child.uniqueId}
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Ruler className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Height
                          </p>
                          <p className="font-medium">{child.height}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Weight className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Weight
                          </p>
                          <p className="font-medium">{child.weight}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-end">
                    {getHealthStatusBadge()}
                  </div>
                </CardContent>
              </Card>
            </motion.section>

            {/* Health Information Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-6 w-6 text-primary" />
                    Health Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground mb-1">
                        Allergies
                      </p>
                      <p className="font-medium">
                        {child.allergies.join(", ")}
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground mb-1">
                        Blood Group
                      </p>
                      <p className="font-medium">{child.bloodGroup}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground mb-1">
                        Chronic Conditions
                      </p>
                      <p className="font-medium">
                        {child.chronicConditions.join(", ")}
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground mb-1">
                        Vaccination Status
                      </p>
                      <p className="font-medium">
                        {child.vaccinesCompleted.length} completed,{" "}
                        {child.vaccinesDue.length} due
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.section>

            {/* Vaccination Timeline */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Syringe className="h-6 w-6 text-primary" />
                    Vaccination Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Vaccine</TableHead>
                          <TableHead>Date Given</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {child.vaccinesCompleted.map(
                          (vaccine: any, index: number) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">
                                {vaccine.name}
                              </TableCell>
                              <TableCell className="text-muted-foreground">
                                {vaccine.date}
                              </TableCell>
                              <TableCell>
                                <Badge variant="default">✅ Completed</Badge>
                              </TableCell>
                            </TableRow>
                          )
                        )}
                        {child.vaccinesDue.map(
                          (vaccine: string, index: number) => (
                            <TableRow key={`due-${index}`}>
                              <TableCell className="font-medium">
                                {vaccine}
                              </TableCell>
                              <TableCell className="text-muted-foreground">
                                Not scheduled
                              </TableCell>
                              <TableCell>
                                <Badge variant="secondary">⚠️ Due</Badge>
                              </TableCell>
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </motion.section>

            {/* Health Documents Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-6 w-6 text-primary" />
                    Health Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Dialog
                    open={isDocumentsOpen}
                    onOpenChange={setIsDocumentsOpen}
                  >
                    <DialogTrigger asChild>
                      <Button className="w-full" size="lg">
                        <FileText className="h-5 w-5 mr-2" />
                        View Health Documents
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>
                          Health Documents - {child.name}
                        </DialogTitle>
                        <DialogDescription>
                          List of uploaded medical reports and documents
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-3 max-h-[400px] overflow-y-auto">
                        {child.documents.map((doc: any, index: number) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.05 * index }}
                            className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-primary" />
                              <div>
                                <p className="font-medium">{doc.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {doc.date}
                                </p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                      {/* TODO: Later this will be backed by /api/child/:id/documents */}
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </motion.section>

            {/* Notes / Observations */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-6 w-6 text-primary" />
                    Staff Notes & Observations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={child.staffNotes}
                    readOnly
                    className="min-h-[100px] resize-none"
                    placeholder="Staff comments and observations..."
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    These notes are for internal use only
                  </p>
                </CardContent>
              </Card>
            </motion.section>

            {/* Navigation / Actions */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Card className="shadow-card">
                <CardContent className="pt-6">
                  <div className="grid sm:grid-cols-3 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={handleEditProfile}
                        variant="secondary"
                        size="lg"
                        className="w-full"
                      >
                        <Edit className="h-5 w-5 mr-2" />
                        Edit Profile
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link to={`/child/${id}/upload-report`}>
                        <Button
                          variant="default"
                          size="lg"
                          className="w-full"
                        >
                          <Upload className="h-5 w-5 mr-2" />
                          Upload Report
                        </Button>
                      </Link>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link to="/dashboard">
                        <Button
                          variant="outline"
                          size="lg"
                          className="w-full"
                        >
                          <ArrowLeft className="h-5 w-5 mr-2" />
                          Back to Dashboard
                        </Button>
                      </Link>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.section>
          </div>

          {/* AI Assistant */}
          <motion.aside
            className="lg:sticky lg:top-6 lg:self-start"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="shadow-card border-2 border-accent/20 bg-gradient-to-br from-accent/5 to-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-accent">
                  <Bot className="h-6 w-6" />
                  AI Health Assistant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Ask questions about {child.name}'s health, vaccination history, and medical records
                </p>
                <AIChat 
                  childId={id} 
                  placeholder={`Ask about ${child.name}'s health...`}
                />
              </CardContent>
            </Card>
          </motion.aside>
        </div>
      </div>
    </div>
  );
};

export default ChildProfile;
