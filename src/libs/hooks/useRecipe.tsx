import { useRouter } from "next/router"
import React from "react"

import { QueryParam } from "@/components/home/types"
import { Result } from "@/components/recipe/recipe"
import { server } from "@/config"
import { isValidHttpUrl } from "@/helpers/isValidHttp"

const useRecipe = () => {
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

  return { recipeData, isRequested, handleSubmitForm, url, value, setValue }
}

export default useRecipe
