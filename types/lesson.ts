

import { LESSON_BY_SLUG_QUERY_RESULT } from "@/sanity.types";

type Lesson = NonNullable<LESSON_BY_SLUG_QUERY_RESULT>;
export type LessonCourse = NonNullable<Lesson["course"]>;
export type CourseModule = NonNullable<LessonCourse["modules"]>[number];

export interface CurriculumLesson {
  _id: string;
  title: string | null;
  slug: string | null;
  duration: number | null;
  /** "5.1", derived from order. */
  label: string;
  moduleIndex: number;
  isCurrent: boolean;
}

export interface CurriculumModule {
  _key: string;
  title: string | null;
  durationSeconds: number | null;
  index: number;
  lessons: CurriculumLesson[];
  containsCurrentLesson: boolean;
}

export interface Curriculum {
  modules: CurriculumModule[];
  /** Every lesson, flattened in curriculum order. */
  flat: CurriculumLesson[];
  current: CurriculumLesson | null;
  currentModule: CurriculumModule | null;
  previous: CurriculumLesson | null;
  next: CurriculumLesson | null;
}