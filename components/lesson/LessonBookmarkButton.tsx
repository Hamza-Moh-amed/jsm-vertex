
import { Bookmark } from "lucide-react";

/**
 * Presentational, like the header's notification bell (AGENTS.md §7): there is no bookmark store,
 * so the button only reports intent to analytics.
 */
const LessonBookmarkButton = ({ lessonSlug }: { lessonSlug: string }) => {
  return (
    <button
      type="button"
      aria-label="Bookmark this lesson"
      className="flex size-10 shrink-0 items-center justify-center rounded-md border border-canvas-line bg-canvas text-primary-500 transition-colors hover:bg-primary-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
    >
      <Bookmark className="size-5" strokeWidth={2} aria-hidden />
    </button>
  );
}

export default LessonBookmarkButton