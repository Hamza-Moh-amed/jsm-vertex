"use client"
import { cn } from '@/lib/utils'
import { CurriculumModule } from '@/types/lesson'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { useId, useState } from 'react'




interface LessonSidebarProps {
    courseTitle: string | null
    courseSlug: string | null
    courseImageUrl: string | null
    courseImageAlt: string
    modules: CurriculumModule[];
    precentComplete: number
    /** Modules the learner has finished, shown with a check instead of a chevron. */
    completedModuleKeys?: string[];
    className?: string
}


const LessonSidebar = ({
    courseTitle,
    courseSlug,
    courseImageUrl,
    courseImageAlt,
    modules,
    precentComplete,
    completedModuleKeys,
    className,
}: LessonSidebarProps) => {

    const [isMobileOPen, setIsMobileOpen] = useState(false)
    const panelId = useId()


    const currentModuleNumber = modules.find((module) => module.containsCurrentLesson)?.index
    const value = Math.min(100, Math.max(0, Math.round(precentComplete)))

  return (
    <div className={cn("flex flex-col", className)}>

        <button
        type='button'
        onClick={() => setIsMobileOpen((open) => !open )}
        aria-expanded={isMobileOPen}
        aria-controls={`${panelId}-rail`}
        className='flex items-center justify-between gap-3 border-b border-canvas-line px-5 py-4 text-base leading-6 font-medium text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset lg:hidden'
        >
              Course content
              <ChevronDown 
              className={cn("size-4 text-neutral-500 transition-transform", isMobileOPen && "rotate-180" )}
              strokeWidth={1.5}
              aria-hidden
              />

        </button>

        <div className='flex items-center gap-4 border-b border-canvas-line px-5 py-6'>
            {courseImageUrl && 
            <Image
            src={courseImageUrl}
            alt={courseImageAlt ?? courseTitle}
            width={48}
            height={48}
            className='size-12 shrink-0 rounded-md object-cover'
            />
            }
            <div className='min-w-0 flex-1'>
                <p className='line-clamp-2 text-sm leading-5 font-medium text-neutral-900'>{courseTitle}</p>
                <p className='mt-1.5 text-sm leading-4 text-neutral-500'>{value}% complete</p>

                <div
                
                className='bg-neutral-200 mt-1.5 h-0.75 w-full max-w-38 overflow-hidden rounded-full'
                >
                    <div className='h-full rounded-full bg-primary-500' style={{width: `${value}%`}} />
                </div>
            </div>
        </div>

        {modules.length > 0 && (
            <>
                <p className='flex items-center justify-between gap-3 border-b border-canvas-line px-5 py-4 text-sm leading-5 text-neutral-900'>
                    Module {(currentModuleNumber ?? 0) + 1} of {modules.length}
                    <ChevronDown className='size-4 text-neutral-500' strokeWidth={1.5} aria-hidden />
                </p>
            </>
        )}



    </div>
  )
}

export default LessonSidebar