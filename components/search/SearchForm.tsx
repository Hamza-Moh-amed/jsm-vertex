"use client"

import { searchHref } from "@/lib/routes";
import { MAX_QUERY_LENGTH } from "@/lib/search/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SearchInput, SearchInputSize } from "./SearchInpt";

interface SearchFormProps {
  id?: string;
  /** Pre-fills the field, so the results page shows the query it is displaying. */
  defaultValue?: string;
  placeholder?: string;
  label?: string;
  size?: SearchInputSize;
  className?: string;
}

const SearchForm = ({id = "search", defaultValue, size = "md", label = "search", placeholder = "Search any topic...", className}: SearchFormProps) => {
  const router = useRouter()

  // ⌘ K is drawn on the field, so it has to do something.
  useEffect(() => {

    function onKeydown(event: KeyboardEvent) {
      if(event.key !== "k" || !(event.metaKey || event.ctrlKey)) return
      event.preventDefault()
      document.getElementById(id)?.focus()
    }

    window.addEventListener("keydown", onKeydown)
    return(() => window.removeEventListener("keydown", onKeydown))
  }, [id])

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {


    e.preventDefault()

    const field = new FormData(e.target).get("q");
    const query = typeof field === "string" ? field.trim() : ""
    if(!query) return
    console.log(query)
    router.push(searchHref(query))
  }

  return (
    <form onSubmit={handleSubmit} role="search" className={className}>
      <SearchInput
        id={id}
        name="q"
        label={label}
        placeholder={placeholder}
        size={size}
        defaultValue={defaultValue}
        maxLength={MAX_QUERY_LENGTH}
      />
    </form>
  )
}

export default SearchForm