import * as cheerio from "cheerio"

import { Recipe, RecipeProps } from "./Recipe"
import {
  getDescriptionFromSelector,
  getDirectionsFromSelector,
  getImageFromSelector,
  getIngredientsFromSelector,
  selectors
} from "./selectors"
import validateRecipe from "./validateRecipe"

export default function alternativeRecipeData(domain: string, html: string) {
  const $ = cheerio.load(html)
  const recipe: RecipeProps = new (Recipe as any)()
  const {
    titleSelector,
    ingredientSelector,
    _ingredientQty,
    _ingredientName,
    directionsSelector,
    authorSelector,
    servingsSelector
  } = selectors[domain]

  recipe.name = $(titleSelector).text().trim()
  recipe.image = getImageFromSelector(html)
  recipe.description = getDescriptionFromSelector(html)
  recipe.ingredients = getIngredientsFromSelector(html, {
    ingredientSelector,
    _ingredientName,
    _ingredientQty
  })
  recipe.instructions = getDirectionsFromSelector(html, directionsSelector)
  recipe.servings = $(servingsSelector).text()
  recipe.author = $(authorSelector).attr("content") || undefined

  console.log({ recipe })

  return validateRecipe(recipe)
}
