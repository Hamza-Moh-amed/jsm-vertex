import { CourseModule, Curriculum, CurriculumLesson, CurriculumModule } from "@/types/lesson";

export function buildCurriculum(
    modules: CourseModule[] | null | undefined,
    currentLessonId: string,
  ): Curriculum {
    const built: CurriculumModule[] = (modules ?? []).map((module, moduleIndex) => {
      const lessons: CurriculumLesson[] = (module.lessons ?? []).map((lesson, lessonIndex) => ({
        _id: lesson._id,
        title: lesson.title,
        slug: lesson.slug,
        duration: lesson.duration,
        label: `${moduleIndex + 1}.${lessonIndex + 1}`,
        moduleIndex,
        isCurrent: lesson._id === currentLessonId,
      }));
  
      return {
        _key: module._key,
        title: module.title,
        durationSeconds: module.durationSeconds,
        index: moduleIndex,
        lessons,
        containsCurrentLesson: lessons.some((lesson) => lesson.isCurrent),
      };
    });
  
    const flat = built.flatMap((module) => module.lessons);
    const currentIndex = flat.findIndex((lesson) => lesson.isCurrent);
  
    return {
      modules: built,
      flat,
      current: currentIndex >= 0 ? flat[currentIndex] : null,
      currentModule: built.find((module) => module.containsCurrentLesson) ?? null,
      previous: currentIndex > 0 ? flat[currentIndex - 1] : null,
      next: currentIndex >= 0 && currentIndex < flat.length - 1 ? flat[currentIndex + 1] : null,
    };
  }

const LessonCurriculum = () => {
  return (
    <div>LessonCurriculum</div>
  )
}

export default LessonCurriculum;