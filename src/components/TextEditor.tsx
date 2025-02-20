import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  type Editor,
  useEditor,
  EditorContent,
  FloatingMenu,
} from "@tiptap/react";
import {
  Bold,
  Strikethrough,
  Italic,
  UnderlineIcon,
  UndoIcon,
  RedoIcon,
  AlignCenter,
  ListIcon,
  ListOrderedIcon,
  AlignLeft,
  AlignRight,
  LinkIcon,
} from "lucide-react";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { Loader2 } from "lucide-react";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import CharacterCount from "@tiptap/extension-character-count";
import { Toggle } from "./ui/toggle";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";
import {
  connectWithSocketServer,
  disconnectSocket,
  onEvent,
} from "@/lib/socketConnection";

type Props = {
  editor: Editor | null;
  headingNeeded: boolean | null;
  loading: boolean;
  section: string;
  noAI: boolean;
  handleContentGeneration: any;
};

const GradientWandIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-wand-sparkles"
  >
    <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72" />
    <path d="m14 7 3 3" />
    <path d="M5 6v4" />
    <path d="M19 14v4" />
    <path d="M10 2v2" />
    <path d="M7 8H3" />
    <path d="M21 16h-4" />
    <path d="M11 3H9" />
  </svg>
);

const WordCountAndRanking = ({ editor }: Props) => {
  if (!editor) {
    return null;
  }
  // this ranks the content if it is good or not
  const limit = 100000;
  const percentage = (editor.storage.characterCount.characters() / limit) * 100;
  const buttonClass = `
  p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center justify-center
  active:bg-gray-300 dark:active:bg-gray-600
`;
  return (
    <div
      className={`flex items-center gap-1 character-count ${
        editor.storage.characterCount.characters() === limit
          ? "character-count--warning"
          : ""
      }`}
    >
      <svg height="16" width="16" viewBox="0 0 20 20">
        <circle r="10" cx="10" cy="10" fill="#e9ecef" />
        <circle
          r="5"
          cx="10"
          cy="10"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="10"
          strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
          transform="rotate(-90) translate(-20)"
        />
        <circle r="6" cx="10" cy="10" fill="white" />
      </svg>
      <p className="text-sm text-gray-600 font-normal">
        {" "}
        {editor.storage.characterCount.words()} words
      </p>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="ghost"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              className={buttonClass}
            >
              <RedoIcon
                size={16}
                strokeWidth={2.5}
                className=" text-gray-800 font-bold dark:text-gray-200"
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Redo</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="ghost"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              className={buttonClass}
            >
              <UndoIcon
                size={16}
                strokeWidth={2.5}
                className=" text-gray-800 font-bold dark:text-gray-200"
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Undo</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

const ToolBar = ({
  editor,
  headingNeeded,
  noAI,
  section,
  handleContentGeneration,
  loading,
}: Props) => {
  if (!editor) {
    return null;
  }

  const buttonClass = `
    p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center justify-center
    active:bg-gray-300 dark:active:bg-gray-600
  `;

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  return (
    <>
      <TooltipProvider>
        <div className="flex h-11 items-center space-x-2 p-0 px-3 border-b bg-white dark:bg-gray-800 shadow-md rounded-lg md:flex-row md:relative md:w-full">
          {headingNeeded && (
            <Tooltip>
              <TooltipTrigger>
                <Toggle
                  pressed={editor.isActive("heading", { level: 1 })}
                  onPressedChange={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                  }
                  className={buttonClass}
                >
                  <h1 className="text-lg font-bold">H1</h1>
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>
                <p>Heading 1</p>
              </TooltipContent>
            </Tooltip>
          )}
          <Tooltip>
            <TooltipTrigger>
              <Toggle
                pressed={editor.isActive("bold")}
                onPressedChange={() =>
                  editor.chain().focus().toggleBold().run()
                }
                aria-label="Toggle bold"
                className={buttonClass}
              >
                <Bold
                  size={16}
                  strokeWidth={4}
                  className=" text-gray-800 font-bold dark:text-gray-200"
                />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Bold</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Toggle
                pressed={editor.isActive("italic")}
                onPressedChange={() =>
                  editor.chain().focus().toggleItalic().run()
                }
                className={buttonClass}
              >
                <Italic
                  size={15}
                  strokeWidth={2.5}
                  className=" text-gray-800 font-bold dark:text-gray-200"
                />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Italic</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Toggle
                pressed={editor.isActive("underline")}
                onPressedChange={() =>
                  editor.chain().focus().toggleUnderline().run()
                }
                className={buttonClass}
              >
                <UnderlineIcon
                  size={15}
                  strokeWidth={2.5}
                  className=" text-gray-800 font-bold dark:text-gray-200"
                />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Underline</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Toggle
                pressed={editor.isActive("strike")}
                onPressedChange={() =>
                  editor.chain().focus().toggleStrike().run()
                }
                className={buttonClass}
              >
                <Strikethrough
                  size={15}
                  strokeWidth={2.5}
                  className=" text-gray-800 font-bold dark:text-gray-200"
                />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Strikethrough</p>
            </TooltipContent>
          </Tooltip>
          <Separator orientation="vertical" />
          <Tooltip>
            <TooltipTrigger>
              <Toggle
                onPressedChange={() => editor.chain().toggleBulletList().run()}
                pressed={editor.isActive("bulletList")}
                className={buttonClass}
              >
                <ListIcon
                  size={15}
                  strokeWidth={2}
                  className=" text-gray-800 font-bold dark:text-gray-200"
                />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Undo</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Toggle
                onPressedChange={() =>
                  editor.chain().focus().toggleOrderedList().run()
                }
                pressed={editor.isActive("orderedList")}
                className={buttonClass}
              >
                <ListOrderedIcon
                  size={15}
                  strokeWidth={2}
                  className=" text-gray-800 font-bold dark:text-gray-200"
                />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Redo</p>
            </TooltipContent>
          </Tooltip>
          <Separator orientation="vertical" />
          <Tooltip>
            <TooltipTrigger>
              <Toggle
                onPressedChange={() =>
                  editor.chain().focus().setTextAlign("left").run()
                }
                pressed={editor.isActive({ textAlign: "left" })}
                className={buttonClass}
              >
                <AlignLeft
                  size={15}
                  strokeWidth={2}
                  className=" text-gray-800 font-bold dark:text-gray-200"
                />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Align Left</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Toggle
                onPressedChange={() =>
                  editor.chain().focus().setTextAlign("center").run()
                }
                pressed={editor.isActive({ textAlign: "center" })}
                className={buttonClass}
              >
                <AlignCenter
                  size={15}
                  strokeWidth={2}
                  className=" text-gray-800 font-bold dark:text-gray-200"
                />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Align Center</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Toggle
                onPressedChange={() =>
                  editor.chain().focus().setTextAlign("right").run()
                }
                pressed={editor.isActive({ textAlign: "right" })}
                className={buttonClass}
              >
                <AlignRight
                  size={15}
                  strokeWidth={2}
                  className=" text-gray-800 font-bold dark:text-gray-200"
                />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Align Right</p>
            </TooltipContent>
          </Tooltip>

          <Separator orientation="vertical" />
          <Tooltip>
            <TooltipTrigger>
              <Toggle
                onClick={setLink}
                pressed={editor.isActive("link")}
                className={buttonClass}
              >
                <LinkIcon
                  size={15}
                  strokeWidth={2.5}
                  className=" text-gray-800 font-bold dark:text-gray-200 mr-1"
                />
                <p>{noAI && "Add"} link</p>
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Link</p>
            </TooltipContent>
          </Tooltip>
          {!noAI && (
            <>
              <Separator orientation="vertical" />
              <Button
                disabled={loading}
                onClick={handleContentGeneration}
                variant="ghost"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <span className="mr-1">
                  <GradientWandIcon />
                </span>
                Generate {section}
              </Button>
            </>
          )}
        </div>
      </TooltipProvider>
    </>
  );
};

function TextEditor({
  section,
  loading,
  onChange,
  noAI,
  initialContent,
  endLoading,
  handleContentGeneration,
}: {
  section: string;
  onChange: Function;
  endLoading: Function;
  noAI: boolean;
  initialContent: string;
  loading: boolean;
  handleContentGeneration: () => void;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [contentBuffer, setContentBuffer] = useState<string>("");
  const bufferRef = useRef<string>("");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const editor: any = useEditor({
    extensions: [
      StarterKit.configure(),

      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
      CharacterCount.configure({ limit: 100000 }),
      BulletList,
      OrderedList,
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: " p-3 mx-auto focus:outline-none",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
      // console.log(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor) {
      editor.setEditable(!loading);
    }
  }, [editor, loading]);
  // console.log(initialContent);
  useEffect(() => {
    // connectWithSocketServer("1244");
    onEvent("resume_chunk", (chunk: string) => {
      if (editor) {
        bufferRef.current += chunk;
        // Append the chunk to the editor
        if (section === "Summjkjary") {
          editor.commands.setContent(bufferRef.current, false);
        } else {
          editor.chain().focus().insertContent(chunk).run();
        }
      }
      endLoading();
    });
    onEvent("error", (error: string) => {
      console.error("Socket error: ", error);
      endLoading(false);
    });

    return () => {
      // Clean up socket connection on component unmount
      // Add your disconnect logic here if needed
      disconnectSocket();
    };
  }, [editor]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (editor) {
  //       const currentHTML = editor.getHTML();
  //       editor.commands.setContent(`${currentHTML}${contentBuffer}`, false);
  //       setContentBuffer(""); // Clear the buffer after updating the editor
  //     }
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [contentBuffer, editor]);

  return (
    <>
      <div className="resume-text-editor flex flex-col justify-stretch min-h-[300px] p-4 bg-gray-100 rounded-xl">
        <div className="mb-2">
          {!isMobile ? (
            <ToolBar
              loading={loading}
              section={section}
              headingNeeded={false}
              handleContentGeneration={handleContentGeneration}
              editor={editor}
              noAI={noAI}
            />
          ) : (
            <FloatingMenu editor={editor} tippyOptions={{ placement: "top" }}>
              <ToolBar
                section={section}
                headingNeeded={false}
                loading={loading}
                handleContentGeneration={handleContentGeneration}
                editor={editor}
                noAI={noAI}
              />
            </FloatingMenu>
          )}
        </div>
        <div className="tiptap-resume">
          <EditorContent editor={editor} />
        </div>
      </div>
      <div className="word-count my-1 ">
        <WordCountAndRanking
          editor={editor}
          headingNeeded={null}
          handleContentGeneration={undefined}
          loading={false}
          section={""}
          noAI={false}
        />
      </div>
    </>
  );
}

export default TextEditor;
