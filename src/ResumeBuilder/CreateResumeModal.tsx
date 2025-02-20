import * as React from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMediaQuery } from "usehooks-ts";

import axios from "axios";
import { useRouter } from "next/navigation";

export default function CreateResumeModal({ open, setOpen }: any) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[1024px]">
          <DialogHeader>
            <h1 className="text-2xl leading-6  text-slate-900  dark:text-slate-50 font-bold text-center tracking-tight antialiased">
              How do you want to start?
            </h1>
            <p className="text-slate-600   dark:text-slate-200  mt-0 text-center  antialiased">
              Make changes to your profile here. Click save when you're done.
            </p>
            {/* <DrawerTitle> How do you want to start</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription> */}
          </DialogHeader>
          <ResumeOptions />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="h-[81vh]  rounded-md border">
          <ResumeOptions className="px-4" />
        </ScrollArea>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ResumeOptions({ className }: React.ComponentProps<"form">) {
  const { push } = useRouter();
  const handleResumeChoice = (choice: string) => {
    // create the resume
    // alert(choice)
    createResume();
  };
  const createResume = async () => {
    const headers = {
      "Content-Type": "application/json",
      "secrete-api-key": `${process.env.DATE}`,
    };
    const formData = {
      currentStep: 0,
      completeForm: false,
      template: "basic",
      resumeName: "Ca Resume",
      style: {
        sectionStyles: {
          header: {
            headerFormat: "contentLeft",
            headerFontFamily: "Poppins",
            detailsMarker: "icon",
            detailsArrangement: "horizontal",
            nameSize: "large",
            jobTitleSize: "normal",
            photo: true,
          },
          heading: {
            headingStyle: "naked",
            capitalization: "uppercase",
            showSummaryHeading: true,
            showContactHeading: true,
            fontSize: "normal",
            icons: "none",
          },
          sectionsEntry: {
            layout: "content",
            subtitleStyle: "bold",
            titleSubtitleSize: "medium",
            subtitleOpacity: 90,
            descriptionIndentation: true,
            subtitlePlacement: "sameline",
          },
          profilephoto: {
            show: true,
            filters: "greyscale",
            size: "medium",
          },
          skillsStyle: {
            layout: "grid",
            level: false,
            chart: "bar",
            grid: "2-grid",
            text: "comma",
          },
          languageStyle: {
            layout: "text",
            level: false,
            chart: "dots",
            grid: "2-grid",
            text: "bullet",
          },
          interestStyle: {
            layout: "grid",
            grid: "2-grid",
            text: "bullet",
          },
          certificateStyle: {
            layout: "grid",
            grid: "2-grid",
            text: "bullet",
          },
        },
        font: {
          fontSize: 8.5,
          fontWeight: 400,
          fontFamily: "Poppins",
          fontStyle: "normal",
          fontVariant: "normal",
          fontStretch: "condensed",
        },
        color: {
          top: {
            text: "#3b4156",
            tone: "#002f64",
            background: "#ffffff",
          },
          bottom: {
            text: "#314552",
            tone: "#1642ff",
            background: "#ffffff",
          },
          left: {
            text: "#3c4d5d",
            tone: "#011640",
            background: "#ffffff",
          },
          right: {
            text: "#3d4d62",
            tone: "#04103d",
            background: "#ffffff",
          },
          text: "",
          accent: "#002a62",
          background: "",
          twoColor: true,
          secondaryColor: "#5089b4",
          colorSetting: "auto",
          backgroundImage: "",
        },
        spacing: {
          marginLeftRight: 18,
          paragraphSpacing: 24,
          marginTopBottom: 19.5,
          lineHeight: 20,
          letterSpacing: 2,
          paperPadding: 19,
          sectionMargin: 15,
        },
        advanced: {
          listStyle: "circle",
          linkIcon: "chain",
        },
        applyToneColor: {
          name: true,
          headings: true,
          dates: true,
          headerIcons: true,
          dotAndChips: true,
          linkIcons: true,
        },
      },
      file: {
        fileType: "pdf",
        pageformat: "215.9",
        paperOrientation: "portrait",
        dateFormat: "MMM, YYYY",
        addressFormat: "",
        fileQuality: "75",
      },
      sections: {
        isWork: false,
        isVolunteer: false,
        isActivities: false,
        isSkills: false,
        isLanguages: false,
        isCertificate: false,
        isContacts: true,
        isSummary: true,
        isCourses: false,
        isAwards: false,
        isAchievements: false,
        isReferences: false,
        isHobbies: false,
        isInterest: false,
        isCustom: false,
        isEducation: false,
        isProject: false,
        isPublication: false,
      },
      titles: {
        work: "Work Experience",
        volunteer: "Volunteer Work",
        activities: "Extra Curricular Activities",
        education: "Education",
        projects: "Project",
        publications: "Publications",
        skills: "Soft Skills",
        languages: "Languages",
        certificate: "Certificate",
        courses: "Courses",
        contacts: "Contacts",
        summary: "Professional Summary",
        awards: "Awards",
        achievements: "achievements",
        references: "References",
        hobbies: "Hobbies",
        interest: "interests",
      },
      BasicDetails: {
        social: [],
      },
      Work: {
        work: [],
        volunteer: [],
        activities: [],
      },
      Education: {
        education: [],
        projects: [],
        publication: [],
      },
      Skills: {
        skills: [],
        languages: [],
        certificate: [],
        courses: [],
      },
      Awards: {
        award: [],
        achievements: [],
      },
      Extras: {
        references: [],
        hobbies: [],
        interest: "",
        custom: [],
      },
    };
    const templates = {
      fort: {
        layout: [
          [
            "work",
            "education",
            "skills",
            "volunteer",
            "publications",
            "awards",
            "activities",
            "interests",
            "achievements",
            "references",
            "projects",
            "courses",
            "languages",
            "hobbies",
          ],
        ],
        styles: {
          designPattern: "TopBottom",
          backgroundFill: "bottom",
          Background: "#fffff",
          twoColorTemplate: false,
          grid: false,
          right: 70,
          left: 30,
        },
      },
      elegant: {
        layout: [
          [
            "work",
            "education",
            "skills",
            "volunteer",
            "publications",
            "activities",
            "interests",
            "awards",
            "achievements",
            "certificate",
            "references",
            "projects",
            "courses",
            "languages",
            "hobbies",
          ],
        ],
        styles: {
          designPattern: "TopBottom",
          backgroundFill: "bottom",
          twoColorTemplate: false,
          Background: "#fffff",
          grid: false,
          right: 70,
          left: 30,
        },
      },
      simple: {
        layout: [
          [
            "work",
            "education",
            "skills",
            "volunteer",
            "publications",
            "activities",
            "awards",
            "interests",
            "achievements",
            "references",
            "certificate",
            "projects",
            "courses",
            "languages",
            "hobbies",
          ],
        ],
        styles: {
          designPattern: "TopBottom",
          backgroundFill: "bottom",
          Background: "#fffff",
          twoColorTemplate: false,
          grid: false,
          right: 70,
          left: 30,
        },
      },
      dazzling: {
        layout: [
          [
            "work",
            "education",
            "skills",
            "volunteer",
            "publications",
            "awards",
            "interests",
            "activities",
            "achievements",
            "certificate",
            "references",
            "projects",
            "courses",
            "languages",
            "hobbies",
          ],
        ],
        styles: {
          designPattern: "TopBottom",
          backgroundFill: "bottom",
          twoColorTemplate: false,
          Background: "#fffff",
          grid: false,
          right: 70,
          left: 30,
        },
      },
      maine: {
        layout: [
          [
            "work",
            "education",
            "skills",
            "languages",
            "volunteer",
            "publications",
            "awards",
            "achievements",
            "interests",
            "references",
            "activities",
            "certificate",
            "projects",
            "courses",
            "hobbies",
          ],
        ],
        styles: {
          designPattern: "TopBottom",
          backgroundFill: "bottom",
          Background: "#fffff",
          twoColorTemplate: false,
          grid: false,
          right: 70,
          left: 30,
        },
      },
      basic: {
        layout: [
          [
            "work",
            "education",
            "skills",
            "languages",
            "certificate",
            "volunteer",
            "interests",
            "publications",
            "awards",
            "activities",
            "achievements",
            "references",
            "projects",
            "courses",
            "hobbies",
          ],
        ],
        styles: {
          designPattern: "TopBottom",
          backgroundFill: "none",
          twoColorTemplate: false,
          Background: "#fffff",
          grid: false,
          right: 70,
          left: 30,
        },
      },
      flexCorporate: {
        layout: [
          [
            "work",

            "volunteer",
            "publications",
            "certificate",
            "activities",
            "awards",
            "achievements",
            "references",
          ],
          [
            "education",
            "projects",
            "skills",
            "interests",
            "courses",
            "languages",
            "hobbies",
          ],
        ],
        styles: {
          designPattern: "TopBottom",
          backgroundFill: "bottom",
          Background: "#fffff",
          twoColorTemplate: false,
          grid: true,
          right: 70,
          left: 30,
        },
      },
      frontier: {
        layout: [
          [
            "skills",
            "languages",
            "projects",
            "certificate",
            "references",
            "courses",
            "hobbies",
          ],
          [
            "awards",
            "work",
            "interests",
            "activities",
            "education",
            "achievements",
            "publications",
            "volunteer",
          ],
        ],
        styles: {
          designPattern: "leftRight",
          backgroundFill: "left",
          Background: "#fffff",
          twoColorTemplate: false,
          grid: true,
          right: 70,
          left: 30,
        },
      },
      modrate: {
        layout: [
          [
            "skills",
            "languages",
            "projects",
            "references",
            "courses",
            "hobbies",
          ],
          [
            "awards",
            "work",
            "interests",
            "activities",
            "certificate",
            "education",
            "achievements",
            "publications",
            "volunteer",
          ],
        ],
        styles: {
          designPattern: "leftRight",
          backgroundFill: "none",
          Background: "#fffff",
          twoColorTemplate: false,
          grid: true,
          right: 70,
          left: 30,
        },
      },
      stationary: {
        layout: [
          [
            "skills",
            "languages",
            "projects",
            "activities",
            "certificate",
            "references",
            "courses",
            "hobbies",
          ],
          [
            "awards",
            "interests",
            "work",
            "education",
            "achievements",
            "publications",
            "volunteer",
          ],
        ],
        styles: {
          designPattern: "leftRight",
          backgroundFill: "leftLow",
          Background: "#fffff",
          twoColorTemplate: false,
          grid: true,
          right: 70,
          left: 30,
        },
      },

      modish: {
        layout: [
          [
            "work",
            "volunteer",
            "publications",
            "awards",
            "achievements",
            "activities",
            "references",
          ],
          [
            "education",
            "skills",
            "interests",
            "projects",
            "courses",
            "languages",
            "hobbies",
          ],
        ],
        styles: {
          designPattern: "TopBottom",
          backgroundFill: "bottom",
          twoColorTemplate: false,
          Background: "#fffff",
          grid: true,
          right: 30,
          left: 70,
        },
      },
      chill: {
        layout: [
          ["education", "awards", "achievements", "languages", "hobbies"],
          [
            "work",
            "skills",
            "interests",
            "projects",
            "activities",
            "courses",
            "volunteer",
            "publications",
            "references",
          ],
        ],
        styles: {
          designPattern: "leftRight",
          backgroundFill: "left",
          twoColorTemplate: false,
          Background: "#fffff",
          grid: true,
          right: 70,
          left: 30,
        },
      },
      couth: {
        layout: [
          [
            "work",
            "education",
            "projects",
            "courses",
            "awards",
            "achievements",
            "publications",
            "references",
          ],
          ["skills", "activities", "languages", "volunteer", "hobbies"],
        ],
        styles: {
          designPattern: "leftRight",
          backgroundFill: "none",
          twoColorTemplate: false,
          Background: "#fffff",
          grid: true,
          right: 30,
          left: 70,
        },
      },
      tech: {
        layout: [
          [
            "work",
            "education",
            "projects",
            "courses",
            "awards",
            "achievements",
            "publications",
            "references",
          ],
          ["skills", "languages", "interests", "volunteer", "hobbies"],
        ],
        styles: {
          designPattern: "leftRight",
          backgroundFill: "right",
          twoColorTemplate: false,
          Background: "#fffff",
          grid: true,
          right: 30,
          left: 70,
        },
      },
      joint: {
        layout: [
          [
            "work",
            "education",
            "projects",
            "courses",
            "awards",
            "achievements",
            "publications",
            "activities",
            "references",
          ],
          ["interests", "skills", "languages", "volunteer", "hobbies"],
        ],
        styles: {
          designPattern: "leftRight",
          backgroundFill: "right",
          twoColorTemplate: false,
          Background: "#fffff",
          grid: true,
          right: 50,
          left: 50,
        },
      },
      inspired: {
        layout: [
          [
            "work",
            "education",
            "projects",
            "courses",
            "awards",
            "achievements",
            "publications",
            "references",
          ],
          ["skills", "languages", "volunteer", "activities", "hobbies"],
        ],
        styles: {
          designPattern: "TopBottom",
          backgroundFill: "top",
          Background: "#fffff",
          twoColorTemplate: true,
          grid: true,
          right: 40,
          left: 60,
        },
      },
      surround: {
        layout: [
          [
            "work",
            "education",
            "certificate",
            "projects",
            "courses",
            "awards",
            "achievements",
            "activities",
            "publications",
            "references",
          ],
          ["skills", "languages", "volunteer", "interests", "hobbies"],
        ],
        styles: {
          designPattern: "TopBottom",
          backgroundFill: "top",
          Background: "#fffff",
          twoColorTemplate: false,
          grid: true,
          right: 30,
          left: 70,
        },
      },
      executive: {
        layout: [
          [
            "skills",
            "education",
            "languages",
            "volunteer",
            "interests",
            "hobbies",
          ],
          [
            "work",
            "certificate",
            "projects",
            "courses",
            "awards",
            "achievements",
            "activities",
            "publications",
            "references",
          ],
        ],
        styles: {
          designPattern: "TopBottom",
          backgroundFill: "top",
          Background: "#fffff",
          twoColorTemplate: false,
          grid: true,
          right: 70,
          left: 30,
        },
      },
      business: {
        layout: [
          [
            "skills",
            "education",
            "languages",
            "volunteer",
            "interests",
            "hobbies",
          ],
          [
            "work",
            "certificate",
            "projects",
            "courses",
            "awards",
            "achievements",
            "activities",
            "publications",
            "references",
          ],
        ],
        styles: {
          designPattern: "TopBottom",
          backgroundFill: "top",
          Background: "#fffff",
          twoColorTemplate: false,
          grid: true,
          right: 70,
          left: 30,
        },
      },
      pave: {
        layout: [
          [
            "work",
            "education",
            "certificate",
            "courses",
            "awards",
            "achievements",
            "activities",
            "publications",
            "references",
          ],
          [
            "skills",
            "languages",
            "projects",
            "volunteer",
            "interests",
            "hobbies",
          ],
        ],
        styles: {
          designPattern: "leftRight",
          backgroundFill: "right",
          Background: "#fffff",
          twoColorTemplate: false,
          grid: true,
          right: 30,
          left: 70,
        },
      },
      elastic: {
        layout: [
          [
            "work",
            "education",
            "certificate",
            "courses",
            "awards",
            "achievements",
            "activities",
            "publications",
            "references",
          ],
          [
            "skills",
            "languages",
            "projects",
            "volunteer",
            "interests",
            "hobbies",
          ],
        ],
        styles: {
          designPattern: "leftRight",
          backgroundFill: "right",
          Background: "#fffff",
          twoColorTemplate: true,
          grid: true,
          right: 30,
          left: 70,
        },
      },
      chander: {
        layout: [
          [
            "education",
            "skills",
            "languages",
            "projects",
            "volunteer",
            "interests",
            "hobbies",
          ],
          [
            "work",
            "certificate",
            "awards",
            "courses",
            "achievements",
            "activities",
            "publications",
            "references",
          ],
        ],
        styles: {
          designPattern: "TopBottom",
          backgroundFill: "top",
          Background: "#fffff",
          twoColorTemplate: false,
          grid: true,
          right: 70,
          left: 30,
        },
      },
      designer: {
        layout: [
          [
            "work",
            "certificate",
            "awards",
            "courses",
            "achievements",
            "activities",
            "publications",
            "references",
          ],
          [
            "education",
            "skills",
            "languages",
            "projects",
            "volunteer",
            "interests",
            "hobbies",
          ],
        ],
        styles: {
          designPattern: "TopBottom",
          backgroundFill: "top",
          Background: "#fffff",
          twoColorTemplate: false,
          grid: true,
          right: 30,
          left: 70,
        },
      },
      chiang: {
        layout: [
          [
            "work",
            "volunteer",
            "publications",
            "awards",
            "achievements",
            "references",
            "courses",
          ],
          [
            "skills",
            "activities",
            "education",
            "projects",
            "interests",
            "languages",
            "hobbies",
          ],
        ],
        styles: {
          designPattern: "TopBottom",
          backgroundFill: "bottom",
          Background: "#fffff",
          twoColorTemplate: false,
          grid: true,
          right: 30,
          left: 70,
        },
      },
    };
    try {
      const data = {
        formData,
        templates,
      };
      const create = await axios.post(
        "https://api.careerawesome.com/api/resume/create_resume",
        data,
        {
          headers,
        }
      );
      console.log(create?.data);
      if (create.data?.resumePost?._id) {
        // we push the user to the resume dashboard for resume choosing
        push(`/resume/build/${create.data.resumePost._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-12 pt-8  bootstrap-wrapper ">
      <div className="row">
        <div className="col-md-4 ">
          <div
            onClick={() => handleResumeChoice("new")}
            className="p-8 flex flex-col mt-4 items-center cursor-pointer  bg-zinc-50 hover:shadow-lg border-slate-100 border rounded-lg"
          >
            <div>
              <img
                style={{ width: "100px" }}
                src="https://static.vecteezy.com/system/resources/previews/006/563/742/large_2x/create-new-file-document-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
                alt="crate_new-image"
              />
            </div>
            <div>
              <p className="text-lg text-gray-950 font-bold  mb-1 text-center hover:text-primary antialiased">
                Create New Resume
              </p>
              <p className="text-slate-500 dark:text-slate-200 mt-2  text-center  antialiased">
                Write your resume from scratching choosing a template from one
                of our best template
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-8 flex flex-col mt-4 items-center cursor-pointer  bg-zinc-50 hover:shadow-lg border-slate-100 border rounded-lg">
            <div>
              <img
                style={{ width: "100px" }}
                src="https://static.vecteezy.com/system/resources/previews/022/361/216/large_2x/3d-email-mail-message-envelope-png.png"
                alt="crate_new-image"
              />
            </div>
            <div>
              <p className="text-lg text-gray-950 font-bold  mb-1 text-center antialiased">
                Upload Your resume
              </p>
              <p className="text-slate-500 dark:text-slate-200 mt-2  text-center  antialiased">
                Write your resume from scratching choosing a template from one
                of our best template
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-8 flex flex-col mt-4 items-center cursor-pointer  bg-zinc-50 hover:shadow-lg border-slate-100 border rounded-lg ">
            <div>
              <img
                style={{ width: "100px" }}
                src="https://static.vecteezy.com/system/resources/previews/018/930/587/large_2x/linkedin-logo-linkedin-icon-transparent-free-png.png"
                alt="crate_new-image"
              />
            </div>
            <div>
              <p className="text-lg text-gray-900 font-bold  mb-1 text-center antialiased">
                Import from LinkedIn
              </p>
              <p className="text-slate-500 dark:text-slate-200 mt-2  text-center  antialiased">
                Import your resume from your linkedin profile and edit it, we
                will craft it for you, to find your job
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
