import TextEditor from "@/components/TextEditor";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ResumeAccordion from "@/components/ui/ResumeAccordion";
import { Dribbble, Trash } from "lucide-react";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Controller, useFieldArray, useWatch } from "react-hook-form";
import DatePicker from "../DatePicker";
import { emitEvent } from "@/lib/socketConnection";

const EducationForm = ({
  values,
  index,
  control,
  handleFieldUpdate,
  setValue,
}: any) => {
  const onEditorStateChange = (editorState: any) => {
    setValue(`education.${index}.highlights`, editorState);
    handleFieldUpdate(`education.${index}.highlights`, editorState);
  };

  const handleContentGeneration = () => {
    console.log("No need Ai");
  };
  return (
    <div>
      <div>
        <div className="row">
          <div className="col-md-6 col-12 mb-2">
            <Controller
              name={`education.${index}.studyType`}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <Label className="text-sm mb-1 text-slate-600 antialiased">
                    Study Type
                  </Label>
                  <Input
                    {...field}
                    onBlur={(e) => {
                      field.onBlur();
                      handleFieldUpdate(field.name, e.target.value);
                    }}
                    type="text"
                    placeholder="Bsc, MA"
                  />
                </>
              )}
            />
          </div>
          <div className="col-md-6 col-12 mb-2">
            <Controller
              name={`education.${index}.area`}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <Label className="text-sm mb-1 text-slate-600 antialiased">
                    Area
                  </Label>
                  <Input
                    {...field}
                    onBlur={(e) => {
                      field.onBlur();
                      handleFieldUpdate(field.name, e.target.value);
                    }}
                    type="text"
                    placeholder="Computer Science"
                  />
                </>
              )}
            />
          </div>
          <div className="col-md-6 col-12 mb-2">
            <Controller
              name={`education.${index}.institution`}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <Label className="text-sm mb-1 text-slate-600 antialiased">
                    Institution
                  </Label>
                  <Input
                    {...field}
                    onBlur={(e) => {
                      field.onBlur();
                      handleFieldUpdate(field.name, e.target.value);
                    }}
                    type="text"
                    placeholder="Harvard University"
                  />
                </>
              )}
            />
          </div>
          <div className="col-md-6 col-12 mb-2">
            <Controller
              name={`education.${index}.city`}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <Label className="text-sm mb-1 text-slate-600 antialiased">
                    City
                  </Label>
                  <Input
                    {...field}
                    onBlur={(e) => {
                      field.onBlur();

                      handleFieldUpdate(field.name, e.target.value);
                    }}
                    type="text"
                    placeholder="City"
                  />
                </>
              )}
            />
          </div>
          <div className="col-md-6 col-6 mb-2">
            <Controller
              name={`education.${index}.startDate`}
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
          <div className="col-md-6 col-6 mb-2">
            <Controller
              name={`education.${index}.endDate`}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <DatePicker
                  label="End Date"
                  selectedDate={field.value ? new Date(field.value) : undefined}
                  onDateChange={(date: any) => {
                    field.onChange(date);
                    handleFieldUpdate(field.name, date);
                  }}
                  disabled={
                    !values?.[index]?.startDate ||
                    values?.[index]?.startDate === "" ||
                    values?.[index]?.current
                      ? true
                      : false
                  }
                />
              )}
            />
          </div>
          <div className="col-md-6 col-offset-6 mb-2">
            <Controller
              name={`education.${index}.current`}
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <div className="flex items-center">
                  <Checkbox
                    {...field}
                    onChange={(e: any) => {
                      field.onChange(e.target.checked);
                      setValue(`education.${index}.current`, e.target.checked);
                    }}
                  />
                  <Label className="ml-2 text-sm text-slate-600 antialiased">
                    Current
                  </Label>
                </div>
              )}
            />
          </div>
          <div className="col-md-12">
            <Label className="text-sm mb-1 text-slate-600 antialiased">
              Highlights
            </Label>
            <TextEditor
              onChange={onEditorStateChange}
              initialContent={values[index]?.highlight || ""}
              section="education"
              noAI
              loading={false}
              endLoading={() => {}}
              handleContentGeneration={handleContentGeneration}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
function School({
  control,
  register,
  getValues,
  setValue,
  handleFieldUpdate,
  errors,
}: any) {
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "education",
    }
  );

  const [openIndex, setOpenIndex] = useState(null);
  const [accordions, setAccordions] = useState([1, 2, 3]); // Example data

  const handleDelete = (index: number | null) => {
    setAccordions(accordions.filter((_, i) => i !== index));
    if (openIndex === index) {
      setOpenIndex(null);
    }
  };

  const handleAccordionClick = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleDrag = ({ source, destination }: any) => {
    console.log(source);
    if (destination) {
      move(source.index, destination.index);
      // const panel = `panel${source.index}`
      // setExpanded( true ? panel : false);
    }
  };
  const values = useWatch({
    control,
    name: "education", // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
    // defaultValue: "default" // default value before the render
  });

  return (
    <div>
      <div className="mb-4 mt-10">
        <h2 className="text-lg text-slate-900 gap-1.5 flex flex-row items-center font-bold antialiased leading-tight tracking-tight">
          <Dribbble strokeWidth={1.5} /> Education
        </h2>
      </div>
      <div>
        <DragDropContext onDragEnd={handleDrag}>
          <Droppable droppableId="educationPanel">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {fields.map((field, index) => (
                  <Draggable
                    key={`education[${index}]`}
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
                                  <div>
                                    {values?.[index]?.studyType ||
                                    values?.[index]?.institution ? (
                                      <div>
                                        <div>
                                          <p className="text-sm text-gray-900 antialiased">
                                            <span className="font-bold  ">
                                              {values?.[index]?.studyType},{" "}
                                            </span>
                                            {values?.[index]?.area}
                                          </p>
                                          <p className="text-sm">
                                            {values?.[index]?.institution}.{" "}
                                            {values?.[index]?.city}
                                          </p>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="col">
                                        <p className="text-sm">
                                          Add your education details.
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
                              <EducationForm
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
      <button onClick={() => append({})}>Add Education</button>
    </div>
  );
}

export default School;
