import axios from "axios"
import extractDomain from "extract-domain"

import alternativeRecipeData from "./alternativeRecipeData"
import getRecipeData from "./getRecipeData"
import { SUPPORTED_DOMAINS } from "./selectors"

function isDomainSupported(domain: string) {
  return SUPPORTED_DOMAINS.find((d) => d === domain) !== undefined
}

export async function getRecipeResponse(url: string) {
  const parse = extractDomain(url)

  if (parse) {
    if (isDomainSupported(parse)) {
      return axios.get(url).then((response) => {
        const html = response.data as string
        return alternativeRecipeData(parse, html)
      })
    } else {
      return axios.get(url).then((response) => {
        const html = response.data as string
        return getRecipeData(html)
      })
    }
  } else {
    throw new Error("Failed to parse domain")
  }
}
