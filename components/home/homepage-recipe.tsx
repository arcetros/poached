import React from "react";

import { RecipeLayoutSkeleton, RecipeUndefined } from "../ui/recipe";
import { RecipeData } from "../ui/recipe/recipe";
import RecipeLayout from "../ui/recipe/Recipe-layout";

interface Result extends RecipeData {
  handleSubmitForm: (event: React.FormEvent) => Promise<void>;
  setValue: (value: React.SetStateAction<string>) => void;
  value?: string;
  isRequested: boolean;
}

const HomepageRecipe: React.FunctionComponent<Result> = ({ data, url, isRequested, handleSubmitForm, setValue, value }) => {
  const importProps = { handleSubmitForm, isRequested, setValue, value };

  return (
    <>
      {isRequested && <RecipeLayoutSkeleton />}
      {!isRequested && url && data?.results && <RecipeLayout data={data.results} />}
      {!isRequested && url && !data?.results && <RecipeUndefined {...importProps} />}
    </>
  );
};

export default HomepageRecipe;
