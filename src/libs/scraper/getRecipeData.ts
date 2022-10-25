import * as cheerio from "cheerio"

import { parsePTTime } from "./parsePTTime"
import { Recipe, RecipeProps } from "./Recipe"
import { getDescriptionFromSelector, getImageFromSelector } from "./selectors"
import validateRecipe from "./validateRecipe"

function decodeHTML(html: string, element: string) {
  const $ = cheerio.load(html)
  const res = $("<div>").html(element).text() || ""

  return res
    .trim()
    .replace(/amp;/gm, "")
    .replace(/(?=\[caption).*?(?<=\[ caption\])/g, "")
    .replace(/\n/g, "")
}

export default function getRecipeData(html: string) {
  const $ = cheerio.load(html)
  const _recipe: RecipeProps = new (Recipe as any)()

  const jsonLDs = Object.values($("script[type='application/ld+json']"))

  jsonLDs.forEach((json) => {
    if (json && json.children && Array.isArray(json.children)) {
      json.children.forEach((el: any) => {
        if (el.data) {
          const jsonRaw = el.data
          try {
            const result = JSON.parse(jsonRaw)
            let recipe: any

            if (result["@graph"] && Array.isArray(result["@graph"])) {
              result["@graph"].forEach((g) => {
                if (g["@type"] === "Recipe") {
                  recipe = g
                }
              })
            }

            if (result["@type"] === "Recipe") {
              recipe = result
            }

            if (Array.isArray(result["@type"]) && result["@type"].includes("Recipe")) {
              recipe = result
            }

            if (recipe) {
              try {
                _recipe.name = decodeHTML(html, recipe.name)

                if (recipe.description) {
                  _recipe.description = decodeHTML(html, recipe.description)
                } else {
                  getDescriptionFromSelector(html)
                }

                if (Array.isArray(recipe.image)) {
                  recipe.image = recipe.image[0]
                }

                if (recipe.image) {
                  if (recipe.image["@type"] === "ImageObject" && recipe.image.url) {
                    _recipe.image = recipe.image.url
                  } else if (typeof recipe.image === "string") {
                    _recipe.image = recipe.image
                  }
                } else {
                  getImageFromSelector(html)
                }

                if (Array.isArray(recipe.recipeIngredient)) {
                  _recipe.ingredients = recipe.recipeIngredient.map((i: string) =>
                    decodeHTML(html, i)
                  )
                } else if (typeof recipe.recipeIngredient === "string") {
                  _recipe.ingredients = recipe.recipeIngredient
                    .split(",")
                    .map((i: string) => decodeHTML(html, i.trim()))
                }

                if (
                  recipe.recipeInstructions &&
                  recipe.recipeInstructions["@type"] === "ItemList" &&
                  recipe.recipeInstructions.itemListElement
                ) {
                  recipe.recipeInstructions.itemListElement.forEach((section: any) => {
                    _recipe.instructions = [
                      ..._recipe.instructions,
                      ...section.itemListElement.map((i: any) => decodeHTML(html, i.text))
                    ]
                  })
                } else if (Array.isArray(recipe.recipeInstructions)) {
                  recipe.recipeInstructions.forEach((instructionStep: any) => {
                    if (instructionStep["@type"] === "HowToStep") {
                      _recipe.instructions.push(decodeHTML(html, instructionStep.text))
                    } else if (typeof instructionStep === "string") {
                      _recipe.instructions.push(decodeHTML(html, instructionStep))
                    } else if (typeof recipe.recipeInstructions === "string") {
                      _recipe.instructions = [decodeHTML(html, recipe.recipeInstructions)]
                    }
                  })
                }

                if (recipe.nutrition) {
                  _recipe.nutritions = recipe.nutrition
                  delete recipe.nutrition["@type"]
                }

                if (recipe.prepTime) {
                  _recipe.time.prep = parsePTTime(recipe.prepTime)
                }

                if (recipe.cookTime) {
                  _recipe.time.cook = parsePTTime(recipe.cookTime)
                }

                if (recipe.totalTime) {
                  _recipe.time.total = parsePTTime(recipe.totalTime)
                }

                if (Array.isArray(recipe.recipeYield)) {
                  _recipe.servings = recipe.recipeYield[0]
                } else if (typeof recipe.recipeYield === "string") {
                  _recipe.servings = recipe.recipeYield
                }
                _recipe.servings = recipe.recipeYield.toString()
                _recipe.author = recipe.author.name
              } catch (err) {
                throw new Error("Something went wrong")
              }
            }
          } catch (err) {
            throw new Error("Site is not yet supported")
          }
        }
      })
    }
  })
  console.log(_recipe)
  return validateRecipe(_recipe)
}
