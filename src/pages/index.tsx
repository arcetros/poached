import type { NextPage } from "next"
import { useRouter } from "next/router"
import React from "react"
import { FiInfo, FiSearch } from "react-icons/fi"

import RecipeData from "@/components/recipe/RecipeData"
import { Container } from "@/components/ui"
import LoadingDots from "@/components/ui/Loading-dots/LoadingDots"
import { isValidHttpUrl } from "@/helpers/isValidHttp"

type QueryParam = {
  url: string
}

const Home: NextPage = () => {
  const router = useRouter()
  const { url } = router.query as QueryParam
  const [value, setValue] = React.useState<string>(url)
  const [modal, setModal] = React.useState<boolean>(false)
  const [isRequested, setIsRequested] = React.useState<boolean>(false)
  const [recipeData, setRecipeData] = React.useState<any>(undefined)

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
          setModal(true)
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
      console.error("Make sure you entered the correct url")
    }
  }

  function onModalClose() {
    setModal(false)
  }

  React.useEffect(() => {
    if (url) {
      fetchRecipe(url)
    }
  }, [url])

  return (
    <Container className="mx-auto flex flex-col gap-y-8 divide-y">
      <div>
        <h1 className="text-2xl font-bold md:text-4xl">carpe-retractum</h1>
        <h2 className="mt-2 text-gray-600">
          Generate recipe without clutters from various websites with an ease.
        </h2>
        <form
          onSubmit={handleSubmitForm}
          className="relative mx-auto mt-4 h-12 w-full rounded-3xl bg-gray-100"
        >
          <FiSearch className="absolute left-5 top-1/2 hidden h-4 w-4 -translate-y-1/2 md:block" />
          <input
            type="text"
            onChange={(event: React.FormEvent<HTMLInputElement>) =>
              setValue(event.currentTarget.value)
            }
            value={value}
            className="h-full w-[calc(100%-75px)] rounded-3xl bg-transparent pl-4 text-sm focus:outline-none md:w-[calc(100%-120px)] md:pl-12"
            placeholder="https://example.com/creamy-courgette-potato-bake"
          />
          <button
            className="absolute right-1 top-1/2 -translate-y-1/2 rounded-3xl bg-[#8df1a6cf] py-2.5 px-2.5 text-sm text-black transition duration-200 ease-out hover:bg-[#7cd492cf] disabled:cursor-not-allowed md:px-6"
            disabled={isRequested}
          >
            <span className="hidden text-[hsl(144,40%,36%)] md:block">
              {isRequested ? <LoadingDots /> : "Search"}
            </span>
            <FiSearch className="block h-4 w-4 text-[hsl(144,40%,36%)] md:hidden" />
          </button>
        </form>
      </div>
      <RecipeData data={recipeData} isRequested={isRequested} url={url} />
      <div className="flex items-start pt-8">
        <span className="rounded-full bg-[#4d68ff51] p-3">
          <FiInfo className="h-6 w-6 text-[hsl(226,74%,58%)]" />
        </span>
        <div className="ml-3">
          <b>Information</b>
          <p className="text-sm">
            The website u entered is not supported? open an <span className="underline">issue</span>{" "}
            and we&apos;ll do our best to add it.
          </p>
        </div>
      </div>
    </Container>
  )
}

export default Home
