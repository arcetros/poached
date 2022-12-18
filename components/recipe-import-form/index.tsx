import React from "react";
import { UseFormReturn } from "react-hook-form";

import { RootSchema } from "@/types";

import Input from "../ui/Form/Input";
import { Result } from "../ui/recipe/recipe";
import ArrayIngredients from "./ArrayIngredients";
import ArrayInstructions from "./ArrayInstructions";
import Description from "./Description";
import EditButton from "./EditButton";
import FieldWrapper from "./FieldWrapper";
import Title from "./Title";

type Props = {
  recipe: RootSchema | undefined;
  setRecipe: React.Dispatch<React.SetStateAction<RootSchema | undefined>>;
  recipeData: Result | undefined;
  form: UseFormReturn<RootSchema, any>;
};

const RecipeEditForm: React.FC<Props> = ({ recipe, setRecipe, form, recipeData }) => {
  const initialEdit = {
    description: recipe?.description ? (recipe?.description ? true : false) : false,
    ingredients: false,
    instructions: false,
  };

  const { register, control, setValue, getValues } = form;

  const [onEditFields, setOnEditFields] = React.useState<{
    [key: string]: boolean;
  }>(initialEdit);

  const ingredientRef = React.useRef<(HTMLLIElement | null)[]>([]);
  const instructionsRef = React.useRef<(HTMLOListElement | null)[]>([]);

  function handleDescriptionToggle() {
    if (onEditFields.description) {
      setOnEditFields({ ...onEditFields, description: false });
      form.setValue("description", undefined);
      return;
    }
    setOnEditFields({ ...onEditFields, description: true });
  }

  function handleEditToggle(key: string) {
    setOnEditFields({
      ...onEditFields,
      [key]: !onEditFields[key],
    });
  }

  React.useEffect(() => {
    setOnEditFields(initialEdit);
  }, [recipeData]);

  return (
    <form
      onSubmit={form.handleSubmit((data) => {
        setRecipe(data);
        form.reset(data);
      })}
      className="flex h-full flex-col justify-between"
    >
      <div className="flex flex-col px-4 pb-8">
        <div className="border-b border-b-dark-neutral">
          <h1 className="mb-2 pb-2 font-headline text-2xl font-bold">Edit recipe</h1>
        </div>
        <Title register={register} onEditFields={onEditFields} name="name" handleDescriptionToggle={handleDescriptionToggle} />
        {onEditFields.description && <Description register={register} />}
        <FieldWrapper aria-label="Url">
          <Input {...register("url")} placeholder="Recipe url source" />
        </FieldWrapper>
        <FieldWrapper aria-label="Yields">
          <Input {...register("recipeYield")} type="number" placeholder="Recipe yields" />
        </FieldWrapper>
        <EditButton handleEditToggle={handleEditToggle} targetKey="ingredients" />
        {onEditFields.ingredients && <ArrayIngredients control={control} ingredientRef={ingredientRef} setValue={setValue} getValues={getValues} onEdit={onEditFields} />}
        {recipe?.recipeInstructions && (
          <>
            <EditButton handleEditToggle={handleEditToggle} targetKey="instructions" />
            {onEditFields.instructions && <ArrayInstructions control={control} instructionsRef={instructionsRef} setValue={setValue} getValues={getValues} onEdit={onEditFields} />}
          </>
        )}
      </div>
      <div className="p-4">
        <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-[hsl(144,40%,36%)] px-4 py-3 text-lg font-bold transition-all hover:bg-[hsl(144,40%,29%)]">
          Save
        </button>
      </div>
    </form>
  );
};

export default RecipeEditForm;
