import Image from "next/image"
import React from "react"

type Props = {
  message?: string
}

const RecipeUndefined: React.FunctionComponent<Props> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image alt="notfound" width={404} height={316} src="/notfound.png" />
      <h5 className="text-2xl font-bold">Oops !</h5>
      <p className="mt-1 text-center text-gray-500">{message}</p>
    </div>
  )
}

export default RecipeUndefined
