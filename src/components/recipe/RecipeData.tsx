import clsx from "clsx"
import extractDomain from "extract-domain"
import Image from "next/image"
import React from "react"
import { FiLink } from "react-icons/fi"

import { extractNumbers } from "@/helpers/extractNumbers"

import NoResult from "./NoResult"
import { Recipe, RecipeData } from "./recipe"
import s from "./RecipeData.module.css"
import RecipeDataSkeleton from "./RecipeDataSkeleton"

type RecpeInner = {
  data: Recipe
  url: string
}

const RecipeInner: React.FunctionComponent<RecpeInner> = ({ data, url }) => {
  const uniqueIngredient = Array.from(new Set(data.ingredients))
  const extractedDomain = extractDomain(url)

  return (
    <article className={s.root}>
      <div className={s.recipe_head_layout}>
        <h1>{data.name}</h1>
        <span className="mt-2 flex text-gray-500">
          from{" "}
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center font-medium hover:underline"
          >
            <span className="ml-1">{extractedDomain}</span>
            <FiLink className="mx-1 h-4 w-4" />
          </a>
        </span>
        <dl className="mt-8 flex items-center space-x-4">
          <div className={clsx("flex flex-col gap-x-1 lg:flex-row", !data.time.total && "hidden")}>
            <dt>Total</dt>
            <dd className="font-bold">{data.time.total}</dd>
          </div>
          <div className={clsx("flex flex-col gap-x-1 lg:flex-row", !data.time.cook && "hidden")}>
            <dt>Cook</dt>
            <dd className="font-bold">{data.time.cook}</dd>
          </div>
          <div className={clsx("flex flex-col gap-x-1 lg:flex-row", !data.time.prep && "hidden")}>
            <dt>Prep</dt>
            <dd className="font-bold">{data.time.prep}</dd>
          </div>
        </dl>
        <p className={clsx(data.description ? "block" : "hidden")}>{data.description}</p>
      </div>
      <section className={s.nutrition_layout}>
        <h5>
          <span className="text-red-500">*</span> Nutrition per serving
        </h5>
        <div className="scroll mt-4 flex max-w-fit space-x-3 overflow-x-auto">
          <div className="rounded-full bg-gray-100 py-2 px-2">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-[hsl(144,37%,49%)]">
              {extractNumbers(data.nutritions?.calories)}
            </div>
            <dt className="pt-2 pb-4 text-center text-sm text-gray-600">Calories</dt>
          </div>
          <div className="rounded-full bg-gray-100 py-2 px-2">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-[hsl(144,37%,49%)]">
              {extractNumbers(data.nutritions?.fiberContent)}
              {data.nutritions?.fiberContent && "g"}
            </div>
            <dt className="pt-2 pb-4 text-center text-sm text-gray-600">Fiber</dt>
          </div>
          <div className="rounded-full bg-gray-100 py-2 px-2">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-[hsl(144,37%,49%)]">
              {extractNumbers(data.nutritions?.proteinContent)}
              {data.nutritions?.proteinContent && "g"}
            </div>
            <dt className="pt-2 pb-4 text-center text-sm text-gray-600">Protein</dt>
          </div>
          <div className="rounded-full bg-gray-100 py-2 px-2">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-[hsl(144,37%,49%)]">
              {extractNumbers(data.nutritions?.carbohydrateContent)}
              {data.nutritions?.carbohydrateContent && "g"}
            </div>
            <dt className="pt-2 pb-4 text-center text-sm text-gray-600">Carbs</dt>
          </div>
          <div className="rounded-full bg-gray-100 py-2 px-2">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-[hsl(144,37%,49%)]">
              {extractNumbers(data.nutritions?.proteinContent)}
              {data.nutritions?.proteinContent && "g"}
            </div>
            <dt className="pt-2 pb-4 text-center text-sm text-gray-600">Fats</dt>
          </div>
          <div className="rounded-full bg-gray-100 py-2 px-2">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-[hsl(144,37%,49%)]">
              {extractNumbers(data.nutritions?.sugarContent)}
              {data.nutritions?.sugarContent && "g"}
            </div>
            <dt className="pt-2 pb-4 text-center text-sm text-gray-600">Sugars</dt>
          </div>
        </div>
      </section>
      <div className={s.image_layout}>
        <div className={s.layout_inner}>
          <picture>
            {data?.image && <Image src={data.image} layout="fill" objectFit="cover" />}
          </picture>
        </div>
      </div>

      <div className={s.ingredients_layout}>
        <section className={s.ingredients_wrapper}>
          <header>
            <div>
              <h5 className="text-2xl font-bold lg:text-3xl">Ingredients</h5>
              <h4 className="mt-1 text-gray-500">for {data.servings} servings</h4>
            </div>
            <span className="text-xl font-bold">({data.ingredients.length})</span>
          </header>
          <ul className={clsx(s.ingredients_list, "scroll")}>
            {uniqueIngredient.map((item: string) => {
              return (
                <li className="flex py-4 first:pt-2" key={item}>
                  <label className={s.ingredient}>{item}</label>
                </li>
              )
            })}
          </ul>
        </section>
      </div>
      <div className={s.instructions_layout}>
        <div className="flex items-center justify-between">
          <h5 className="text-2xl font-bold lg:text-3xl">Instructions</h5>
          <span className="text-xl font-bold">({data.instructions.length})</span>
        </div>
        <ol>
          {data.instructions.map((item: string, id: number) => {
            return (
              <li key={item}>
                <div className={s.instruction_order}>
                  <span>{id + 1}</span>
                </div>
                <p>{item}</p>
              </li>
            )
          })}
        </ol>
      </div>
    </article>
  )
}

const RecipeData: React.FunctionComponent<RecipeData> = ({ data, url, isRequested }) => {
  return (
    <>
      {isRequested && <RecipeDataSkeleton />}
      {!isRequested && data?.results && <RecipeInner data={data.results} url={url} />}
      {!isRequested && url && !data?.results && <NoResult message={data?.message} />}
    </>
  )
}

export default RecipeData
