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

const PublicationForm = ({
  values,
  index,
  control,
  handleFieldUpdate,
  setValue,
}: any) => {
  function handleContentGeneration(): void {
    throw new Error("Function not implemented.");
  }

  const onEditorStateChange = (editorState: any) => {
    setValue(`publications.${index}.highlight`, editorState);
    handleFieldUpdate(`publications.${index}.highlight`, editorState);
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <Controller
            name={`publications.${index}.name`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <>
                <Label className="text-sm mb-1 text-slate-600 antialiased">
                  Publication Name
                </Label>
                <Input
                  {...field}
                  onBlur={(e) => {
                    field.onBlur();
                    handleFieldUpdate(field.name, e.target.value);
                  }}
                  type="text"
                  placeholder="Publication Name"
                />
              </>
            )}
          />
        </div>
        <div className="col-md-6">
          <Controller
            name={`publications.${index}.publisher`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <>
                <Label className="text-sm mb-1 text-slate-600 antialiased">
                  Publisher
                </Label>
                <Input
                  {...field}
                  onBlur={(e) => {
                    field.onBlur();
                    handleFieldUpdate(field.name, e.target.value);
                  }}
                  type="text"
                  placeholder="Publisher"
                />
              </>
            )}
          />
        </div>
        <div className="col-md-6">
          <Controller
            name={`publications.${index}.releaseDate`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <DatePicker
                label="Release Date"
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
            name={`publications.${index}.url`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <>
                <Label className="text-sm mb-1 text-slate-600 antialiased">
                  Publication URL
                </Label>
                <Input
                  {...field}
                  onBlur={(e) => {
                    field.onBlur();
                    handleFieldUpdate(field.name, e.target.value);
                  }}
                  type="text"
                  placeholder="https://publication.com"
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
            onChange={onEditorStateChange
            }
            initialContent={values[index]?.highlight || ""}
            section="publications"
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
function Publications({
  control,
  getValues,
  setValue,
  handleFieldUpdate,
}: any) {
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "publications",
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
    name: "publications",
  });

  return (
    <div>
      <div className="mb-4 mt-10">
        <h2 className="text-lg text-slate-900 gap-1.5 flex flex-row items-center font-bold antialiased leading-tight tracking-tight">
          <Dribbble strokeWidth={1.5} /> Publications
        </h2>
      </div>
      <div>
        <DragDropContext onDragEnd={handleDrag}>
          <Droppable droppableId="publicationsPanel">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {fields.map((field, index) => (
                  <Draggable
                    key={field.id}
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
                                    values?.[index]?.publisher ? (
                                      <div className="flex px-3 gap-3 items-center">
                                        <div className="flex flex-col">
                                          <div className="truncate text-gray-600">
                                            {values?.[index]?.name ? (
                                              <span className="text-sm font-semibold">
                                                {values?.[index]?.name}
                                              </span>
                                            ) : (
                                              <span className="text-sm">
                                                Enter your publication name
                                              </span>
                                            )}
                                          </div>
                                          <div className="truncate text-gray-700">
                                            <span className="text-sm font-medium">
                                              {values?.[index]?.publisher}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="col">
                                        <p className="text-sm">
                                          Add your publication details.
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
                              <PublicationForm
                                control={control}
                                handleFieldUpdate={handleFieldUpdate}
                                values={values}
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
      <button onClick={() => append({})}>Add Publication</button>
    </div>
  );
}

export default Publications;
