import React from "react"
import { FiEdit, FiPlus, FiShare2 } from "react-icons/fi"

import RecipeImportForm from "./Recipe-import-form"

type RecipeHeader = {
  handleSubmitForm: (event: React.FormEvent) => Promise<void>
  setOnEdit: React.Dispatch<React.SetStateAction<boolean>>
  setValue: (value: React.SetStateAction<string>) => void
  value?: string
  isRequested: boolean
}

const RecipeHeader: React.FunctionComponent<RecipeHeader> = ({ handleSubmitForm, isRequested, setValue, setOnEdit, value }) => {
  const handleOnEdit = () => setOnEdit((prev) => !prev)

  return (
    <React.Fragment>
      <div className="z-50 flex h-auto w-full flex-col justify-between md:bg-dark-1 md:px-4 md:py-4 lg:flex-row lg:items-center lg:px-8">
        <header className="fixed top-4 right-3 w-[calc(100%-85px)] md:relative md:top-0 md:right-0 md:my-auto md:inline-flex md:h-full md:w-full md:items-center">
          <RecipeImportForm handleSubmitForm={handleSubmitForm} isRequested={isRequested} setValue={setValue} value={value} />
        </header>
        <div className="ml-auto hidden space-x-4 pt-4 md:pt-0 lg:ml-0 lg:flex">
          <button onClick={handleOnEdit} className="flex h-12 items-center space-x-2 rounded-lg px-6 outline outline-1 outline-dark-neutral">
            <FiEdit className="h-5 w-5" />
            <span className="text-sm">Edit</span>
          </button>
          <button className="flex h-12 items-center space-x-2 rounded-lg px-6 outline outline-1 outline-dark-neutral">
            <FiShare2 className="h-4 w-4" />
            <span className="text-sm">Share</span>
          </button>
          <button className="flex h-12 items-center space-x-2 rounded-lg bg-[hsl(144,40%,36%)] px-6">
            <FiPlus className="h-5 w-5" />
            <span className="text-sm">Save</span>
          </button>
        </div>
      </div>
      <div className="fixed bottom-3 right-3 z-30 flex space-x-4 shadow md:right-8 lg:hidden">
        <button className="flex h-16 w-16 items-center justify-center space-x-2 rounded-full bg-[hsl(144,40%,36%)] shadow">
          <FiPlus className="h-8 w-8" />
        </button>
      </div>
    </React.Fragment>
  )
}

export default RecipeHeader
