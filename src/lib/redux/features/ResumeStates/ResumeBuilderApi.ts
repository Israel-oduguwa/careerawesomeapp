import axios, { AxiosRequestConfig } from "axios";
import { debounce } from "@/lib/utils";

const headers: AxiosRequestConfig["headers"] = {
  "Content-Type": "application/json",
  "secrete-api-key": `${process.env.DATE}`,
};

// Debounced function to update the resume in the database
export const updateResumeDatabase = debounce(
  async (resumeId: string, path: string, value: any) => {
    try {
      const response = await axios.post(
        `https://api.careerawesome.com/api/resume/update_resume/${resumeId}`,
        {
          sectionPath: path,
          sectionData: value,
        },
        { headers }
      );
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error("Error occurred while updating the resume:", error);
      throw error;
    }
  },
  10
);

export const updateResume = async (payload: any) => {
  return updateResumeDatabase(payload._id, payload.path, payload.value);
};
export const updateBasic = async (payload: any) => {
  return updateResumeDatabase(
    payload._id,
    "resumeData.formData.BasicDetails",
    payload.value
  );
};

export const updateWork = async (payload: any) => {
  return updateResumeDatabase(
    payload._id,
    "resumeData.formData.Work",
    payload.value
  );
};

export const updateEducation = async (payload: any) => {
  return updateResumeDatabase(
    payload._id,
    "resumeData.formData.Education",
    payload.value
  );
};

export const updateSkills = async (payload: any) => {
  return updateResumeDatabase(
    payload._id,
    "resumeData.formData.Skills",
    payload.value
  );
};

export const updateAwards = async (payload: any) => {
  return updateResumeDatabase(
    payload._id,
    "resumeData.formData.Awards",
    payload.value
  );
};

export const updateExtras = async (payload: any) => {
  return updateResumeDatabase(
    payload._id,
    "resumeData.formData.Extras",
    payload.value
  );
};

export const updateStep = async (payload: any) => {
  console.log(payload)
  return updateResumeDatabase(
    payload._id,
    "resumeData.formData.currentStep",
    payload.value
  );
};
