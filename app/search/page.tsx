import { PageFrame } from "@/components/layout/page-frame"
import SearchForm from "@/components/search/SearchForm"
import { SiteHeader } from "@/components/SiteHeader"
import { SEARCH_QUERY_PARAM, SEARCH_SORT_PARAM } from "@/lib/routes"
import { MAX_QUERY_LENGTH, SearchSort, SORTS } from "@/lib/search/types"
import { Metadata } from "next"


export const metadata: Metadata = {
  title: "Search",
  description: "Search every lesson and video moment on Vertex in plain English.",
}

function firstValue(value: string | string[] | undefined) {
  return (Array.isArray(value) ? value[0] : value) ?? ""
}


const SearchPage = async ({searchParams}: {searchParams: Promise<Record<string, string | string[] | undefined>>}) => {
  const params = await searchParams

  const query = firstValue(params[SEARCH_QUERY_PARAM]).trim().slice(0, MAX_QUERY_LENGTH)
  const sortParam = firstValue(params[SEARCH_SORT_PARAM])
  const sort: SearchSort = SORTS.find((option) => option === sortParam) ?? "relevance"

  // Keyed on the query so the field always reflects the URL after a new search.
  const searchField = (
    <SearchForm
      key={query}
      id="search-page-input"
      defaultValue={query}
      label="Search your learning"
      placeholder="Search any topic..."
      className="mx-auto mt-8 w-full max-w-181"
    />
  );

  return (
    <PageFrame>
      <SiteHeader />

    <main className="flex flex-1 flex-col px-6 pt-12 pb-16 sm:px-12 xl:px-18 xl:pb-20">

    <div className="flex flex-col items-center text-center">
      <p className="rounded-sm border border-canvas-line bg-surface px-4 py-2 text-xs leading-4 font-semibold tracking-[0.16em] text-primary-500 uppercase">
        Search Results
      </p>

      <h1 className="mt-6 max-w-[22ch] font-display text-3xl font-bold text-balance text-neutral-900 sm:text-4xl lg:text-5xl">
        {query ? 
      <>
      Results for <span className="text-primary-500">&ldquo;{query}&rdquo;</span>
      </>
      :
      <>
      Search your learning
      </>  
      }
      </h1>

      {!query && <p className="mt-4 text-body-lg text-neutral-500">
        Ask in plain English and Vertex finds the exact lesson and moment
        </p>}
    </div>

        {query ? (
         <></>
          
        ) : (
          searchField
        )}

    </main>

    </PageFrame>
  )
}

export default SearchPage