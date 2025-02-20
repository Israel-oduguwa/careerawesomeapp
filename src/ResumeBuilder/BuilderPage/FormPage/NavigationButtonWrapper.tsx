import React from "react";

function NavigationButtonWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 sticky bottom-0 top-auto border-t border-gray-300 bg-white">
      <div className="w-full lg:max-w-[650px] lg:mx-auto">{children}</div>
    </div>
  );
}

export default NavigationButtonWrapper;
