import ResumeAccordion from "@/components/ui/ResumeAccordion";
import { Dribbble, Trash } from "lucide-react";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useFieldArray, useWatch } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SkillForm = ({
  nestIndex,
  control,
  register,
  handleFieldUpdate,
}: any) => {
  const { fields, append, swap, move, remove } = useFieldArray({
    control,
    name: `skills[${nestIndex}].skill`,
  });
  const handleDrag = ({ source, destination }: any) => {
    if (destination) {
      move(source.index, destination.index);
      // const panel = `skillsPanel${source.index}`
      // setExpanded( true ? panel : false);
    }
  };
  return (
    <div onClick={(event) => event.stopPropagation()}>
      <DragDropContext onDragEnd={handleDrag}>
        <Droppable droppableId="skillPanel">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {fields.map((field, index) => (
                <Draggable
                  key={`skills[${nestIndex}].skill[${index}]`}
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
                        <div key={field.id} className="row mb-2">
                          <div className="col-md-5 mb-2">
                            <Controller
                              name={`skills[${nestIndex}].skill[${index}].name`}
                              control={control}
                              // defaultValue={field.name}
                              render={({ field }) => (
                                <>
                                  <Label className="text-sm mb-1 text-slate-600 antialiased">
                                    Skill Name
                                  </Label>
                                  <Input
                                    {...field}
                                    type="text"
                                    placeholder="Skill Name"
                                    onBlur={(e) => {
                                      field.onBlur();
                                      handleFieldUpdate(
                                        field.name,
                                        e.target.value
                                      );
                                    }}
                                  />
                                </>
                              )}
                            />
                          </div>
                          <div className="col-md-5 mb-2">
                            <Controller
                              name={`skills[${nestIndex}].skill[${index}].level`}
                              control={control}
                              // defaultValue={field.level}
                              render={({ field }) => (
                                <>
                                  <Label className="text-sm mb-1 text-slate-600 antialiased">
                                    Skill Level
                                  </Label>
                                  <Select
                                    defaultValue={field.value}
                                    onValueChange={(value) => {
                                      field.onChange(value);
                                      handleFieldUpdate(field.name, value);
                                    }}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="beginner">
                                        Beginner
                                      </SelectItem>
                                      <SelectItem value="skillful">
                                        Skillful
                                      </SelectItem>
                                      <SelectItem value="experienced">
                                        {" "}
                                        Experienced
                                      </SelectItem>
                                      <SelectItem value="expert">
                                        Expert
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </>
                              )}
                            />
                          </div>
                          <div className="col-md-2 mb-2 flex items-center">
                            <button
                              onClick={() => remove(index)}
                              className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                            >
                              <Trash size={20} />
                            </button>
                          </div>
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

      <button onClick={() => append({ name: "", level: "" })}>Add Skill</button>
    </div>
  );
};

const SkillsCategoryForm = ({
  values,
  index,
  control,
  register,
  handleFieldUpdate,
  setValue,
}: any) => {
  return (
    <div>
      <div className="row mb-2">
        <div className="col-md-6 mb-2">
          <Controller
            name={`skills[${index}].name`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <>
                <Label className="text-sm mb-1 text-slate-600 antialiased">
                  Category Name
                </Label>
                <Input
                  {...field}
                  type="text"
                  placeholder="Category Name"
                  onBlur={(e) => {
                    field.onBlur();
                    handleFieldUpdate(field.name, e.target.value);
                  }}
                />
              </>
            )}
          />
        </div>
      </div>
      <SkillForm
        nestIndex={index}
        control={control}
        register={register}
        handleFieldUpdate={handleFieldUpdate}
      />
    </div>
  );
};

function Skills({
  control,
  getValues,
  setValue,
  handleFieldUpdate,
  handleContentGeneration,
}: any) {
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "skills",
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
    name: "skills",
  });

  return (
    <div>
      <div className="mb-4 mt-10">
        <h2 className="text-lg text-slate-900 gap-1.5 flex flex-row items-center font-bold antialiased leading-tight tracking-tight">
          <Dribbble strokeWidth={1.5} /> Skills
        </h2>
      </div>
      <div>
        <DragDropContext onDragEnd={handleDrag}>
          <Droppable droppableId="skillsPanel">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {fields.map((field, index) => (
                  <Draggable
                    key={`skills[${index}]`}
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
                                    {values?.[index]?.name ? (
                                      <div className="flex px-3 gap-3 items-center">
                                        <div className="flex flex-col">
                                          <div className="truncate text-gray-600">
                                            {values?.[index]?.name ? (
                                              <span className="text-sm font-semibold">
                                                {values?.[index]?.name}
                                              </span>
                                            ) : (
                                              <span className="text-sm">
                                                Enter category name
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="col">
                                        <p className="text-sm">
                                          Add your skills category details.
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
                              <SkillsCategoryForm
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
      <button onClick={() => append({ name: "", skill: [] })}>
        Add Skills Category
      </button>
    </div>
  );
}

export default Skills;
