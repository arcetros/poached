import type { GetStaticProps } from "next"
import { useRouter } from "next/router"
import React from "react"

import { HomepageHeader, HomepageInfo } from "@/components/home"
import HomepageRecipe from "@/components/home/homepage-recipe"
import type { HomePageProps, QueryParam } from "@/components/home/types"
import { Container } from "@/components/ui"
import { Result } from "@/components/ui/recipe/recipe"
import { server } from "@/config"
import { isValidHttpUrl } from "@/helpers/isValidHttp"

export default function Home({ stats }: HomePageProps) {
  const router = useRouter()
  const { url } = router.query as QueryParam

  const [value, setValue] = React.useState<string>(url || "")
  const [isRequested, setIsRequested] = React.useState<boolean>(false)
  const [recipeData, setRecipeData] = React.useState<Result>()

  async function fetchRecipe(targetUrl: string) {
    setIsRequested(true)
    try {
      await fetch(`${server}/api/scrap`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(targetUrl)
      })
        .then((res) => res.json())
        .then((data) => {
          setRecipeData(data)
          setIsRequested(false)
        })
    } catch (err) {
      console.warn(err)
    }
  }

  async function handleSubmitForm(event: React.FormEvent) {
    event.preventDefault()
    const query: { url: string } = { url: value }
    if (value.length > 0 && isValidHttpUrl(query.url)) {
      setRecipeData(undefined)
      router.push({ pathname: "/", query: `url=${decodeURI(query.url)}` })
      fetchRecipe(query.url)
      setValue("")
    } else {
      alert("Make sure you entered valid url")
    }
  }

  React.useEffect(() => {
    if (url) {
      fetchRecipe(url)
    }
  }, [url])

  return (
    <Container className="m-auto flex flex-col gap-y-8 divide-y">
      {/* <HomepageHeader
        handleSubmitForm={handleSubmitForm}
        isRequested={isRequested}
        setValue={setValue}
        stats={stats}
        value={value}
      />
      <HomepageRecipe data={recipeData} isRequested={isRequested} url={url} />
      <HomepageInfo /> */}
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
