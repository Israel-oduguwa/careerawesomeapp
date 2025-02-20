import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppSelector } from "@/lib/hooks";
import {
  selectResumeData
} from "@/lib/redux/features/ResumeStates/resumeSlice";
import { CircleUser } from "lucide-react";
import Link from "next/link";
import React from "react";

const Stepper = () => {
  const resumeState = useAppSelector(selectResumeData);
  const {
    present: {
      resumeData: { formData },
    },
  } = resumeState;
  const currentStep = formData.currentStep;
  const steps = [
    "Contacts",
    "Experience",
    "Education",
    "Skills & Qualifications",
    "Awards",
    "Extras",
  ];

  return (
    <ul className="relative flex w-full flex-row gap-x-2">
      {steps.map((step, index) => (
        <li
          key={index}
          className="flex items-center gap-x-2 shrink basis-0 flex-1 group"
        >
          <div className="min-w-7 min-h-7 inline-flex justify-center items-center text-xs align-middle">
            <span
              className={`size-7 flex justify-center items-center flex-shrink-0 font-medium text-white rounded-full ${
                currentStep === index
                  ? "bg-blue-800 dark:bg-blue-500"
                  : "bg-gray-200 dark:bg-gray-600"
              }`}
            >
              {index + 1}
            </span>
            <span className="ms-2 block text-sm font-medium text-gray-800 dark:text-white">
              {step}
            </span>
          </div>
          <div className="w-full h-px flex-1 bg-gray-200 group-last:hidden dark:bg-neutral-700"></div>
        </li>
      ))}
    </ul>
  );
};

function FormLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 mr-10 text-lg font-semibold md:text-base"
          >
            <img
              style={{ width: "200px" }}
              src="https://firebasestorage.googleapis.com/v0/b/career-awesome-ac470.appspot.com/o/Group%201.svg?alt=media&token=fd95fc79-051b-421b-a36d-8b15b666899e"
              alt="company-logo"
            />
            {/* <Package2 className="h-6 w-6" /> */}
            {/* <span className="sr-only">Acme Inc</span> */}
          </Link>
        </nav>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div className="ml-auto flex-1 sm:flex-initial">
            <Stepper />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main>
        <div className="bootstrap-wrapper">
          <div className="row p-0 m-0">
            <div className="col-7 p-0 m-0">
              <div>
                <div>{children}</div>
              </div>
            </div>
            <div className="col-5 p-0 m-0">
              {/* for the second column  */} tutorial and dictionary section
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default FormLayout;
