import type { GetStaticProps } from "next"
import { useRouter } from "next/router"
import React from "react"
import { FiPlus, FiShare2 } from "react-icons/fi"

import { HomepageHeader } from "@/components/home"
import HomepageRecipe from "@/components/home/homepage-recipe"
import type { HomePageProps, QueryParam } from "@/components/home/types"
import { Container } from "@/components/ui"
import { Result } from "@/components/ui/recipe/recipe"
import { server } from "@/config"
import { isValidHttpUrl } from "@/helpers/isValidHttp"

export default function Home({ stats }: HomePageProps) {
  console.log(stats)
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
    <section className="flex flex-col">
      <div className="z-40 flex h-auto w-full flex-col justify-between bg-dark-1 py-6 px-4 lg:h-20 lg:flex-row lg:items-center lg:px-8 lg:py-0">
        <HomepageHeader handleSubmitForm={handleSubmitForm} isRequested={isRequested} setValue={setValue} value={value} />
        <div className="ml-auto hidden space-x-4 pt-4 md:flex md:pt-0 lg:ml-0">
          <button className="flex h-12 items-center space-x-2 rounded-lg px-6 outline outline-1 outline-dark-neutral">
            <FiShare2 className="h-4 w-4" />
            <span className="text-sm">Share</span>
          </button>
          <button className="flex h-12 items-center space-x-2 rounded-lg bg-[hsl(144,40%,36%)] px-6">
            <FiPlus className="h-5 w-5" />
            <span className="text-sm">Save</span>
          </button>
        </div>
        <div className="fixed bottom-3 right-3 z-50 flex space-x-4 shadow lg:hidden">
          <button className="flex h-16 w-16 items-center justify-center space-x-2 rounded-full bg-[hsl(144,40%,36%)] shadow">
            <FiPlus className="h-8 w-8" />
          </button>
        </div>
      </div>
      <Container className="m-auto flex flex-col gap-y-8">
        <HomepageRecipe data={recipeData} isRequested={isRequested} url={url} />
      </Container>
    </section>
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
