import CourseContent from "@/components/course/CourseContent";
import CourseHero from "@/components/course/CourseHero";
import CourseProgressBar from "@/components/course/CourseProgressBar";
import LearningOutcomes from "@/components/course/LearningOutcomes";
import { ChartDecoration } from "@/components/home/ChartDecoration";
import { PageFrame } from "@/components/layout/page-frame";
import Breadcrumbs from "@/components/nav/Breadcrumbs";
import { SiteHeader } from "@/components/SiteHeader";
import { coursesHref, lessonHref } from "@/lib/routes";
import { CACHE_TAGS, sanityFetch } from "@/sanity/lib/fetch"
import { COURSE_BY_SLUG_QUERY, COURSE_SLUGS_QUERY } from "@/sanity/lib/queries"
import { Metadata } from "next"
import { notFound } from "next/navigation";


async function getCourse (slug: string) {
  return sanityFetch({
    query: COURSE_BY_SLUG_QUERY,
    params: {slug},
    tags: [CACHE_TAGS.course, CACHE_TAGS.lesson]
  })
}

export async function generateStaticParams() {
  const courses = await sanityFetch({ query: COURSE_SLUGS_QUERY, tags: [CACHE_TAGS.course] });

  return courses.filter((course) => course.slug !== null).map((course) => ({slug: course.slug as string}))
}


export async function generateMetadata({params}: PageProps<"/courses/[slug]">): Promise<Metadata> {
  const {slug} = await params
  const course = await getCourse(slug)
  if(!course) return {}
  return {
    title: course.title ?? "Course",
    description: course.summary ?? undefined
  }
}

const CoursePage = async ({params}: PageProps<"/courses/[slug]">) => {
  
  const {slug} = await params
  
  const course = await getCourse(slug);
  console.log(course)
  
  if (!course) notFound();


  const modules = course.modules ?? [];
  const outcomes = course.learningOutcomes ?? []

  // Progress is not tracked yet, so "continue" means the first lesson.
  const firstLessonSlug = modules.flatMap((module) => module.lessons ?? [])[0]?.slug ?? null;
  const continueHref = firstLessonSlug ? lessonHref(firstLessonSlug) : null;


  return (
    <PageFrame>
        <SiteHeader activeHref={coursesHref} />


      <main className="relative flex flex-1 flex-col px-6 pt-11 pb-8 sm:px-12 xl:px-18">
        <Breadcrumbs
          items={[{label: "All Courses", href: coursesHref}, {label: course.title ?? "Course"}]}
        />

        <div className="mt-10 flex flex-col gap-14">

          <CourseHero course={course} continueHref={continueHref}  />

        {outcomes.length > 0 && <LearningOutcomes outcomes={outcomes} />}

        {modules.length > 0 && <CourseContent modules={modules} durationSeconds={course.durationSeconds} />}

        </div>

        <CourseProgressBar
          percentComplete={0}
          continueHref={continueHref}
          courseSlug={slug}
          className="mt-14"
        />


      </main>
      <ChartDecoration />
    </PageFrame>

  )
}

export default CoursePage