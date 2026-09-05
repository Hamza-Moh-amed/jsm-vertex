import { urlFor } from "@/agent/skills/create-agent-with-sanity-context/references/ecommerce/app/src/sanity/lib/image";
import { PageFrame } from "@/components/layout/page-frame";
import { buildCurriculum } from "@/components/lesson/LessonCurriculum";
import LessonSidebar from "@/components/lesson/LessonSidebar";
import { SiteHeader } from "@/components/SiteHeader";
import { firstParagraph, truncate } from "@/lib/portable-text";
import { coursesHref } from "@/lib/routes";
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



const LessonPage = async ({params}: PageProps<"/lessons/[slug]">) => {
    const {slug} = await params
    
    const lesson = await getLesson(slug)
    console.log("This is the lesson", lesson)
    
    
    if(!lesson) notFound()
    const course = lesson.course
    console.log("This is the course", course)

    const curriculum = buildCurriculum(course?.modules, lesson._id)
    console.log("This is the curriculm", curriculum)
    
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
            </div>

        </PageFrame>
    )

}


export default LessonPage;