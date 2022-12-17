import * as cheerio from "cheerio"

import { RootSchema } from "@/types"

import { Recipe } from "../Recipe"
import { getDescriptionFromSelector, getImageFromSelector, getTitleFromSelector } from "../selectors"
import validateRecipe from "../validateRecipe"

export default function eatingWell(html: string) {
  const $ = cheerio.load(html)
  const recipe: RootSchema = new (Recipe as any)()

  const recipeInfoSection = ".recipe-info-section > .recipe-meta-container > div > .recipe-meta-item"

  recipe.name = getTitleFromSelector(html) as string
  recipe.description = getDescriptionFromSelector(html)
  recipe.image = getImageFromSelector(html)

  $(".ingredients-section > li > label > span > .ingredients-item-name").each((id, el) => {
    const item = $(el).text().replace(/\s\s+/g, " ").trim()
    recipe.recipeIngredients?.push({ id, item })
  })

  $(".instructions-section > li > .section-body > div > p").each((id, el) => {
    const item = $(el).text().replace(/\s\s+/g, " ").trim()
    recipe.recipeInstructions?.push({ id, item })
  })

  $(".recipe-info-section > .nutrition-profile > ul > li > a").each((_, el) => {
    const categories = $(el).text().replace(/\s\s+/g, " ").trim()
    recipe.recipeCategories?.push(categories)
  })

  recipe.totalTime = $(`${recipeInfoSection} div:contains("total:")`).next().text().replace(/\s\s+/g, " ").trim()
  recipe.recipeYield = $(`${recipeInfoSection} div:contains("Servings:")`).next().text().replace(/\s\s+/g, " ").trim()

  return validateRecipe(recipe)
}
