import { cn } from '@/lib/utils';
import React from 'react'
import CourseResumeLink from './CourseResumeLink';


interface CourseProgressBarProps {
    //Todo: Update the App to track learners progress 
    percentComplete: number;
    /** Where "Continue Learning" goes — the resume position once progress exists. */
  continueHref: string | null;
  /** Carried onto the resume event. */
  courseSlug: string;
  className?: string;

}


const CourseProgressBar = ({
    percentComplete,
    continueHref,
    courseSlug,
    className,
  }: CourseProgressBarProps) => {

    const value = Math.min(100, Math.max(0, Math.round(percentComplete)))

  return (

    <div className={cn("sm:sticky sm:bottom-3 flex flex-col gap-5 rounded-lg border border-canvas-line bg-canvas p-5 shadow-lg sm:flex-row sm:items-center sm:gap-8 sm:px-6", className)}>
        <div className='shrink-0'>
            <p className='text-sm leading-5 text-neutral-500'>Your Progress</p>
            <p className='mt-1 text-base leading-6 text-neutral-500'>
                <span className='font-semibold text-neutral-900'>
                    {value}%
                </span>{" "}
                {value === 0 ? "_not started" : "complete"}
            </p>
        </div>

        <div
        role='progressbar'
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label='course-progress'
        className='h-2 w-full overflow-hidden rounded-full bg-neutral-200 sm:mr-auto'
        
        >
            <div className='h-full rounded-full bg-primary-500' style={{width: `${value}%`}} />
        </div>


        {continueHref && (
            <CourseResumeLink 
            href={continueHref}
            courseSlug={courseSlug}
            location="progress_bar"
            percentComplete={value}
            className="h-14 shrink-0 px-6 text-[16px]"
            />
        )}
    </div>
  )
}

export default CourseProgressBar