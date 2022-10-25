import { NextApiRequest, NextApiResponse } from "next"

import { getRecipeResponse } from "@/libs/scraper/getRecipeResponse"

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { body } = request

  if (request.method !== "POST") {
    response.status(405).send({ message: "Only POST requests allowed" })
    return
  }

  try {
    const test = await getRecipeResponse(body)
    console.log(test)
    const recipe = await fetch(`${process.env.MAIN_API}/api/search/?q=${body}`)
    const res = await recipe.json()
    response.status(200).send(res)
    return
  } catch (err) {
    response.status(400).send({ error: err })
    return
  }
}
