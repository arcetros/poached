import type { NextPage } from "next"
import { useRouter } from "next/router"
import React from "react"
import { FiSearch } from "react-icons/fi"

import { Container } from "@/components/ui"
import LoadingDots from "@/components/ui/Loading-dots/LoadingDots"
import Modal from "@/components/ui/Modal"
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
    <>
      <Container className="mx-auto flex h-screen flex-col items-center justify-center text-gray-100">
        <div className="flex w-full flex-col items-start justify-start md:mx-auto lg:items-center lg:justify-center">
          <h2 className="text-sm font-light text-gray-300 md:text-base">
            Get started with carpe-retractum
          </h2>
          <h1 className="mt-2 text-2xl font-bold md:text-4xl">What are you looking up-to?</h1>
        </div>
        <form
          onSubmit={handleSubmitForm}
          className="relative mx-auto mt-8 inline-flex h-12 w-full rounded-3xl bg-dark-2 lg:w-[75%]"
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
            className="absolute right-1 top-1/2 -translate-y-1/2 rounded-3xl bg-[#48bc873a] py-2.5 px-2.5 text-sm text-black transition duration-200 ease-out hover:bg-[#66ffba3a] disabled:cursor-not-allowed md:px-6"
            disabled={isRequested}
          >
            <span className="hidden text-[#61d09e] md:block">
              {isRequested ? <LoadingDots /> : "Search"}
            </span>
            <FiSearch className="block h-4 w-4 text-[#61d09e] md:hidden" />
          </button>
        </form>
      </Container>
      {modal && (
        <Modal onClose={onModalClose}>
          {recipeData?.results ? recipeData?.results?.name : recipeData?.message}
        </Modal>
      )}
    </>
  )
}

export default Home
