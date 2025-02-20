import React, { useState } from "react";
import { useFieldArray, useWatch } from "react-hook-form";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Trash } from "lucide-react";
import ResumeAccordion from "@/components/ui/ResumeAccordion";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TextEditor from "@/components/TextEditor";

const CustomEntryForm = ({
  values,
  index,
  control,
  handleFieldUpdate,
  setValue,
  sectionName,
  handleContentGeneration,
}: any) => {
  const onEditorStateChange = (editorState: any) => {
    setValue(`customSections.${sectionName}[${index}].highlights`, editorState);
    handleFieldUpdate(
      `customSections.${sectionName}[${index}].highlights`,
      editorState
    );
  };

  return (
    <div>
      <div className="row mb-2">
        <div className="col-md-6 mb-2">
          <Controller
            name={`customSections.${sectionName}[${index}].title`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <>
                <Label className="text-sm mb-1 text-slate-600 antialiased">
                  Title
                </Label>
                <Input
                  {...field}
                  type="text"
                  placeholder="Title"
                  onBlur={(e) => {
                    field.onBlur();
                    handleFieldUpdate(field.name, e.target.value);
                  }}
                />
              </>
            )}
          />
        </div>
        <div className="col-md-6 mb-2">
          <Controller
            name={`customSections.${sectionName}[${index}].description`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <>
                <Label className="text-sm mb-1 text-slate-600 antialiased">
                  Description
                </Label>
                <Input
                  {...field}
                  type="text"
                  placeholder="Description"
                  onBlur={(e) => {
                    field.onBlur();
                    handleFieldUpdate(field.name, e.target.value);
                  }}
                />
              </>
            )}
          />
        </div>
        <div className="col-md-12 mb-2">
          <Label className="text-sm text-slate-600 antialiased">
            Highlights
          </Label>
          <TextEditor
            onChange={onEditorStateChange}
            initialContent={values[index]?.highlights || ""}
            section="custom"
            noAI
            endLoading={() =>{}}
            loading={false}
            handleContentGeneration={handleContentGeneration}
          />
        </div>
      </div>
    </div>
  );
};

const CustomSection = ({
  sectionName,
  control,
  register,
  handleFieldUpdate,
  setValue,
  handleContentGeneration,
  removeSection,
}: any) => {
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: `customSections.${sectionName}`,
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
    name: `customSections.${sectionName}`,
  });

  return (
    <div className="custom-section mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg text-slate-900 font-bold">{sectionName}</h3>
        <button
          onClick={() => removeSection(sectionName)}
          className="text-red-600 hover:text-red-800"
        >
          <Trash size={20} />
        </button>
      </div>
      <DragDropContext onDragEnd={handleDrag}>
        <Droppable droppableId={`customSection-${sectionName}`}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {fields.map((field, index) => (
                <Draggable
                  key={field.id}
                  draggableId={`customSection-${sectionName}-item-${index}`}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <ResumeAccordion
                        key={index}
                        summary={
                          <>
                            <div className="row align-items-center w-full">
                              {values?.[index]?.title ||
                              values?.[index]?.description ? (
                                <div className="flex px-3 gap-3 items-center">
                                  <div className="flex flex-col">
                                    <div className="truncate text-gray-600">
                                      {values?.[index]?.title ? (
                                        <span className="text-sm font-semibold">
                                          {values?.[index]?.title}
                                        </span>
                                      ) : (
                                        <span className="text-sm">
                                          Enter title
                                        </span>
                                      )}
                                    </div>
                                    <div className="truncate text-gray-700">
                                      <span className="text-sm font-medium">
                                        {values?.[index]?.description}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="col">
                                  <p className="text-sm">
                                    Add your custom details.
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
                        <CustomEntryForm
                          control={control}
                          handleFieldUpdate={handleFieldUpdate}
                          values={values}
                          index={index}
                          setValue={setValue}
                          sectionName={sectionName}
                          handleContentGeneration={handleContentGeneration}
                        />
                      </ResumeAccordion>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button onClick={() => append({})}>Add Entry</button>
    </div>
  );
};

export default CustomSection;
