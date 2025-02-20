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
import { Checkbox } from "@/components/ui/checkbox";

const VolunteerForm = ({
  values,
  index,
  control,
  handleFieldUpdate,
  setValue,
  handleContentGeneration,
}: any) => {
  const onEditorStateChange = (editorState: any) => {
    setValue(`volunteer.${index}.highlights`, editorState);
    handleFieldUpdate(`volunteer.${index}.highlights`, editorState);
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-6 mb-2">
          <Controller
            name={`volunteer.${index}.organization`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <>
                <Label className="text-sm mb-1 text-slate-600 antialiased">
                  Organization
                </Label>
                <Input
                  {...field}
                  onBlur={(e) => {
                    field.onBlur();
                    handleFieldUpdate(field.name, e.target.value);
                  }}
                  type="text"
                  placeholder="Organization"
                />
              </>
            )}
          />
        </div>
        <div className="col-md-6 mb-2">
          <Controller
            name={`volunteer.${index}.position`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <>
                <Label className="text-sm mb-1 text-slate-600 antialiased">
                  Position
                </Label>
                <Input
                  {...field}
                  onBlur={(e) => {
                    field.onBlur();
                    handleFieldUpdate(field.name, e.target.value);
                  }}
                  type="text"
                  placeholder="Position"
                />
              </>
            )}
          />
        </div>
        <div className="col-md-12 mb-2">
          <Controller
            name={`volunteer.${index}.url`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <>
                <Label className="text-sm mb-1 text-slate-600 antialiased">
                  URL
                </Label>
                <Input
                  {...field}
                  onBlur={(e) => {
                    field.onBlur();
                    handleFieldUpdate(field.name, e.target.value);
                  }}
                  type="text"
                  placeholder="https://organization.com/"
                />
              </>
            )}
          />
        </div>
        <div className="col-md-6 mb-2">
          <Controller
            name={`volunteer.${index}.startDate`}
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
        <div className="col-md-6 mb-2">
          <Controller
            name={`volunteer.${index}.endDate`}
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
          <Controller
            name={`volunteer.${index}.current`}
            control={control}
            render={({ field }) => (
              <div className="flex items-center mt-2">
                <Checkbox
                  id={`current-${index}`}
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    if (checked) {
                      setValue(`volunteer.${index}.endDate`, "");
                    }
                  }}
                />
                <Label htmlFor={`current-${index}`} className="ml-2">
                  Current
                </Label>
              </div>
            )}
          />
        </div>
        <div className="col-md-12 mb-2 mt-2">
          <Label className="text-sm text-slate-600 antialiased">Highlights</Label>
          <TextEditor
            onChange={onEditorStateChange}
            initialContent={values[index]?.highlights || ""}
            section="volunteer"
            loading={false}
            endLoading={() => {}}
            noAI
            handleContentGeneration={handleContentGeneration}
          />
        </div>
      </div>
    </div>
  );
};


function Volunteer({
  control,
  getValues,
  setValue,
  handleFieldUpdate,
  handleContentGeneration,
}: any) {
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "volunteer",
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
    name: "volunteer",
  });

  return (
    <div>
      <div className="mb-4 mt-10">
        <h2 className="text-lg text-slate-900 gap-1.5 flex flex-row items-center font-bold antialiased leading-tight tracking-tight">
          <Dribbble strokeWidth={1.5} /> Volunteer Experience
        </h2>
      </div>
      <div>
        <DragDropContext onDragEnd={handleDrag}>
          <Droppable droppableId="volunteerPanel">
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
                                    {values?.[index]?.organization ||
                                    values?.[index]?.position ? (
                                      <div className="flex px-3 gap-3 items-center">
                                        <div className="flex flex-col">
                                          <div className="truncate text-gray-600">
                                            {values?.[index]?.organization ? (
                                              <span className="text-sm font-semibold">
                                                {values?.[index]?.organization}
                                              </span>
                                            ) : (
                                              <span className="text-sm">
                                                Enter your organization name
                                              </span>
                                            )}
                                          </div>
                                          <div className="truncate text-gray-700">
                                            <span className="text-sm font-medium">
                                              {values?.[index]?.position}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="col">
                                        <p className="text-sm">
                                          Add your volunteer experience details.
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
                              <VolunteerForm
                                control={control}
                                handleFieldUpdate={handleFieldUpdate}
                                values={values}
                                index={index}
                                setValue={setValue}
                                handleContentGeneration={handleContentGeneration}
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
      <button onClick={() => append({})}>Add Volunteer Experience</button>
    </div>
  );
}

export default Volunteer;
