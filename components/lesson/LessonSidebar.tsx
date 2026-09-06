"use client"
import { formatDuration } from '@/lib/format'
import { lessonHref } from '@/lib/routes'
import { cn } from '@/lib/utils'
import { CurriculumModule } from '@/types/lesson'
import { Check, ChevronDown, Play } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
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
    completedModuleKeys = [],
    className,
}: LessonSidebarProps) => {

    const currentModuleKey = modules.find((module) => module.containsCurrentLesson)?._key

    const [openKeys, setOpenKeys] = useState<string[]>(currentModuleKey ? [currentModuleKey] : [])
    const [isMobileOPen, setIsMobileOpen] = useState(false)
    const panelId = useId()


    const currentModuleNumber = modules.find((module) => module.containsCurrentLesson)?.index
    const value = Math.min(100, Math.max(0, Math.round(precentComplete)))


    const toggle = (module: CurriculumModule) => {
        const isOpen = openKeys.includes(module._key)
        setOpenKeys((keys) => isOpen ? keys.filter((key) => key !== module._key) : [...keys, module._key])
    }

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

        <ul>
            {modules.map((module) => {
                    const isOpen = openKeys.includes(module._key)
                    const isCurrent = module.containsCurrentLesson
                    const duration = formatDuration(module.durationSeconds)
                    const contentId = `${panelId}-${module._key}`
                return (

                    <li 
                    key={module._key}
                    className={cn("border-b border-canvas-line", isCurrent && "border-l-2 border-l-primary-500 bg-primary-100/30")}
                    >
                    <button
                    type='button'
                    onClick={() => toggle(module)}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    className='flex w-full items-start gap-4 px-5 py-4 text-left transition-colors hover:bg-canvas-line/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset'
                       >

                        {/**Index Number */}
                        <span className='relative flex shrink-0 justify-center' aria-hidden>
                            <span className={cn("flex size-7 items-center justify-center rounded-full border text-sm leading-none",
                                isCurrent ? "border-primary-500 bg-primary-500 text-white" : "border-canvas-line bg-canvas text-neutral-700"
                            )}>
                                {module.index + 1}
                            </span>
                            {!isOpen && 
                            <span className='absolute top-full left-1/2 h-6 w-px translate-x-1/2 bg-canvas-line' />            
                            }
                        </span>
                        
                        {/**Title & Duration */}
                        <span className='min-w-0 flex-1'>
                            <span className='block text-sm leading-5 font-medium text-neutral-900'>
                                {module.title}
                            </span>
                            {duration && (
                                <span className='mt-1 block text-sm leading-5 text-neutral-500'>
                                    {duration}
                                    </span>
                            )}
                        </span>
                        

                        {completedModuleKeys.includes(module._key) && !isCurrent ? (
                            <CompletedMark className='mt-0.5 shrink-0' />
                        )
                    :
                    (
                        <ChevronDown
                        strokeWidth={1.5}
                        aria-hidden
                        className={cn("mt-1 size-4 shrink-0 text-neutral-500 transition-transform", isOpen && "rotate-180")}
                        />   
                    )
                    }
                    </button>


                    {isOpen && (
                    <ul id={contentId} className="pb-3">
                      {module.lessons.map((lesson) => {
                        const lessonDuration = formatDuration(lesson.duration);

                        const row = (
                          <>
                            <span className="relative flex w-7.25 shrink-0 justify-center" aria-hidden>
                              <span
                                className={cn(
                                  "mt-1.5 size-2 rounded-full border",
                                  lesson.isCurrent
                                    ? "border-primary-500 bg-primary-500"
                                    : "border-neutral-300 bg-canvas",
                                )}
                              />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span
                                className={cn(
                                  "block text-[14px] leading-5",
                                  lesson.isCurrent
                                    ? "font-medium text-neutral-900"
                                    : "text-neutral-700",
                                )}
                              >
                                {lesson.title}
                              </span>
                              <span
                                className={cn(
                                  "mt-1 block text-[13px] leading-5",
                                  lesson.isCurrent ? "text-primary-500" : "text-neutral-500",
                                )}
                              >
                                {lesson.isCurrent ? "Now playing" : lessonDuration}
                              </span>
                            </span>
                            {lesson.isCurrent && (
                              <span
                                className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary-500 text-white"
                                aria-hidden
                              >
                                <Play className="size-3.5 fill-current" strokeWidth={2} />
                              </span>
                            )}
                          </>
                        );

                        return (
                          <li key={lesson._id}>
                            {lesson.slug && !lesson.isCurrent ? (
                              <Link
                                href={lessonHref(lesson.slug)}
                                className="flex items-start gap-4 px-5 py-2.5 transition-colors hover:bg-canvas-line/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset"
                              >
                                {row}
                              </Link>
                            ) : (
                              <div
                                aria-current={lesson.isCurrent ? "page" : undefined}
                                className="flex items-start gap-4 px-5 py-2.5"
                              >
                                {row}
                              </div>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}

                </li>
                )
                }
            )}
        </ul>



    </div>
  )
}

export default LessonSidebar

/** Rendered only once progress exists; kept here so the sidebar's completed state has one home. */
export function CompletedMark({ className }: { className?: string }) {
    return (
      <span
        className={cn(
          "flex size-5 items-center justify-center rounded-full border border-primary-500 text-primary-500",
          className,
        )}
        aria-label="Completed"
      >
        <Check className="size-3" strokeWidth={2.5} aria-hidden />
      </span>
    );
  }