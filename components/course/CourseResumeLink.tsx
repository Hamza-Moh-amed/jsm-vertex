import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface CourseResumeLinkProps  {
    href: string,
    courseSlug: string,
    location: any //Todo: Update type 
    precentComplete: number
    className?: string
}

const CourseResumeLink = ({
    href,
    courseSlug,
    location,
    precentComplete,
    className,
    }: CourseResumeLinkProps) => {
    // TODO: udpaet click functionality
  return (
    <Link 
    href={href}
    className={cn("flex flex-row gap-2 items-center bg-white rounded-lg border border-neutral-200 shadow-sm font-medium",className)}
    >
        Continue Learning
        <ArrowRight className="size-5" strokeWidth={1.5} aria-hidden />
    </Link>
  )
}

export default CourseResumeLink