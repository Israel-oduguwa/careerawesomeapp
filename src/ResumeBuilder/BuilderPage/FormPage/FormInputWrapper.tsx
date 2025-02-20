import React from "react";

function FormInputWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[calc(100vh-131px)] xs:h-auto  w-full box-border">
      <div className="EditScroll xs:h-full md:h-[calc(100%-0px)] overflow-auto ">
        <div className="mt-5 px-6">{children}</div>
      </div>
    </div>
  );
}

export default FormInputWrapper;
