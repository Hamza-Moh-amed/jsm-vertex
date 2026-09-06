import { formatCount, formatDuration, formatLevel } from '@/lib/format'
import { BarChart3, Clock, LucideIcon, Users } from 'lucide-react'
import { Badge } from '../ui/badge'
import LessonBookmarkButton from './LessonBookmarkButton'

interface LessonHeaderProps {
    label: string | null,
    title: string | null,
    summary: string | null,
    durationSeconds: number | null,
    level: string | null,
    studentCount: number | null,
    lessonSlug: string,
    
}


const LessonHeader = ({
    label,
    title,
    summary,
    durationSeconds,
    level,
    studentCount,
    lessonSlug,
}: LessonHeaderProps) => {

    const duration = formatDuration(durationSeconds)
    const levelLabel= formatLevel(level)
    const students = formatCount(studentCount)


    const meta: {icon: LucideIcon; label: string}[] = []
    if(duration) meta.push({icon: Clock, label: duration})
    if(levelLabel) meta.push({icon: BarChart3, label: levelLabel})
    if(students) meta.push({icon: Users, label: students})

  return (
    <header>
        
        {label && <Badge className='bg-primary-100 text-primary-500 font-semibold'>{label}</Badge>}

        <div className='mt-4 flex items-center justify-between gap-6'>
            <h1 className='font-display text-4xl leading-10 font-bold text-neutral-900 sm:text-5xl sm:leading-13'>
                {title}
            </h1>
            <LessonBookmarkButton lessonSlug={lessonSlug} />
        </div>

        {summary && (
            <p className='mt-4 text-lg max-w-130 leading-7.5 text-neutral-500'>
                {summary}
            </p>
        )}

        {meta.length > 0 && (
            <ul className='mt-7 flex flex-wrap items-center gap-x-8 gap-y-3'>
                {meta.map(({icon: Icon, label: item}) => (
                    <li
                    key={item}
                    className='inline-flex items-center gap-2 text-sm leading-5 whitespace-nowrap text-neutral-500'
                    >
                        <Icon className="size-4 shrink-0 " strokeWidth={1.5} aria-hidden />
                        {item}
                    </li>
                ))}
            </ul>
        )}

    </header>
  )
}

export default LessonHeader