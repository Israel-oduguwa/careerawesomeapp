import React from "react";
import ResumePage from "@/ResumeBuilder/BuilderPage/ResumePage";
import { AuthWrapper } from "@/Authentication/AuthWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume Page",
  description: "Build your resume ",
};

function page() {
  // we need to handle the state from the redux
  return (
    <main>
      <AuthWrapper>
        <ResumePage />
      </AuthWrapper>
    </main>
  );
}

export default page;
