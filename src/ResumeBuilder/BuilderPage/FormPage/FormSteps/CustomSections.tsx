import React, { useState } from "react";
import { useFieldArray } from "react-hook-form";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import CustomSection from "./CustomSection";

const CustomSections = ({
  control,
  register,
  handleFieldUpdate,
  setValue,
  handleContentGeneration,
}: any) => {
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "customSections",
  });

  const [sectionNames, setSectionNames] = useState<string[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempSectionName, setTempSectionName] = useState<string>("");

  const addSection = () => {
    const sectionName = "Untitled";
    setSectionNames([...sectionNames, sectionName]);
    append({ sectionName: sectionName, items: [] });
  };

  const removeSection = (index: number) => {
    const newSectionNames = sectionNames.filter((_, i) => i !== index);
    setSectionNames(newSectionNames);
    remove(index);
  };

  const startEditing = (index: number, sectionName: string) => {
    setEditingIndex(index);
    setTempSectionName(sectionName);
  };

  const stopEditing = () => {
    if (editingIndex !== null) {
      const updatedSectionNames = [...sectionNames];
      updatedSectionNames[editingIndex] = tempSectionName || "Untitled";
      setSectionNames(updatedSectionNames);
      setEditingIndex(null);
      setTempSectionName("");
    }
  };

  return (
    <div>
      <div className="mb-4 mt-10">
        <h2 className="text-lg text-slate-900 gap-1.5 flex flex-row items-center font-bold antialiased leading-tight tracking-tight">
          Custom Sections
        </h2>
      </div>
      <DragDropContext
        onDragEnd={({ source, destination }) => {
          if (destination) {
            move(source.index, destination.index);
            const updatedSectionNames = [...sectionNames];
            const [movedSection] = updatedSectionNames.splice(source.index, 1);
            updatedSectionNames.splice(destination.index, 0, movedSection);
            setSectionNames(updatedSectionNames);
          }
        }}
      >
        <Droppable droppableId="customSections">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {fields.map((field, index) => (
                <Draggable
                  key={field.id}
                  draggableId={field.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="mb-4"
                    >
                      {editingIndex === index ? (
                        <input
                          type="text"
                          value={tempSectionName}
                          onChange={(e) => setTempSectionName(e.target.value)}
                          onBlur={stopEditing}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              stopEditing();
                            }
                          }}
                          autoFocus
                          className="border-b-2 border-slate-900 text-lg text-slate-900 font-bold"
                        />
                      ) : (
                        <div
                          className="flex justify-between items-center"
                          onClick={() => startEditing(index, sectionNames[index] || "Untitled")}
                        >
                          <h3 className="text-lg text-slate-900 font-bold cursor-pointer">
                            {sectionNames[index] || "Untitled"}
                          </h3>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeSection(index);
                            }}
                            className="text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                      <CustomSection
                        sectionName={sectionNames[index] || "Untitled"}
                        control={control}
                        register={register}
                        handleFieldUpdate={handleFieldUpdate}
                        setValue={setValue}
                        handleContentGeneration={handleContentGeneration}
                        removeSection={() => removeSection(index)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button
        onClick={addSection}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Add Custom Section
      </button>
    </div>
  );
};

export default CustomSections;
