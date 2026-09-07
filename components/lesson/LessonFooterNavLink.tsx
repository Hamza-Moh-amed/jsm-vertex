import Link from 'next/link'
import React, { ReactNode } from 'react'

interface LessonFooterNavLinkProps {
    href: string;
    children: ReactNode;
  }
  


const LessonFooterNavLink = ({
    href,
    children
    }: LessonFooterNavLinkProps ) => {
  return (
    <Link
    href={href}
    className="inline-flex items-center justify-center gap-2 rounded-md font-sans font-medium whitespace-nowrap  transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed h-11 px-4 text-[16px] border border-neutral-200 bg-surface text-neutral-900 shadow-sm"
    >
        {children}
    </Link>
  )
}

export default LessonFooterNavLink