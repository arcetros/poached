import type { NextPage } from "next"
import { useRouter } from "next/router"
import React from "react"

type QueryParam = {
  search: string
}

const Recipe: NextPage = () => {
  const router = useRouter()
  const { search } = router.query as QueryParam

  return (
    <div className="container mx-auto flex h-screen items-center justify-center text-teal-500">
      <h1 className="text-3xl font-bold">{search}</h1>
    </div>
  )
}

export default Recipe
