import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import {
  connectWithSocketServer,
  emitEvent,
  disconnectSocket,
  onEvent,
} from "@/lib/socketConnection";
import TextEditor from "@/components/TextEditor";
function Summary({
  control,
  register,
  getValues,
  handleFieldUpdate,
  watch,
  userData,
  setValue,
  errors,
}: any) {
  const initialContent = watch("profile");
  // const [generatedContent, setGeneratedContent] = useState("");
  const [loading, setLoading] = useState(false);
  const endLoading = () =>{
    setLoading(false)
  }
  const {
    credentials: {
      userData: { userID, profile },
    },
  } = userData;
  const userId = userID;
  const userProfile = {
    jobTitle: profile.jobTitle,
    yearsOfExperience: 5,
    jobListing: "",
  };

  const handleContentGeneration = () => {
    setLoading(true);
    emitEvent("generate_professional_summary", { ...userProfile });
  };

  const onEditorStateChange = (editorState: any) => {
    handleFieldUpdate("profile", editorState);
    setValue(`profile`, editorState);
  };
  return (
    <div className="mt-3">
      <h2 className="text-lg mb-2 text-slate-800 gap-1.5 flex flex-row items-center font-bold antialiased leading-tight tracking-tight">
        Professional summary
      </h2>
      {/* the rich text editor  */}
      <TextEditor
        onChange={onEditorStateChange}
        loading={loading}
        endLoading={endLoading}
        initialContent={initialContent}
        noAI={false}
        handleContentGeneration={handleContentGeneration}
        section="Summary"
      />
    </div>
  );
}

export default Summary;
