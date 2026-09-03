import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import SearchForm from '../search/SearchForm'

const Hero = () => {
  return (
    <section className="flex flex-col items-center px-6 pt-14 pb-16 text-center sm:px-12 sm:pt-16 sm:pb-20 xl:px-18 xl:pt-10 xl:pb-24">
        
        <p className="rounded-sm border border-canvas-line bg-surface px-5 py-3 text-[11px] leading-4 font-semibold tracking-[0.16em] text-primary-500 uppercase">
            Intelligent learning
        </p>

        <h1 className="mt-10 max-w-[16ch] font-display text-[40px] leading-[1.2] font-bold text-balance text-neutral-900 sm:text-[52px] lg:text-[60px] lg:leading-18.5">
            Search your learning in plain English.
        </h1>

        <p className="mt-7 max-w-[46ch] text-[17px] leading-8 text-balance text-neutral-500 sm:text-[18px]">
        Vertex understands what you want to learn and finds the exact lessons across all your
        courses.
       </p>

        <Link href="/courses"
        className="flex flex-row gap-2 items-center bg-primary-600 px-6 py-4 text-white font-light mt-10 rounded-md"
        >
            <span>
                Explore Courses
            </span>
        <ArrowRight className="size-5" strokeWidth={1.5} aria-hidden />
        </Link>


        <SearchForm
        id="home-search"
        size="lg"
        label="Ask anything about your learning"
        placeholder="Ask anything about your learning..."
        className="mt-10 w-full max-w-200"
      />

    </section>
  )
}

export default Hero