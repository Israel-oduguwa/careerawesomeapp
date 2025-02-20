import TextEditor from "@/components/TextEditor";
import { useState } from "react";
function Interest({
  control,
  register,
  getValues,
  handleFieldUpdate,
  watch,
  userData,
  setValue,
  errors,
}: any) {
  const initialContent = watch("interest");
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
    setValue(`interest`, editorState);
    handleFieldUpdate("interest", editorState);
    
  };
  return (
    <div className="mt-3">
      <h2 className="text-lg mb-2 text-slate-800 gap-1.5 flex flex-row items-center font-bold antialiased leading-tight tracking-tight">
        Interest
      </h2>
      {/* the rich text editor  */}
      <TextEditor
        onChange={onEditorStateChange}
        loading={loading}
        endLoading={endLoading}
        initialContent={initialContent}
        noAI={false}
        handleContentGeneration={handleContentGeneration}
        section="Interest"
      />
    </div>
  );
}

export default Interest;
