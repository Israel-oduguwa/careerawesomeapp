// components/EditorLayout.tsx
import React from "react";
import NavigationBar from "./NavigationBar";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import CenterBoard from "./CenterBoard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageBreakTest from "./ResumePreview/PageBreakTest";

export default function EditorLayout() {
  return (
    <div className="h-screen flex flex-col dark:bg-gray-900">
      <NavigationBar />
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop view */}
        <div className="hidden md:flex flex-row w-full">
          <LeftSidebar />
          {/* <PageBreakTest/> */}
          <CenterBoard />
          <RightSidebar />
        </div>

        {/* Mobile view */}
        <div className="md:hidden w-full">
          <Tabs defaultValue="resume">
            <TabsList className="flex justify-around">
              <TabsTrigger value="resume">Resume</TabsTrigger>
              <TabsTrigger value="left-sidebar">Left Sidebar</TabsTrigger>
              <TabsTrigger value="right-sidebar">Right Sidebar</TabsTrigger>
            </TabsList>
            <TabsContent value="resume">
              {/* <CenterBoard /> */}
            </TabsContent>
            <TabsContent value="left-sidebar">
              <LeftSidebar />
            </TabsContent>
            <TabsContent value="right-sidebar">
              <RightSidebar />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
