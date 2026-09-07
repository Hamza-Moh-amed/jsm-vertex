import { lessonHref } from '@/lib/routes'
import { cn } from '@/lib/utils'
import { CurriculumLesson } from '@/types/lesson'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import LessonFooterNavLink from './LessonFooterNavLink'
import { formatDuration } from '@/lib/format'


interface LessonFooterNavProps {
    previous: CurriculumLesson | null,
    next: CurriculumLesson | null,
    currentLessonSlug: string
    className?: string
}

const LessonFooterNav = ({previous,
    next,
    currentLessonSlug, className}: LessonFooterNavProps) => {
  return (
    <nav
    aria-label='Lesson Navigation'
    className={cn("flex gap-2 border-t border-canvas-line px-4 py-5 flex-row justify-between sm:items-center sm:gap-6 sm:px-8", className)}
    
    >
        {previous?.slug ? (
            <div className='flex items-center gap-5'>
            <LessonFooterNavLink 
            href={lessonHref(previous.slug)}
            >
             <ArrowLeft className="size-4" strokeWidth={2} aria-hidden />
             Previous Lesson
        </LessonFooterNavLink>
        <span className='hidden min-w-0 lg:block'>
            <span className='block truncate text-sm leading-5 text-neutral-900'>
                {previous.title}
            </span>
            <span className='block text-sm leading-5 text-neutral-500'>
                {formatDuration(previous.duration)}
            </span>
        </span>
        </div>
        ) : 
        (
            <span className='hidden sm:block'>

            </span>
        )
        }



        {next?.slug && (
            <div className='flex items-center gap-5 sm:ml-auto'>
                <span className='hidden min-w-0 text-right lg:block'>
                <span className="block truncate text-sm leading-5 text-neutral-900">
                    {next.title}
                    </span>
                    <span className="block text-sm leading-5 text-neutral-500">
                        {formatDuration(next.duration)}
                    </span>
                </span>
                <LessonFooterNavLink
                href={lessonHref(next.slug)}
                >
                    Next Lesson
                    <ArrowRight className='size-4' strokeWidth={2} aria-hidden  />
                </LessonFooterNavLink>
            </div>
        )}

    </nav>
  )
}

export default LessonFooterNav