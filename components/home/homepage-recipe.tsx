import React from "react"

import { RecipeLayoutSkeleton, RecipeUndefined } from "../ui/recipe"
import { RecipeData } from "../ui/recipe/recipe"
import RecipeLayout from "../ui/recipe/Recipe-layout"

const HomepageRecipe: React.FunctionComponent<RecipeData> = ({ data, url, isRequested }) => {
  return (
    <>
      {isRequested && <RecipeLayoutSkeleton />}
      {!isRequested && url && data?.results && <RecipeLayout data={data.results} url={url} />}
      {!isRequested && url && !data?.results && <RecipeUndefined message={data?.message} />}
    </>
  )
}

export default HomepageRecipe
