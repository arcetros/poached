import type { NextPage } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import React from "react"
import { useQuery } from "react-query"

import type { QueryParam } from "@/components/home/types"
import { Container } from "@/components/ui"
import { RecipeLayout, RecipeLayoutSkeleton, RecipeUndefined } from "@/components/ui/recipe"
import { Result } from "@/components/ui/recipe/recipe"
import RecipeHeader from "@/components/ui/recipe/Recipe-header"
import RecipeImportForm from "@/components/ui/recipe/Recipe-import-form"
import Sidebar from "@/components/ui/Sidebar/Sidebar"
import SidebarLayout from "@/components/ui/Sidebar/SidebarLayout"
import { isValidHttpUrl } from "@/helpers/isValidHttp"
import { RootSchema } from "@/types"

export const Home: NextPage = () => {
  const router = useRouter()
  const { url } = router.query as QueryParam

  const { isFetching: isRequested, data: recipeData } = useQuery<Result | undefined, Error>(["scrapRecipe", url], () => fetchRecipe(url), { refetchOnWindowFocus: false })

  const [inputVal, setInputVal] = React.useState<string>(url || "")
  const [recipe, setRecipe] = React.useState<RootSchema | undefined>(recipeData?.results)
  const [onEdit, setOnEdit] = React.useState<boolean>(false)

  async function fetchRecipe(targetUrl: string): Promise<Result | undefined> {
    if (!url) {
      return undefined
    }

    const response = await fetch(`/api/scrap`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(targetUrl)
    })

    const recipe: Result = await response.json()
    setInputVal("")
    return recipe
  }

  async function handleSubmitForm(event: React.FormEvent) {
    event.preventDefault()
    const query: { url: string } = { url: inputVal }
    if (!inputVal || !isValidHttpUrl(query.url)) {
      return alert("Make sure you entered valid url")
    }
    router.push({ pathname: "/", query: `url=${decodeURI(query.url)}` })
  }

  function handleCloseEdit() {
    setOnEdit(false)
  }

  const importProps = { handleSubmitForm, isRequested, setValue: setInputVal, value: inputVal }

  return (
    <section className="relative m-auto flex h-full flex-col">
      {!isRequested && recipeData?.results && <RecipeHeader {...importProps} setOnEdit={setOnEdit} />}
      <Container className="m-auto flex flex-col gap-y-8">
        {!url && !recipeData?.results && (
          <div className="m-auto flex max-w-xl flex-col items-center justify-center px-4 sm:px-0">
            <Image src="/poached_logo.png" alt="Poached Logo" width={150} height={150} className="relative mx-auto object-cover" />
            <p className="mb-6 text-center font-headline text-lg font-bold lg:text-xl">Get just the instructions & ingredients for any recipe. No popups, ads, or annoying clutters</p>
            <RecipeImportForm {...importProps} wfull />
          </div>
        )}
        {isRequested && url && <RecipeLayoutSkeleton />}
        {!isRequested && url && recipeData?.results && <RecipeLayout data={recipeData?.results} url={url} />}
        {!isRequested && url && !recipeData?.results && <RecipeUndefined {...importProps} />}
      </Container>
      {onEdit && (
        <Sidebar onClose={handleCloseEdit}>
          <SidebarLayout handleClose={handleCloseEdit}>Kita bahagia</SidebarLayout>
        </Sidebar>
      )}
    </section>
  )
}

export default Home
