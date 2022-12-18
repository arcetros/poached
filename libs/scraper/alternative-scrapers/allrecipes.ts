import * as cheerio from "cheerio";

import { RootSchema } from "@/types";

import { Recipe } from "../Recipe";
import { getDescriptionFromSelector, getImageFromSelector } from "../selectors";
import validateRecipe from "../validateRecipe";

export default function allrecipes(html: string) {
  const $ = cheerio.load(html);
  const recipe: RootSchema = new (Recipe as any)();

  recipe.name = $("#article-heading_2-0").text().replace(/\n/g, "");
  // recipe.author = $(".mntl-attribution__item-name").text()
  recipe.description = getDescriptionFromSelector(html);
  recipe.image = getImageFromSelector(html);

  $(".mntl-structured-ingredients__list > li > p").each((id, el) => {
    const ingredient = $(el).text().replace(/\s\s+/g, " ").trim();
    recipe.recipeIngredients?.push({ id, item: ingredient });
  });

  $("#recipe__steps-content_1-0 > #mntl-sc-block_2-0 > li > p").each((id, el) => {
    const item = $(el).text().replace(/\s\s+/g, " ").trim();
    recipe.recipeInstructions?.push({ id, item });
  });

  recipe.prepTime = $('.mntl-recipe-details__item div:contains("Prep Time:")').next().text();
  recipe.cookTime = $('.mntl-recipe-details__item div:contains("Cook Time:")').next().text();
  recipe.totalTime = $('.mntl-recipe-details__item div:contains("Total Time:")').next().text();
  recipe.recipeYield = $('.mntl-recipe-details__item div:contains("Servings:")').next().text().replace(/\s/g, "");

  // recipe.nutritions.calories = $(
  //   '.mntl-nutrition-facts-summary__table-body td:contains("Calories")'
  // )
  //   .prev()
  //   .text()
  // recipe.nutritions.fatContent = $('.mntl-nutrition-facts-summary__table-body td:contains("Fat")')
  //   .prev()
  //   .text()
  // recipe.nutritions.carbohydrateContent = $(
  //   '.mntl-nutrition-facts-summary__table-body td:contains("Carbs")'
  // )
  //   .prev()
  //   .text()
  // recipe.nutritions.proteinContent = $(
  //   '.mntl-nutrition-facts-summary__table-body td:contains("Protein")'
  // )
  //   .prev()
  //   .text()

  return validateRecipe(recipe);
}
