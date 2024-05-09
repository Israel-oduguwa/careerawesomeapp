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
    <Tabs defaultValue="resume" className="w-full">
      <TabsList className="grid w-full grid-cols-4 gap-3 h-[inherit]  dark:bg-slate-800">
        <TabsTrigger
          className={`font-bold py-3  rounded-lg ${
            selectedTab === "resume"
              ? "dark:bg-white dark:text-slate-900 "
              : "dark:text-white text-slate-900"
          }`}
          value="resume"
          selected={selectedTab === "resume"}
          onClick={() => setSelectedTab("resume")}
        >
          Resume
        </TabsTrigger>
        <TabsTrigger
          className={`font-bold py-3 rounded-lg ${
            selectedTab === "cover_letter"
              ? "dark:bg-white dark:text-slate-900 "
              : "dark:text-white  text-slate-900"
          }`}
          value="cover_letter"
          selected={selectedTab === "cover_letter"}
          onClick={() => setSelectedTab("cover_letter")}
        >
          Cover Letter
        </TabsTrigger>
      </TabsList>
      <TabsContent value="resume">
        <ResumeSection />
      </TabsContent>
      <TabsContent value="cover_letter">
        <CoverLetterSection />
      </TabsContent>
    </Tabs>
  );
}
