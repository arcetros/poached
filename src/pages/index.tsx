import type { GetStaticProps } from "next"
import { useRouter } from "next/router"
import React from "react"
import { AiOutlineFork, AiOutlineStar } from "react-icons/ai"
import { FiInfo, FiSearch } from "react-icons/fi"

import type { Result } from "@/components/recipe/recipe"
import RecipeData from "@/components/recipe/RecipeData"
import { Container } from "@/components/ui"
import LoadingDots from "@/components/ui/Loading-dots/LoadingDots"
import { isValidHttpUrl } from "@/helpers/isValidHttp"

type QueryParam = {
  url: string
}

type Stats = {
  starGazer: number
  origin: string
  forkUrl: string
}

type HomePageProps = {
  stats: Stats
  test: string
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(process.env.REPO_STATS as string)
  const _stats = await response.json()

  return {
    props: {
      stats: {
        starGazer: _stats.stargazers_count,
        origin: _stats.html_url,
        forkUrl: "https://github.com/arcetros/transcendent/fork"
      }
    },
    revalidate: 10
  }
}

export default function Home({ stats }: HomePageProps) {
  const router = useRouter()
  const { url } = router.query as QueryParam
  const [value, setValue] = React.useState<string>(url || "")
  const [isRequested, setIsRequested] = React.useState<boolean>(false)
  const [recipeData, setRecipeData] = React.useState<Result>()

  async function fetchRecipe(targetUrl: string) {
    setIsRequested(true)
    try {
      await fetch("/api/scrap", {
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
      console.log(err)
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
      //TODO : Toast or form warning?
      console.error("Make sure you entered the correct url")
    }
  }

  React.useEffect(() => {
    if (url) {
      fetchRecipe(url)
    }
  }, [url])

  return (
    <Container className="m-auto flex flex-col gap-y-8 divide-y">
      <header>
        <div className="flex flex-col items-start justify-between lg:flex-row   lg:items-center">
          <h1 className="text-2xl font-bold md:text-4xl">transcendent</h1>
          <div className="mt-1 flex space-x-3 lg:mt-0 lg:ml-3">
            <a
              href={stats.origin}
              target="_blank"
              className="flex items-center gap-x-1 py-1.5"
              rel="noreferrer"
            >
              <AiOutlineStar className="h-5 w-5" />
              {stats.starGazer}
            </a>
            <a
              href={stats.forkUrl}
              target="_blank"
              className="flex items-center gap-x-1 rounded-2xl px-2 py-1.5"
              rel="noreferrer"
            >
              <AiOutlineFork className="h-5 w-5" />
              <span className="text-sm text-[hsl(144,40%,36%)]">Fork</span>
            </a>
          </div>
        </div>
        <h2 className="mt-4 text-gray-500 lg:mt-1">
          Generate recipe without clutters from various websites with an ease.
        </h2>
        <form
          onSubmit={handleSubmitForm}
          className="relative mx-auto mt-4 h-12 w-full rounded bg-white outline outline-1 outline-gray-200"
        >
          <FiSearch className="absolute left-5 top-1/2 hidden h-4 w-4 -translate-y-1/2 md:block" />
          <input
            type="text"
            onChange={(event: React.FormEvent<HTMLInputElement>) =>
              setValue(event.currentTarget.value)
            }
            value={value}
            className="h-full w-[calc(100%-75px)] rounded bg-transparent pl-4 text-sm focus:outline-none md:w-[calc(100%-120px)] md:pl-12"
            placeholder="https://example.com/creamy-courgette-potato-bake"
          />
          <button
            className="absolute right-1 top-1/2 -translate-y-1/2 rounded bg-[#8df1a6cf] py-2.5 px-2.5 text-sm text-black transition duration-200 ease-out hover:bg-[#7cd492cf] disabled:cursor-not-allowed md:px-6"
            disabled={isRequested}
          >
            <span className="hidden text-[hsl(144,40%,36%)] md:block">
              {isRequested ? <LoadingDots /> : "Search"}
            </span>
            <FiSearch className="block h-4 w-4 text-[hsl(144,40%,36%)] md:hidden" />
          </button>
        </form>
      </header>
      <RecipeData data={recipeData} isRequested={isRequested} url={url} />
      <div className="flex items-start pt-8">
        <span className="rounded-full bg-[#4d68ff51] p-3">
          <FiInfo className="h-6 w-6 text-[hsl(226,74%,58%)]" />
        </span>
        <div className="ml-3">
          <b>Information</b>
          <p className="text-sm">
            The website u entered is not supported? open an{" "}
            <a
              href="https://github.com/arcetros/retractum-api/issues"
              target="_blank"
              className="underline"
              rel="noreferrer"
            >
              issue
            </a>{" "}
            and we&apos;ll do our best to add it.
          </p>
        </div>
      </div>
    </Container>
  )
}
