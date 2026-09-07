import { Lightbulb } from "lucide-react"

const LessonProTip = ({proTip}: {proTip: string}) => {
  return (
    <aside className="flex gap-4 rounded-md bg-primary-100 p-6">
        <Lightbulb className="mt-0.5 size-5 shrink-0 text-primary-500" strokeWidth={2} aria-hidden />
        <div className="min-w-0">
            <h2 className="font-display text-base leading-6 font-bold text-neutral-900">Pro Tip</h2>
            <p className="mt-1.5 text-sm leading-6 text-neutral-700">{proTip}</p>
        </div>
    </aside>
  )
}

export default LessonProTip