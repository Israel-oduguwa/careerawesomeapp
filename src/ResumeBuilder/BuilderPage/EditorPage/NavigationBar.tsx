// components/NavigationBar.tsx
import React from "react";
import { Sun, Moon } from "lucide-react";
import { ModeToggle } from "@/components/darkmode"
const NavigationBar = () => {
  return (
    <nav className="w-full p-4 bg-white dark:bg-gray-800 shadow-md flex justify-between items-center">
      <div className="text-xl font-bold">Resume Editor</div>
      <div className="flex items-center">
        {/* <button className="ml-4">
          <Sun className="dark:hidden" />
          <Moon className="hidden dark:block" />
        </button> */}
        <ModeToggle/>
      </div>
    </nav>
  );
};

export default NavigationBar;
