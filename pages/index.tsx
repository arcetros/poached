import clsx from "clsx"
import type { NextPage } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import React from "react"
import { Plus } from "react-feather"
import { useForm } from "react-hook-form"
import { FiEdit } from "react-icons/fi"
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

  const initialEdit = {
    description: recipeData?.results?.description ? (recipeData.results?.description ? true : false) : false,
    ingredients: false,
    instructions: false
  }

  const [onEditFields, setOnEditFields] = React.useState<{ [key: string]: boolean }>(initialEdit)

  const { register, handleSubmit, setValue, reset } = useForm<RootSchema>({
    defaultValues: recipe
  })

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
    setRecipe(recipe.results)
    reset(recipe.results)
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

  function handleDescriptionToggle() {
    if (onEditFields.description) {
      setOnEditFields({ ...onEditFields, description: false })
      setValue("description", undefined)
      return
    }
    setOnEditFields({ ...onEditFields, description: true })
  }

  const importProps = { handleSubmitForm, isRequested, setValue: setInputVal, value: inputVal }

  React.useEffect(() => {
    setOnEditFields(initialEdit)
  }, [recipeData])

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
        {!isRequested && url && recipe && <RecipeLayout data={recipe} />}
        {!isRequested && url && !recipeData?.results && <RecipeUndefined {...importProps} />}
      </Container>
      {recipe && onEdit && (
        <Sidebar onClose={handleCloseEdit}>
          <SidebarLayout handleClose={handleCloseEdit}>
            <form
              onSubmit={handleSubmit((data) => {
                setRecipe(data)
                console.log(data)
              })}
              className="flex h-full flex-col justify-between"
            >
              <div className="flex flex-col px-4 pb-8">
                <div className="border-b border-b-dark-neutral">
                  <h1 className="mb-2 pb-2 font-headline text-2xl font-bold">Edit recipe</h1>
                </div>
                <div className="mt-6 flex flex-col">
                  <label className="mb-1 font-primary text-sm text-neutral-400">Title</label>
                  <div className="relative flex w-full flex-col rounded-md bg-dark-2">
                    <input
                      {...register("name")}
                      type="text"
                      name="name"
                      placeholder="Recipe title"
                      className={clsx("h-10 rounded-md bg-transparent p-2 text-sm focus:outline-none", onEditFields.description ? "w-[calc(100%-170px)]" : "w-[calc(100%-150px)]")}
                    />
                    <button
                      onClick={handleDescriptionToggle}
                      type="button"
                      className="absolute right-1 -top-3 translate-y-1/2 rounded-md bg-dark-1 py-1.5 px-3 text-sm transition duration-200 ease-out hover:bg-[#7cd492cf] disabled:cursor-not-allowed disabled:hover:bg-[#3e3f41]"
                    >
                      <span className="flex items-center space-x-1">
                        <Plus className="h-4 w-4" />
                        <span>{onEditFields.description ? "Remove" : "Add"} Description</span>
                      </span>
                    </button>
                  </div>
                </div>
                {onEditFields.description && (
                  <div className="mt-6 flex h-36 flex-col">
                    <label className="mb-1 font-primary text-sm text-neutral-400">Description</label>
                    <div className="relative flex h-full w-full flex-col rounded-md bg-dark-2">
                      <textarea
                        {...register("description")}
                        name="description"
                        placeholder="Describe recipe about"
                        className="h-full w-full resize-none overflow-auto rounded-md bg-transparent p-2 text-sm focus:outline-none"
                      />
                    </div>
                  </div>
                )}
                <div className="mt-4 flex flex-col">
                  <label className="mb-1 font-primary text-sm text-neutral-400">Url</label>
                  <div className="relative flex w-full flex-col rounded-md bg-dark-2">
                    <input type="text" {...register("url")} placeholder="Recipe title" className="h-10 w-full rounded-md bg-transparent p-2 text-sm focus:outline-none" />
                  </div>
                </div>
                <div className="mt-4 flex flex-col">
                  <label className="mb-1 font-primary text-sm text-neutral-400">Yield</label>
                  <div className="relative flex w-full flex-col rounded-md bg-dark-2">
                    <input type="number" {...register("recipeYield")} placeholder="Recipe title" className="h-10 w-full rounded-md bg-transparent p-2 text-sm focus:outline-none" />
                  </div>
                </div>
                <button
                  onClick={() => setOnEditFields({ ...onEditFields, ingredients: !onEditFields.ingredients })}
                  className="mt-4 flex items-center justify-center space-x-2 rounded-lg bg-dark-2 p-3 transition-all hover:bg-dark-neutral"
                >
                  <FiEdit className="h-4 w-4" /> <span className="text-sm">Edit Ingredients</span>
                </button>
                {onEditFields.ingredients && (
                  <div className="mt-6 flex flex-col">
                    <label className="mb-1 font-primary text-neutral-400">Ingredients</label>
                    {recipe.recipeIngredients.map((ingredient, id) => (
                      <input
                        type="text"
                        {...register(`recipeIngredients.${id}`)}
                        key={id}
                        placeholder="Recipe title"
                        className="h-10 w-[calc(100%-150px)] rounded-md bg-transparent p-2 text-sm focus:outline-none"
                      />
                    ))}
                  </div>
                )}
                {recipe.recipeInstructions && (
                  <>
                    <button
                      onClick={() => setOnEditFields({ ...onEditFields, instructions: !onEditFields.instructions })}
                      className="mt-3 flex items-center justify-center space-x-2 rounded-lg bg-dark-2 p-3 transition-all hover:bg-dark-neutral"
                    >
                      <FiEdit className="h-4 w-4" /> <span className="text-sm">Edit Instructions</span>
                    </button>
                    {onEditFields.instructions && (
                      <div className="mt-6 flex flex-col">
                        <label className="mb-1 font-primary text-neutral-400">Instructions</label>
                        {recipe?.recipeInstructions.map((instructions, id) => (
                          <div
                            contentEditable
                            onInput={(event) => {
                              setValue(`recipeInstructions.${id}`, event.currentTarget.textContent as string, { shouldValidate: true })
                            }}
                            key={instructions}
                            draggable
                            className="rounded-md bg-transparent p-2 text-sm focus:outline-none"
                          >
                            {instructions}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="p-4">
                <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-[hsl(144,40%,36%)] px-4 py-3 text-lg font-bold transition-all hover:bg-[hsl(144,40%,29%)]">
                  Save
                </button>
              </div>
            </form>
          </SidebarLayout>
        </Sidebar>
      )}
    </section>
  )
}

export default Home
