import React from "react";
import { Control, useFieldArray, UseFormGetValues, UseFormSetValue } from "react-hook-form";

import { RootSchema } from "@/types";

type Props = {
  control: Control<RootSchema, any>;
  targetKey: "recipeInstructions" | "recipeIngredients";
  onEdit: boolean;
  fieldRef: React.MutableRefObject<(HTMLElement | null)[]>;
  getValues: UseFormGetValues<RootSchema>;
  setValue: UseFormSetValue<RootSchema>;
};

const useRecipeFields = ({ control, targetKey, onEdit, fieldRef, getValues }: Props) => {
  const { fields, append, remove } = useFieldArray<RootSchema>({
    control,
    name: targetKey,
  });

  React.useEffect(() => {
    if (onEdit) {
      setTimeout(() => {
        const targettedElement = getValues()[targetKey];
        if (targettedElement) {
          const lastEl = fieldRef.current[targettedElement.length - 1];
          if (lastEl) {
            lastEl.focus();
            window.getSelection()?.selectAllChildren(lastEl);
            window.getSelection()?.collapseToEnd();
          }
        }
      }, 0);
    }
  }, [fields, onEdit]);

  function appendNewField(event: React.KeyboardEvent | React.MouseEvent) {
    event.preventDefault();
    append({
      item: "",
      id: fields.length,
    });
  }

  function removeField(id: number) {
    remove(id);
  }

  return { fields, append: appendNewField, remove: removeField };
};

export default useRecipeFields;
