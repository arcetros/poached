import type { Result } from "@/components/ui/recipe/recipe"

export const data: Result = {
  message: "success",
  method: "POST",
  results: {
    author: "Rob",
    image:
      "https://images.prismic.io/stryve/9ae78bc2-ad5e-449c-8626-8c9faa37054c_creamy-courgette-potato-bake.png?auto=compress,format",
    ingredients: [
      "1000g Potato",
      "2 Courgette",
      "2 Brown onion",
      "3tsp Olive oil",
      "120g Cashew nuts",
      "200ml Vegetable stock",
      "200ml Almond milk",
      "6 Garlic cloves",
      "18tsp Nutritional yeast",
      "2tsp Sea salt",
      "2tsp Smoked paprika",
      "2tsp Smoked paprika"
    ],
    instructions: [
      "Add cashew nuts to a bowl with enough hot water to cover",
      "Peel and thinly slice the potatoes and courgettes",
      "Thinly slice the onion and add to a pan with olive oil fry for ~5 mins mixing often until lightly brown",
      "Pre-heat the oven on 180°C (355°F)",
      "Drain the water from cashew nuts and place in blender with vegetable stock, almond milk, garlic, nutritional yeast and salt – blend until smooth",
      "To your oven dish add a layer potato, followed by a layer of courgette, followed by the onion",
      "Next sprinkle half of the smoked paprika on top",
      "Continue adding another layer of potato, followed by another layer of courgette and pour ⅔ of the creamy sauce on top",
      "Finish off with one more layer of potatoes, the remaining sauce and the other half of the smoked paprika – place in the oven for 45 mins"
    ],
    name: "Creamy courgette & potato bake",
    nutritions: {
      calories: "572 calories",
      carbohydrateContent: "24.9g",
      fatContent: "73.2g",
      fiberContent: "20.4g",
      proteinContent: "13.8g",
      sugarContent: "10g"
    },
    servings: "4",
    time: { prep: "25 minutes", cook: "45 minutes", total: "70 minutes" }
  },
  status: true
}
