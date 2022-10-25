import axios from "axios"
import extractDomain from "extract-domain"

import { SUPPORTED_DOMAINS } from "./selectors"

function isDomainSupported(domain: string) {
  return SUPPORTED_DOMAINS.find((d) => d === domain) !== undefined
}

export async function getRecipeResponse(url: string) {
  const parse = extractDomain(url)

  if (parse) {
    if (isDomainSupported(parse)) {
      return axios.get(url).then((response) => {
        const html = response.data
        return html
      })
    } else {
      console.log("Alternative..")
    }
  } else {
    throw new Error("Failed to parse domain")
  }
}
