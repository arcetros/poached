import { NextApiRequest, NextApiResponse } from "next"

import { getRecipeResponse } from "@/libs/scraper/getRecipeResponse"

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { body } = request

  if (request.method !== "POST") {
    response.status(405).send({ message: "Only POST requests allowed" })
    return
  }

  try {
    const recipe = await getRecipeResponse(body)
    response.status(200).send({
      method: request.method,
      status: true,
      message: "success",
      results: recipe
    })
  } catch (err: any) {
    const error =
      err.response?.status > 400
        ? "Site not yet supported or forbidden to access this domain"
        : err.message
    response.status(400).send({ method: request.method, status: false, message: error })
  }
}
