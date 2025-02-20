import { createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { clone, get, setWith } from "lodash";
import { createAppSlice } from "../../createAppSlice";
import {
  updateAwards,
  updateBasic,
  updateEducation,
  updateExtras,
  updateResume,
  updateSkills,
  updateStep,
  updateWork,
} from "./ResumeBuilderApi";
import initialData from "./initialData.json";

export interface ResumeState {
  loading: boolean;
  past: any[];
  present: any;
  future: any[];
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: ResumeState = {
  loading: true,
  past: [],
  present: initialData,
  future: [],
  status: "idle",
  error: null,
};

export const updateResumeSection = createAsyncThunk(
  "resume/updateSection",
  async ({ section, data }: { section: string; data: any }) => {
    switch (section) {
      case "BasicDetails":
        await updateBasic(data);
        break;
      case "Work":
        await updateWork(data);
        break;
      case "Education":
        await updateEducation(data);
        break;
      case "Skills":
        await updateSkills(data);
        break;
      case "Awards":
        await updateAwards(data);
        break;
      case "Extras":
        await updateExtras(data);
        break;
      default:
        throw new Error(`Unknown section: ${section}`);
    }
  }
);

// this function updates the resume data online
export const updateResumeOnline = createAsyncThunk(
  "resume/updateDatabase",
  async (data: any) => {
    await updateResume(data);
  }
);
export const updateCurrentStep = createAsyncThunk(
  "resume/updateStep",
  async (data: any) => {
    await updateStep(data);
  }
);

const updateState = (state: any, newState: any) => {
  const { past, present } = state;
  return {
    past: [...past, present],
    present: newState,
    future: [],
  };
};

export const resumeSlice = createAppSlice({
  name: "resume",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    undo: (state) => {
      if (state.past.length === 0) return;
      const previous = state.past[state.past.length - 1];
      state.past = state.past.slice(0, state.past.length - 1);
      state.future = [state.present, ...state.future];
      state.present = previous;
    },
    redo: (state) => {
      if (state.future.length === 0) return;
      const next = state.future[0];
      state.future = state.future.slice(1);
      state.past = [...state.past, state.present];
      state.present = next;
    },
    setResumeData: (state, action: PayloadAction<any>) => {
      state.present = setWith(
        clone(state.present),
        "resumeData.formData",
        action.payload.resumeData.formData,
        clone
      );
      state.present = setWith(
        state.present,
        "resumeData.templates",
        action.payload.resumeData.templates,
        clone
      );
      state.present = setWith(
        state.present,
        "resumeData._id",
        action.payload._id,
        clone
      );
      state.present = setWith(
        state.present,
        "resumeData.createdAt",
        action.payload.createdAt,
        clone
      );
      updateState(state, state.present);
    },
    onResumeInput: (
      state,
      action: PayloadAction<{ path: string; value: any }>
    ) => {
      if (!action.payload.path || action.payload.value === undefined) {
        console.error("Missing path or value in payload for ON_RESUME_INPUT");
        return;
      }
      state.present = setWith(
        clone(state.present),
        action.payload.path,
        action.payload.value,
        clone
      );
      updateState(state, state.present);
    },
    nextStep: (state) => {
      const nextStep =
        get(state.present, "resumeData.formData.currentStep") + 1;
      state.present = setWith(
        clone(state.present),
        "resumeData.formData.currentStep",
        nextStep,
        clone
      );
      const FormData = get(state.present, "resumeData.formData");
      localStorage.setItem("FormData", JSON.stringify(FormData));
    },
    previousStep: (state) => {
      const step = get(state.present, "resumeData.formData.currentStep");
      if (typeof step !== "number") {
        console.error("Step is not a number, can't decrement");
        return;
      }
      const decrease = step - 1;
      state.present = setWith(
        clone(state.present),
        "resumeData.formData.currentStep",
        decrease,
        clone
      );
      const FormData = get(state.present, "resumeData.formData");
      localStorage.setItem("FormData", JSON.stringify(FormData));
    },
    goToStep: (state, action: PayloadAction<number>) => {
      state.present = setWith(
        clone(state.present),
        "resumeData.formData.currentStep",
        action.payload,
        clone
      );
      const FormData = get(state.present, "resumeData.formData");
      localStorage.setItem("FormData", JSON.stringify(FormData));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateResumeSection.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateResumeSection.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(updateResumeSection.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to update section";
      })
      .addCase(updateCurrentStep.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCurrentStep.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(updateCurrentStep.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to update step";
      });
  },
  selectors: {
    selectResumeData: (state) => state,
  },
});

export const {
  clearError,
  undo,
  redo,
  setResumeData,
  onResumeInput,
  nextStep,
  previousStep,
  goToStep,
} = resumeSlice.actions;

export const { selectResumeData } = resumeSlice.selectors;
