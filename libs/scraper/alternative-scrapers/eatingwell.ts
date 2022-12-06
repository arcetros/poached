import * as cheerio from "cheerio"

import { RootSchema } from "@/types"

import { Recipe } from "../Recipe"
import {
  getDescriptionFromSelector,
  getImageFromSelector,
  getTitleFromSelector
} from "../selectors"
import validateRecipe from "../validateRecipe"

export default function eatingWell(html: string) {
  const $ = cheerio.load(html)
  const recipe: RootSchema = new (Recipe as any)()

  recipe.name = getTitleFromSelector(html) as string
  recipe.description = getDescriptionFromSelector(html)
  recipe.image = getImageFromSelector(html)

  $(".ingredients-section > li > label > span > .ingredients-item-name").each((_, el) => {
    const ingredient = $(el).text().replace(/\s\s+/g, " ").trim()
    recipe.recipeIngredients?.push(ingredient)
  })

  $(".instructions-section > li > .section-body > div > p").each((_, el) => {
    const directions = $(el).text().replace(/\s\s+/g, " ").trim()
    recipe.recipeInstructions?.push(directions)
  })

  return validateRecipe(recipe)
}
