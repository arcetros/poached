import extractDomain from "extract-domain"

import { allrecipes } from "./domain-scrapers"
import getRecipeData from "./getRecipeData"

const domains: any = {
  "allrecipes.com": allrecipes
}

function isDomainSupported(domain: string) {
  return Object.keys(domains).find((d) => d === domain) !== undefined
}

export async function getRecipeResponse(url: string) {
  const parse = extractDomain(url)

  if (parse) {
    if (isDomainSupported(parse)) {
      if (domains[parse] !== undefined) {
        return fetch(url).then(async (response) => {
          const html = await response.text()
          return domains[parse](html)
        })
      } else {
        throw new Error("Site is not yet supported")
      }
    } else {
      return fetch(url).then(async (response) => {
        const html = await response.text()
        return getRecipeData(html)
      })
    }
  } else {
    throw new Error("Failed to parse domain")
  }
}
