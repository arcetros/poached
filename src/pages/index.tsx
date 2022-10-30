import type { GetStaticProps } from "next"
import React from "react"

import { HomepageHeader, HomepageInfo } from "@/components/home"
import HomepageRecipe from "@/components/home/homepage-recipe"
import type { HomePageProps } from "@/components/home/types"
import { Container } from "@/components/ui"
import { useRecipe } from "@/libs/hooks"

export default function Home({ stats }: HomePageProps) {
  const { recipeData, isRequested, handleSubmitForm, value, setValue, url } = useRecipe()

  return (
    <Container className="m-auto flex flex-col gap-y-8 divide-y">
      <HomepageHeader
        handleSubmitForm={handleSubmitForm}
        isRequested={isRequested}
        setValue={setValue}
        stats={stats}
        value={value}
      />
      <HomepageRecipe data={recipeData} isRequested={isRequested} url={url} />
      <HomepageInfo />
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(process.env.REPO_STATS as string)
  const stats = await response.json()

  return {
    props: {
      stats: {
        starGazer: stats.stargazers_count,
        origin: stats.html_url,
        forkUrl: "https://github.com/arcetros/poached/fork"
      }
    },
    revalidate: 10
  }
}
