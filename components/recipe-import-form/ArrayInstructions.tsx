import React from "react";
import { Control, UseFormGetValues, UseFormSetValue } from "react-hook-form";

import useRecipeFields from "@/libs/hooks/useRecipeFields";
import { RootSchema } from "@/types";

import FieldWrapper from "./FieldWrapper";

type Props = {
  instructionsRef: React.MutableRefObject<(HTMLOListElement | null)[]>;
  control: Control<RootSchema, any>;
  setValue: UseFormSetValue<RootSchema>;
  onEdit: {
    [key: string]: boolean;
  };
  getValues: UseFormGetValues<RootSchema>;
};

const ArrayInstructions: React.FunctionComponent<Props> = ({ instructionsRef, control, setValue, onEdit, getValues }) => {
  const { fields, append, remove } = useRecipeFields({ control, fieldRef: instructionsRef, getValues, setValue, targetKey: "recipeInstructions", onEdit: onEdit.instructions });

  return (
    <FieldWrapper el="ul" aria-label="Ingredients">
      {fields.map((instruction, id) => (
        <ol
          suppressContentEditableWarning
          contentEditable
          ref={(val) => (instructionsRef.current[id] = val)}
          onInput={(event) => {
            setValue(`recipeInstructions.${id}`, {
              id: id,
              item: event.currentTarget.textContent as string,
            });
          }}
          onKeyDown={(event) => {
            if (event.code === "Enter") {
              event.preventDefault();
              append(event);
            }
            if (event.code === "Backspace" && event.currentTarget.textContent === "") {
              remove(id);
            }
          }}
          key={instruction.id}
          className="rounded-md bg-transparent p-2 text-sm focus:outline-none"
        >
          {instruction.item}
        </ol>
      ))}
      <button type="button" onClick={(event) => append(event)} className="my-3 flex w-full items-center justify-center rounded-lg py-2 outline outline-dark-neutral">
        Add Instruction
      </button>
    </FieldWrapper>
  );
};

export default ArrayInstructions;
