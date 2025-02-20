import React from "react";
import ResumePreview from "./ResumePreview/Index";
import PageBreakTest from "./ResumePreview/PageBreakTest";

function CenterBoard() {
  return (
    <div className="flex-1 p-4 bg-gray-200 dark:bg-gray-800 h-full overflow-y-auto">
      {/* Add your resume preview content here */}
     {/* <ResumePreview/> */}
     <PageBreakTest/>
     
    </div>
  );
}

export default CenterBoard;
