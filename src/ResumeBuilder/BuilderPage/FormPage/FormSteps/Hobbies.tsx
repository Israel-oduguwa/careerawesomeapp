import TextEditor from "@/components/TextEditor";
import { useState } from "react";
function Hobbies({
  control,
  register,
  getValues,
  handleFieldUpdate,
  watch,
  userData,
  setValue,
  errors,
}: any) {
  const initialContent = watch("hobbies");
  // const [generatedContent, setGeneratedContent] = useState("");
  const [loading, setLoading] = useState(false);
  const endLoading = () => {
    setLoading(false);
  };
  const handleContentGeneration = () => {
    // setLoading(true);
    // emitEvent("generate_professional_summary", { ...userProfile });
  };

  const onEditorStateChange = (editorState: any) => {
    setValue(`hobbies`, editorState);
    // handleFieldUpdate("hobbies", editorState);
   
  };
  return (
    <div className="mt-3">
      <h2 className="text-lg mb-2 text-slate-800 gap-1.5 flex flex-row items-center font-bold antialiased leading-tight tracking-tight">
        Hobbies
      </h2>
      {/* the rich text editor  */}
      <TextEditor
        onChange={onEditorStateChange}
        loading={loading}
        endLoading={endLoading}
        initialContent={initialContent}
        noAI={false}
        handleContentGeneration={handleContentGeneration}
        section="Hobbies"
      />
    </div>
  );
}

export default Hobbies;
