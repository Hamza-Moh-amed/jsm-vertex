import { Bookmark } from "lucide-react";
import { Button } from "../ui/button";
import CourseResumeLink from "./CourseResumeLink";


interface CourseHeroActionsProps {
    /** Href for the first lesson; null when the curriculum is empty. */
    continueHref: string | null;
    /** Slug of the course, used as a property on captured events. */
    courseSlug: string;
  }
  

const CourseHeroActions = ({continueHref, courseSlug}: CourseHeroActionsProps) => {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-4">
        {continueHref && (
        <CourseResumeLink 
        href={continueHref}
        courseSlug={courseSlug}
        location="hero"
        precentComplete={0}
        className="h-14 px-5 text-base"
        />
        )}
        {/* //Todo: Update Button */}
        <Button className="border border-neutral-200 bg-surface text-neutral-900 shadow-sm h-14 px-6 text-base" type="button">
        <Bookmark className="size-5" strokeWidth={1.5} aria-hidden />
        Bookmark
        </Button>
    </div>
  )
}


export default CourseHeroActions