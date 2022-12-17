import clsx from "clsx"
import extractDomain from "extract-domain"
import Image from "next/image"
import React from "react"
import { FiLink } from "react-icons/fi"

import { RootSchema } from "@/types"

import LayoutDuration from "./layouts/Layout-duration"
// import LayoutNutrients from "./layouts/Layout-nutrients"

type RecipeInner = {
  data: RootSchema
}

const RecipeLayout: React.FunctionComponent<RecipeInner> = ({ data }) => {
  const uniqueIngredient = Array.from(new Set(data.recipeIngredients))
  const extractedDomain = data.url && extractDomain(data.url)

  return (
    <article aria-label="recipe-data" className="block grid-flow-row-dense grid-cols-12 gap-x-16 gap-y-16 lg:grid">
      <div className="col-start-6 col-end-13 mb-8 h-fit lg:mb-0">
        <h1 className="font-headline text-3xl font-bold lg:text-5xl">{data.name}</h1>
        <span className="mt-2 flex text-neutral-500">
          from{" "}
          <a href={data.url} target="_blank" rel="noreferrer" className="flex items-center font-medium hover:underline">
            <span className="ml-1">{extractedDomain}</span>
            <FiLink className="mx-1 h-4 w-4" />
          </a>
        </span>
        <dl className="mt-8 flex items-center space-x-4">
          <LayoutDuration label="Total" data={data.totalTime} />
          <LayoutDuration label="Cook" data={data.cookTime} />
          <LayoutDuration label="Prep" data={data.prepTime} />
        </dl>
        <p className={(clsx(data.description ? "block" : "hidden"), "mt-4")}>{data.description}</p>
      </div>
      <div className="relative col-start-1 col-end-6 row-start-1 row-end-auto mx-[calc(1.5rem*-0.65)] lg:mx-0">
        <div className="left-0 top-0 w-full pt-[125%] lg:absolute">
          <picture className="absolute left-0 top-0 h-full w-full">{data?.image && <Image alt={data.name} src={data.image} className="rounded-lg object-cover" fill sizes="1" priority />}</picture>
        </div>
      </div>
      <div className="col-start-1 col-end-6 row-start-1 row-end-7 mt-12 lg:mt-8">
        <section className="flex flex-col lg:sticky lg:top-14 lg:left-0 lg:mt-[calc(125%+3rem)] lg:h-[calc(100vh-11rem)]">
          <header className="flex items-center justify-between">
            <div>
              <h5 id="ingredients-heading" className="text-2xl font-bold lg:text-3xl">
                Ingredients
              </h5>
              <h4 className="mt-1 text-neutral-500">for {data.recipeYield} servings</h4>
            </div>
            <span className="text-xl font-bold">({data.recipeIngredients.length})</span>
          </header>
          <ul aria-labelledby="ingredients-heading" className="scroll mt-8 grow divide-y divide-dark-neutral overflow-auto lg:mt-4">
            {uniqueIngredient.map((item: string) => {
              return (
                <li className="flex py-4 first:pt-2" key={item}>
                  <label className="flex items-center">{item}</label>
                </li>
              )
            })}
          </ul>
        </section>
      </div>
      <div className="col-start-6 col-end-13 mt-12 lg:mt-0">
        <div className="flex items-center justify-between">
          <h5 id="instructions-heading" className="text-2xl font-bold lg:text-3xl">
            Instructions
          </h5>
          <span className="text-xl font-bold">({data.recipeInstructions && data.recipeInstructions.length})</span>
        </div>
        <ol aria-labelledby="instructions-heading" className="mt-8 lg:mt-4">
          {data.recipeInstructions &&
            data.recipeInstructions.map((item: string, id: number) => {
              return (
                <li className="flex py-4 first:pt-2" key={item}>
                  <div className="flex h-12 w-12 shrink-0 grow-0 basis-12 items-center justify-center rounded-full border-2 border-dark-neutral">
                    <span>{id + 1}</span>
                  </div>
                  <p className="ml-4">{item}</p>
                </li>
              )
            })}
        </ol>
      </div>
    </article>
  )
}

export default RecipeLayout
