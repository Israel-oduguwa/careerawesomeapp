import React from "react";
import { Button } from "@/components/ui/button";

function CoverLetterSection() {
  return (
    <div
      style={{ minHeight: "51vh" }}
      className="items-center mt-10 flex justify-center min-h-80 rounded-lg border border-dashed shadow-sm"
    >
      <div
        style={{ maxWidth: "500px" }}
        className="flex p-4 flex-col items-center gap-1 text-center "
      >
        {/* make the immage an animated image  */}
        <img
          style={{ width: "150px" }}
          src="https://resume.io/assets/media/no-letters3b3449f1e4c0ebcdc6fe.png"
        />
        <h2 className="text-xl text-slate-900 dark:text-white font-bold mt-1 antialiased ">
          Cover Letter That Leave a Lasting Impression!
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm  antialiased">
          Draft Engaging Cover Letters That Make Your Resume Shine!
        </p>
        <Button className="mt-4">Add Cover letter</Button>
      </div>
    </div>
  );
}

export default CoverLetterSection;
