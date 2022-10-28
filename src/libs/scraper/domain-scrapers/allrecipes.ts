import * as cheerio from "cheerio"

import { RecipeProps } from "@/types"

import { Recipe } from "../Recipe"
import { getDescriptionFromSelector, getImageFromSelector } from "../selectors"

export default function allrecipes(html: string) {
  const $ = cheerio.load(html)
  const recipe: RecipeProps = new (Recipe as any)()

  recipe.name = $("#article-heading_1-0").text().replace(/\n/g, "")
  recipe.author = $(".mntl-attribution__item-name").text()
  recipe.description = getDescriptionFromSelector(html)
  recipe.image = getImageFromSelector(html)

  $(".mntl-structured-ingredients__list > li > p").each((_, el) => {
    const ingredient = $(el).text().replace(/\s\s+/g, " ").trim()
    recipe.ingredients?.push(ingredient)
  })

  $("#recipe__steps-content_1-0 > #mntl-sc-block_2-0 > li > p").each((_, el) => {
    const directions = $(el).text().replace(/\s\s+/g, " ").trim()
    recipe.instructions.push(directions)
  })

  recipe.time.prep = $('.mntl-recipe-details__item div:contains("Prep Time:")').next().text()
  recipe.time.cook = $('.mntl-recipe-details__item div:contains("Cook Time:")').next().text()
  recipe.time.total = $('.mntl-recipe-details__item div:contains("Total Time:")').next().text()
  recipe.servings = $('.mntl-recipe-details__item div:contains("Servings:")')
    .next()
    .text()
    .replace(/\s/g, "")

  recipe.nutritions.calories = $(
    '.mntl-nutrition-facts-summary__table-body td:contains("Calories")'
  )
    .prev()
    .text()
  recipe.nutritions.fatContent = $('.mntl-nutrition-facts-summary__table-body td:contains("Fat")')
    .prev()
    .text()
  recipe.nutritions.carbohydrateContent = $(
    '.mntl-nutrition-facts-summary__table-body td:contains("Carbs")'
  )
    .prev()
    .text()
  recipe.nutritions.proteinContent = $(
    '.mntl-nutrition-facts-summary__table-body td:contains("Protein")'
  )
    .prev()
    .text()

  return recipe
}
