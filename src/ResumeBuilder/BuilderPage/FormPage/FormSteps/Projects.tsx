import ResumeAccordion from "@/components/ui/ResumeAccordion";
import { Dribbble, Trash } from "lucide-react";
import React, { useState } from "react";
import { useFieldArray, useWatch } from "react-hook-form";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TextEditor from "@/components/TextEditor";
import DatePicker from "../DatePicker";

const ProjectForm = ({
  values,
  index,
  control,
  watch,
  handleFieldUpdate,
  setValue,
}: any) => {
  function handleContentGeneration(): void {
    throw new Error("Function not implemented.");
  }
  const onEditorStateChange = (editorState: any) => {
    setValue(`projects.${index}.highlight`, editorState);
    handleFieldUpdate(`projects.${index}.highlight`, editorState);
  };
const initialContent = watch(`projects.${index}.highlight`)
  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <Controller
            name={`projects.${index}.name`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <>
                <Label className="text-sm mb-1 text-slate-600 antialiased">
                  Project Name
                </Label>
                <Input
                  {...field}
                  onBlur={(e) => {
                    field.onBlur();
                    handleFieldUpdate(field.name, e.target.value);
                  }}
                  type="text"
                  placeholder="Project Name"
                />
              </>
            )}
          />
        </div>
        <div className="col-md-6">
          <Controller
            name={`projects.${index}.url`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <>
                <Label className="text-sm mb-1 text-slate-600 antialiased">
                  Project URL
                </Label>
                <Input
                  {...field}
                  onBlur={(e) => {
                    field.onBlur();
                    handleFieldUpdate(field.name, e.target.value);
                  }}
                  type="text"
                  placeholder="https://project.com"
                />
              </>
            )}
          />
        </div>
        <div className="col-md-6">
          <Controller
            name={`projects.${index}.startDate`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <DatePicker
                label="Start Date"
                selectedDate={field.value ? new Date(field.value) : undefined}
                onDateChange={(date) => {
                  field.onChange(date);
                  handleFieldUpdate(field.name, date);
                }}
              />
            )}
          />
        </div>
        <div className="col-md-6">
          <Controller
            name={`projects.${index}.endDate`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <DatePicker
                label="End Date"
                selectedDate={field.value ? new Date(field.value) : undefined}
                onDateChange={(date) => {
                  field.onChange(date);
                  handleFieldUpdate(field.name, date);
                }}
                disabled={values[index]?.current}
              />
            )}
          />
        </div>
        <div className="col-md-12 mt-2">
          <Controller
            name={`projects.${index}.description`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <>
                <Label className="text-sm mb-1 text-slate-600 antialiased">
                  Description
                </Label>
                <Input
                  {...field}
                  onBlur={(e) => {
                    field.onBlur();
                    handleFieldUpdate(field.name, e.target.value);
                  }}
                  type="text"
                  placeholder="Description..."
                />
              </>
            )}
          />
        </div>
        <div className="col-md-12 mt-2">
          <Label className="text-sm text-slate-600 antialiased">
            Highlights
          </Label>
          <TextEditor
            onChange={onEditorStateChange}
            initialContent={values[index]?.highlight || ""}
            section="projects"
            noAI
            loading={false}
            endLoading={() => {}}
            handleContentGeneration={handleContentGeneration}
          />
        </div>
      </div>
    </div>
  );
};
function Projects({
  control,
  getValues,
  setValue,
  handleFieldUpdate,
  watch,
}: any) {
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "projects",
  });

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleAccordionClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleDrag = ({ source, destination }: any) => {
    if (destination) {
      move(source.index, destination.index);
    }
  };

  const values = useWatch({
    control,
    name: "projects",
  });

  return (
    <div>
      <div className="mb-4 mt-10">
        <h2 className="text-lg text-slate-900 gap-1.5 flex flex-row items-center font-bold antialiased leading-tight tracking-tight">
          <Dribbble strokeWidth={1.5} /> Projects
        </h2>
      </div>
      <div>
        <DragDropContext onDragEnd={handleDrag}>
          <Droppable droppableId="projectsPanel">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {fields.map((field, index) => (
                  <Draggable
                    key={`projects[${index}]`}
                    draggableId={`item-${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div key={field.id}>
                          <div>
                            <ResumeAccordion
                              key={index}
                              summary={
                                <>
                                  <div className="row align-items-center w-full">
                                    {values?.[index]?.name ||
                                    values?.[index]?.url ? (
                                      <div className="flex px-3 gap-3 items-center">
                                        <div>
                                          <div className="text-sm text-gray-900 antialiased">
                                            {values?.[index]?.name ? (
                                              <span className="text-sm font-semibold">
                                                {values?.[index]?.name}
                                              </span>
                                            ) : (
                                              <span className="text-sm">
                                                Enter your project name
                                              </span>
                                            )}
                                          </div>
                                          <div className="truncate text-gray-900">
                                            <span className="text-sm font-medium">
                                              {values?.[index]?.url}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="col">
                                        <p className="text-sm">
                                          Add your project details.
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </>
                              }
                              isOpen={openIndex === index}
                              onClick={() => handleAccordionClick(index)}
                              rightAction={
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    remove(index);
                                  }}
                                  className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                                >
                                  <Trash size={20} />
                                </button>
                              }
                            >
                              <ProjectForm
                                control={control}
                                handleFieldUpdate={handleFieldUpdate}
                                values={values}
                                watch={watch}
                                index={index}
                                setValue={setValue}
                              />
                            </ResumeAccordion>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <button onClick={() => append({})}>Add Project</button>
    </div>
  );
}

export default Projects;
