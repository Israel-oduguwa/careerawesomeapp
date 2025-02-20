"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  setResumeData,
  selectResumeData,
} from "@/lib/redux/features/ResumeStates/resumeSlice";
import { selectUserData } from "@/lib/redux/features/UserAuthentication/authenticationSlice";
import BasicDetails from "./FormPage/BasicDetails";
import Work from "./FormPage/Work";
import Skills from "./FormPage/Skills";
import Award from "./FormPage/Award";
import Education from "./FormPage/Education";
import Extra from "./FormPage/Extra";
import ResumeEditor from "./EditorPage/ResumeEditor";
// this the main page, where the logic will be for the resume builder
function ResumePage() {
  const dispatch = useAppDispatch();
  const resumeState = useAppSelector(selectResumeData);
  const userData = useAppSelector(selectUserData);
  const [loading, setPageLoading] = useState(true);

  const params = useParams<{
    id: any;
    tag: string;
    item: string;
  }>();
  const headers = {
    "Content-Type": "application/json",
    "secrete-api-key": `${process.env.DATE}`,
  };

  const fetchResume = async () => {
    try {
      const response = await axios.get(
        `https://api.careerawesome.com/api/resume/get_resume?resumeId=${params.id}`,
        {
          headers,
        }
      );
      if (response?.data) {
        console.log(response?.data);
        const { resume } = response?.data;
        dispatch(setResumeData(resume));
        console.log("resume", resume);
        setPageLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setPageLoading(true);
    const getResume = async () => {
      fetchResume();
    };
    getResume();
  }, []);

  // console.log(resumeState);
  //   console.log(userData)

  // so we check if the use have subscribe to a plan  if true
  // check if the status is loading
  if (!loading) {
    // let's destructure the data from the state
    const {
      present: {
        resumeData: { formData },
      },
    } = resumeState;
    // console.log(formData);
    switch (formData.currentStep) {
      case 0:
        return <BasicDetails resumeID={params.id} formData={formData} />;
      case 1:
        return <Work resumeID={params.id} formData={formData} />;
      case 2:
        return <Education resumeID={params.id} formData={formData} />;
      case 3:
        return <Skills resumeID={params.id} formData={formData} />;
      case 4:
        return <Award resumeID={params.id} formData={formData} />;
      case 5:
        return <Extra resumeID={params.id} formData={formData} />;
      case 6:
        return <ResumeEditor resumeID={params.id} formData={formData} />;
      default:
        return <button>Previous</button>;
    }
  } else {
    return (
      <div className="text-center flex flex-col justify-center items-center top-0 m-width[400px] relative">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150">
          <path
            fill="none"
            stroke="#FF156D"
            stroke-width="23"
            stroke-linecap="round"
            stroke-dasharray="300 385"
            stroke-dashoffset="0"
            d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"
          >
            <animate
              attributeName="stroke-dashoffset"
              calcMode="spline"
              dur="2"
              values="685;-685"
              keySplines="0 0 1 1"
              repeatCount="indefinite"
            ></animate>
          </path>
        </svg>
      </div>
    );
  }
}

export default ResumePage;
