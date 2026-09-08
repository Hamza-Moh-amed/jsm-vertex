"use client"

import { SearchResponse, SearchSort, SORTS } from '@/lib/search/types'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { Button } from '../ui/button'
import ResultSkeleton from '../ResultSkeleton'
import { pluralize } from '@/lib/format'
import { useRouter } from 'next/navigation'
import { searchHref } from '@/lib/routes'



const SORT_OPTIONS: {value: SearchSort, label: string}[] = [
    {value: "relevance", label: "Most Relevant" },
    {value: "newest", label: "Newest" },
    {value: "duration", label: "Shortest First" }
]

interface SearchResultsProps {
    query: string
    sort: SearchSort
    searchField: ReactNode,
}

type State = {status: "loading"} | {status: "error"} | {status: "ready", response: any | SearchResponse} 

const SearchResults = ({
    query,
    sort,
    searchField,
}: SearchResultsProps) => {

    const [state, setState] = useState<State>({status: "ready", response: "" })
    const [attempt, setAttempt] = useState(0)
    const router = useRouter()


    useEffect(() => {

        // A second search must not be overtaken by the first one finishing late.
        const controller = new AbortController()


        async function run () {
            try {

                const response = await fetch("/api/search", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({query, sort}),
                    signal: controller.signal
                })

                if(!response.ok) throw new Error(`search failed with ${response.status}`)

                setState({status: "ready", response: (await response.json() as SearchResponse)})
                
            } catch (error) {
                if(controller.signal.aborted) return
                console.error("[search]", error)
                setState({status: "error"}) 
            }
        }

        run()
        return () => controller.abort()

    }, [query, sort, attempt])


    const onSortChange = useCallback((value: string) => {
        const next = SORTS.find((option) => option === value) ?? "relevance"
        router.replace(searchHref(query, next), {scroll: false})
    }, [query, router])


    if (state.status === "error") {
        return (
            <>
            <p className='mt-4 text-center text-body-lg text-neutral-500'>
                Search is unavalible rightnow please try again
            </p>
            {searchField}
            <div className='mt-10 flex justify-center'>
                <Button
                className="border border-primary-500 bg-transparent text-primary-500 cursor-pointer"
                size="lg"
                onClick={() => {
                    setState({status: "loading"})
                    setAttempt((value) => value +1)
                }}
                >   
                    Retry
                </Button>
            </div>
            </>
        )
    }

    if (state.status === "loading") {
        return(
            <>
                <p className='mt-4 text-center text-body-lg text-neutral-500'>
                    Searching&hellip;
                </p>
                {searchField}
                <div className='mt-10 flex flex-col gap-4' aria-busy>
                    {[0, 1, 2].map((index) => (
                        <ResultSkeleton key={index} />
                    ))}
                </div>
            </>
        )
    }

    const { response } = state;

    return (
        <>
            <p className='mt-4 text-center text-body-lg text-neutral-500'>
                Found {pluralize(response.count, "result")} across {" "}
                {pluralize(response.courseCount, "course")}
            </p>
            {searchField}

            <div className="mt-9 flex flex-wrap items-center justify-between gap-4">
            <p className='text-sm leading-6 font-medium text-neutral-900'>
                {pluralize(response.count, "result")}
            </p>
            <div className='flex flex-rwo gap-2'>
            <label className='text-base text-neutral-700'>
                Sort Results:
            </label>
            <select
            id='search-sort'
            className='w-full sm:w-41 bg-white text-neutral-700'
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            >
                {SORT_OPTIONS.map(({label, value}) => (
                    <option className='bg-white text-neutral-700' key={value} value={value}>
                        {label}
                    </option>
                ) )}
            </select>
            </div>
            </div>


            <div className='mt-4 flex flex-col gap-4'> 
                Response
            </div>


        </>
    )
}

export default SearchResults

