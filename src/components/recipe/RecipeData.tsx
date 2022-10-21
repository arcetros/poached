import extractDomain from "extract-domain"
import Image from "next/image"
import React from "react"
import { FiLink } from "react-icons/fi"

import s from "./RecipeData.module.css"

type Props = {
  data: any
  url: string
  isRequested?: boolean
}

const RecipeInner: React.FunctionComponent<Props> = ({ data, url }) => {
  console.log(data)
  const extractedDomain = extractDomain(url)
  return (
    <article className={s.root}>
      <div className={s.recipe_head_layout}>
        {" "}
        <h1 className="text-2xl font-bold">{data.name}</h1>
        <span className="flex text-gray-500">
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
        <p>{data.description}</p>
      </div>
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
            <h5 className="text-2xl font-bold lg:text-3xl">Ingredients</h5>
          </header>
          <ul className={s.ingredients_list}>
            {data.ingredients.map((item: string) => {
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
        <h5 className="text-2xl font-bold lg:text-3xl">Instructions</h5>
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

const RecipeData: React.FunctionComponent<Props> = ({ data, url, isRequested }) => {
  return (
    <main>{data?.results ? <RecipeInner data={data.results} url={url} /> : data?.message}</main>
  )
}

export default RecipeData
