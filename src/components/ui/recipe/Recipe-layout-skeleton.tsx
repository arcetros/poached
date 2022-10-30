import React from "react"

const RecipeLayoutSkeleton: React.FunctionComponent = () => {
  return (
    <article className="block grid-flow-row-dense grid-cols-12 gap-x-24 gap-y-16 lg:grid">
      <div className="col-start-6 col-end-12 mt-8 mb-8 h-fit lg:mb-0">
        <div className="h-8 w-1/2 animate-pulse rounded-lg bg-gray-300"></div>
        <div className="mt-3 h-4 w-24 animate-pulse rounded-lg bg-gray-500"></div>
      </div>
      <div className="relative col-start-1 col-end-6 row-start-1 row-end-auto mx-[calc(1.5rem*-0.7)] mt-8 lg:mx-0">
        <div className="left-0 top-0 w-full pt-[125%] lg:absolute">
          <picture className="absolute left-0 top-0 h-full w-full animate-pulse rounded-lg bg-gray-300"></picture>
        </div>
      </div>

      <div className="col-start-1 col-end-6 row-start-1 row-end-7 mt-12 lg:mt-8">
        <section className="flex flex-col lg:sticky lg:top-14 lg:left-0 lg:mt-[calc(125%+3rem)] lg:h-[calc(100vh-11rem)]">
          <header className="flex items-center justify-between">
            <div className="h-8 w-2/3 animate-pulse rounded-lg bg-gray-300"></div>
          </header>
          <ul className="mt-8 flex grow flex-col gap-y-4 divide-y overflow-auto lg:mt-4">
            {[...Array(5)].map((_, id) => (
              <li className="animate-pulse rounded-lg bg-gray-200 py-4 first:pt-2" key={id}>
                <label className="flex items-center"></label>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div className="col-start-6 col-end-12 mt-12 lg:mt-0">
        <div className="h-8 w-2/3 animate-pulse rounded-lg bg-gray-300"></div>
        <ol className="mt-8 lg:mt-4">
          {[...Array(5)].map((_, id) => (
            <li className="flex py-4 first:pt-2" key={id}>
              <div className="flex h-12 w-12 shrink-0 grow-0 basis-12 animate-pulse items-center justify-center rounded-full border-2 border-black bg-gray-200">
                <span></span>
              </div>
              <p className="w-full animate-pulse rounded-lg bg-gray-200"></p>
            </li>
          ))}
        </ol>
      </div>
    </article>
  )
}

export default RecipeLayoutSkeleton
