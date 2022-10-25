import * as cheerio from "cheerio"

export const SUPPORTED_DOMAINS = ["dapurumami.com"]

export function getDescriptionFromSelector(html: string) {
  const $ = cheerio.load(html)
  const description =
    $("meta[property='og:description']").attr("content") ||
    $("meta[name='description']").attr("content") ||
    $("meta[name='twitter:description']").attr("content")
  return description ? description.replace(/\n/g, " ").trim() : ""
}

export function getImageFromSelector(html: string) {
  const $ = cheerio.load(html)
  const image =
    $("meta[property='og:image']").attr("content") ||
    $("meta[name='og:image']").attr("content") ||
    $("meta[itemprop='image']").attr("content")
  return image
}

export function getIngredientsFromSelector(html: string, selector: any) {
  const $ = cheerio.load(html)
  const { ingredientSelector, _ingredientQty, _ingredientName } = selector
  const ingredients = [] as any[]
  $(ingredientSelector).each((_, el) => {
    let qty, name
    if (_ingredientQty) qty = $(el).find(_ingredientQty).text()
    if (_ingredientName) name = $(el).find(_ingredientName).text()

    const value = `${qty ?? ""} ${name ?? $(el).text().trim()}`

    ingredients.push(value.trim())
  })
  return ingredients
}

export function getDirectionsFromSelector(html: string, selector: string) {
  const $ = cheerio.load(html)
  const _directions = $(selector)
  const directions = [] as any[]
  _directions.each((_, el) => {
    directions.push($(el).text().replace(/\s\s+/g, " ").trim())
  })
  return directions
}

export const selectors: any = {
  "dapurumami.com": {
    titleSelector: "h1.title",
    ingredientSelector: ".bahanResep > div > div",
    directionsSelector: ".steps > .step p",
    servingsSelector: ".textPorsi > strong"
  }
}
