import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResumeSection from "./ResumeSection";
import CoverLetterSection from "./CoverLetterSection";
import { useState } from "react";

export default function DocumentsSection() {
  const [selectedTab, setSelectedTab] = useState("resume");
  return (
    <ResumeSection />
  );
}
