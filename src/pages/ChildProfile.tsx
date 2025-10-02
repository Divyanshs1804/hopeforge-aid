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

// Mock data for child profiles
const mockChildData: Record<string, any> = {
  "rahul-kumar": {
    name: "Rahul Kumar",
    age: 8,
    dateOfBirth: "March 15, 2017",
    gender: "Male",
    guardianContact: "+91 98765 43210",
    location: "Room 3B",
    bloodGroup: "O+",
    allergies: ["None"],
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
  },
  "ananya-sharma": {
    name: "Ananya Sharma",
    age: 6,
    dateOfBirth: "June 22, 2019",
    gender: "Female",
    guardianContact: "+91 98765 43211",
    location: "Room 2A",
    bloodGroup: "A+",
    allergies: ["None"],
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
  },
  "rohan-gupta": {
    name: "Rohan Gupta",
    age: 10,
    dateOfBirth: "January 8, 2015",
    gender: "Male",
    guardianContact: "+91 98765 43212",
    location: "Room 4C",
    bloodGroup: "B+",
    allergies: ["None"],
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
  },
  "priya-singh": {
    name: "Priya Singh",
    age: 7,
    dateOfBirth: "November 30, 2018",
    gender: "Female",
    guardianContact: "+91 98765 43213",
    location: "Room 2B",
    bloodGroup: "AB+",
    allergies: ["Peanuts", "Penicillin"],
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
  },
  "aarav-patel": {
    name: "Aarav Patel",
    age: 9,
    dateOfBirth: "May 5, 2016",
    gender: "Male",
    guardianContact: "+91 98765 43214",
    location: "Room 3A",
    bloodGroup: "O-",
    allergies: ["None"],
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
  },
  "kavya-reddy": {
    name: "Kavya Reddy",
    age: 5,
    dateOfBirth: "September 12, 2020",
    gender: "Female",
    guardianContact: "+91 98765 43215",
    location: "Room 1A",
    bloodGroup: "A-",
    allergies: ["None"],
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
  },
};

const ChildProfile = () => {
  const { id } = useParams<{ id: string }>();
  const child = id ? mockChildData[id] : null;

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
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-2">
                {child.name}
              </h1>
              <p className="text-muted-foreground text-lg">
                Age {child.age} • {child.gender}
              </p>
            </div>
            {getHealthStatusBadge()}
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-6 py-8">
        {/* Health Alert Section */}
        {child.healthStatus !== "ok" && (
          <motion.section
            className="mb-6"
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
                    <h3 className="font-semibold text-lg mb-1">Health Alert</h3>
                    <p className="text-muted-foreground">{child.healthNotes}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.section>
        )}

        {/* Basic Information */}
        <motion.section
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-6 w-6 text-primary" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Date of Birth
                    </p>
                    <p className="font-medium">{child.dateOfBirth}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Heart className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Blood Group</p>
                    <p className="font-medium">{child.bloodGroup}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{child.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Guardian Contact
                    </p>
                    <p className="font-medium">{child.guardianContact}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Allergies</p>
                    <p className="font-medium">
                      {child.allergies.length > 0
                        ? child.allergies.join(", ")
                        : "None"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Vaccination Information */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Vaccines Due */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="shadow-card h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Syringe
                    className={`h-6 w-6 ${
                      child.vaccinesDue.length > 0
                        ? "text-secondary"
                        : "text-primary"
                    }`}
                  />
                  Vaccines Due
                </CardTitle>
              </CardHeader>
              <CardContent>
                {child.vaccinesDue.length > 0 ? (
                  <ul className="space-y-2">
                    {child.vaccinesDue.map((vaccine: string, index: number) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 p-3 rounded-lg bg-muted/50"
                      >
                        <AlertTriangle className="h-4 w-4 text-secondary" />
                        <span className="font-medium">{vaccine}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground text-center py-4">
                    ✅ All vaccinations up to date
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.section>

          {/* Vaccines Completed */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="shadow-card h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Syringe className="h-6 w-6 text-primary" />
                  Vaccines Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-h-[300px] overflow-y-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Vaccine</TableHead>
                        <TableHead>Date</TableHead>
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
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </motion.section>
        </div>

        {/* Recent Reports */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                Recent Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Report Type</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {child.recentReports.map((report: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{report.date}</TableCell>
                      <TableCell>{report.type}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            report.status === "Excellent" || report.status === "Normal"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {report.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {/* TODO: Later this will be backed by /api/child/:id/reports */}
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  );
};

export default ChildProfile;
