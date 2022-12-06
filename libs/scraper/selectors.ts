import * as cheerio from "cheerio"

export function getTitleFromSelector(html:string) {
  const $ = cheerio.load(html)
  const title = $("meta[property='og:title']").attr("content") || $("meta[name='twitter:title']").attr()
  return title
}

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
