import React from "react";
import { Button } from "@/components/ui/button";
function ResumeSection() {
  return (
    <div
      style={{ minHeight: "51vh" }}
      className="items-center mt-10 flex justify-center min-h-80 rounded-lg border border-dashed shadow-sm"
    >
      <div
        style={{ maxWidth: "500px" }}
        className="flex p-4 flex-col items-center gap-1 text-center "
      >
        <img
          style={{ width: "150px" }}
          src="https://resume.io/assets/media/no-resumescc3038a00bb400debef6.png"
        />
        <h2 className="text-xl text-slate-900 dark:text-white font-bold mt-1 antialiased ">
          Launch Your Journey with a Powerful Resume
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm  antialiased">
          Craft a standout resume that opens doors to endless opportunities and
          join thousands who have already landed their dream job!
        </p>
        <Button className="mt-4">Add Resume</Button>
      </div>
    </div>
  );
}

export default ResumeSection;
