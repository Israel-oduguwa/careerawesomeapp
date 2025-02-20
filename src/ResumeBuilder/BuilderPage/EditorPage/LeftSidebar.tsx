import React from "react";

function LeftSidebar() {
  return (
    <div className="w-[25%] p-4 bg-gray-100 dark:bg-gray-900 h-full overflow-y-auto">
      {/* Add your sidebar content here */}
      <p className="text-white">Left Sidebar</p>
      <p className="text-white">Scrollable Content</p>
      <p className="text-white">...</p>
    </div>
  );
}

export default LeftSidebar;
