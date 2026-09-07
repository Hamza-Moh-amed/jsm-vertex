import { urlFor } from "@/agent/skills/create-agent-with-sanity-context/references/ecommerce/app/src/sanity/lib/image";
import { PageFrame } from "@/components/layout/page-frame";
import { buildCurriculum } from "@/components/lesson/LessonCurriculum";
import LessonFooterNav from "@/components/lesson/LessonFooterNav";
import LessonHeader from "@/components/lesson/LessonHeader";
import LessonKeyPoints from "@/components/lesson/LessonKeyPoints";
import LessonNotes from "@/components/lesson/LessonNotes";
import LessonProTip from "@/components/lesson/LessonProTip";
import LessonResources from "@/components/lesson/LessonResources";
import LessonSidebar from "@/components/lesson/LessonSidebar";
import LessonTabs from "@/components/lesson/LessonTabs";
import LessonVideo from "@/components/lesson/LessonVideo";
import Breadcrumbs from "@/components/nav/Breadcrumbs";
import { SiteHeader } from "@/components/SiteHeader";
import { firstParagraph, splitLeadParagraph, truncate } from "@/lib/portable-text";
import { courseHref, coursesHref, START_SECONDS_PARAM } from "@/lib/routes";
import { parseVideoUrl } from "@/lib/video";
import { CACHE_TAGS, sanityFetch } from "@/sanity/lib/fetch";
import { LESSON_BY_SLUG_QUERY, LESSON_SLUGS_QUERY } from "@/sanity/lib/queries";
import { Metadata } from "next";
import { notFound } from "next/navigation";


async function getLesson (slug: string) {
    return sanityFetch({
        query: LESSON_BY_SLUG_QUERY,
        params: {slug},
        tags: [CACHE_TAGS.lesson, CACHE_TAGS.course]
    })
}

export async function generateStaticParams() {
    const lessons = await sanityFetch({
        query: LESSON_SLUGS_QUERY, tags: [CACHE_TAGS.lesson]
    })

    
    return lessons.filter((lesson) => lesson.slug !== null).map((lesson) => ({slug: lesson.slug as string}))
}

export async function generateMetadata ({params}: PageProps<"/lessons/[slug]">): Promise<Metadata> {
    const {slug} = await params
    const lesson = await getLesson(slug)

    if (!lesson) return {}
    
    const summary = firstParagraph(lesson.notes)

    return {
        title: lesson.title ?? "Lesson",
        description: summary ? truncate(summary, 155) : undefined
    }
}

/** `?t=765` — the matched second a search result deep-links to (AGENTS.md §7). */
function readStartSeconds(value: string | string[] | undefined, durationSeconds: number | null) {
    const raw = Array.isArray(value) ? value[0] : value;
    const parsed = Number.parseInt(raw ?? "", 10);
  
    if (!Number.isFinite(parsed) || parsed <= 0) return 0;
    return durationSeconds ? Math.min(parsed, durationSeconds) : parsed;
  }


const LessonPage = async ({params, searchParams}: PageProps<"/lessons/[slug]">) => {
    const {slug} = await params
    
    const lesson = await getLesson(slug)
    console.log("This is the lesson", lesson)
    
    
    if(!lesson) notFound()
    const course = lesson.course

    const curriculum = buildCurriculum(course?.modules, lesson._id)

    
    
    // The lesson schema has no summary field, so the notes' lead paragraph fills that role — and is
    // dropped from the body below so the page does not print it twice.
    const { lead: summary, rest: body } = splitLeadParagraph(lesson.notes);
    
    const startSeconds = readStartSeconds((await searchParams)[START_SECONDS_PARAM], lesson.duration)


    const keyPoints= lesson.keyPoints ?? []
    const resources = lesson.resources ?? []

    
    return (
        <PageFrame>
            <SiteHeader activeHref={coursesHref} />

            <div className="flex flex-1 flex-col lg:flex-row">
                {course && 
                
              <LessonSidebar
              courseTitle={course.title}
              courseSlug={course.slug}
              courseImageUrl={course.coverImage?.asset ? urlFor(course.coverImage).width(96).height(96).fit("crop").url() : null}
              courseImageAlt={course.coverImage?.alt ?? course.title ?? "" }
              modules={curriculum.modules}
              precentComplete={0}
              className="border-b border-canvas-line lg:w-69.5 lg:shrink-0 lg:border-r lg:border-b-0"
              />
                }


             <main className="flex min-w-0 flex-1 flex-col">
                <div className="flex flex-col gap-8 px-6 pt-8 pb-10 sm:px-8">


              {/**Breadcrumbs */}
              <Breadcrumbs items={[
                        {label: "All Courses", href: coursesHref},
                         ...(course?.title
                             ? [{label: course.title, href: course.slug ? courseHref(course.slug) : undefined}]
                            : []),
                        ...(curriculum.currentModule?.title ? [{label: curriculum.currentModule.title}] : []),
                        {label: lesson.title ?? "Lesson"}
              ]} />


            <LessonHeader
              label={curriculum.current?.label ?? null}
              title={lesson.title}
              summary={summary}
              durationSeconds={lesson.duration}
              level={course?.level ?? null}
              studentCount={lesson.studentCount}
              lessonSlug={slug}
            />

            
            <LessonVideo
              lessonTitle={lesson.title ?? "Lesson"}
              lessonSlug={slug}
              lessonLabel={curriculum.current?.label ?? null}
              video={parseVideoUrl(lesson.videoUrl)}
              posterUrl={
                  lesson.thumbnail?.asset
                  ? urlFor(lesson.thumbnail).width(1280).height(720).fit("crop").url()
                  : null
                }
                posterAlt={lesson.thumbnail?.alt ?? lesson.title ?? ""}
                startSeconds={startSeconds}
                durationSeconds={lesson.duration}
                courseSlug={course?.slug ?? null}
            />


               
            <LessonTabs lessonSlug={slug}>
             <div className="flex flex-col gap-8">
                {body && (
                    <section aria-labelledby="lesson-overview">
                        <h2 id="lesson-overview" className="font-display text-xl leading-7 font-bold text-neutral-900">Overview</h2>
                        <div className="mt-4">
                            <LessonNotes notes={body} />
                        </div>
                    </section>
                )}
                {keyPoints.length > 0 &&
                 <>
                    <hr className="border-canvas-line" />
                    <LessonKeyPoints points={keyPoints} />
                </>}

                {lesson.proTip && <LessonProTip proTip={lesson.proTip} />}

                {resources.length > 0 && 
                
                <>
                    <hr className="border-canvas-line" />
                    <LessonResources resources={resources} lessonSlug={slug} />
                </>
                }

             </div>
            </LessonTabs>
                </div>
             </main>
            </div>

            <LessonFooterNav
            previous={curriculum.previous}
            next={curriculum.next}
            currentLessonSlug={slug}
            />

        </PageFrame>
    )

}


export default LessonPage;