import { CircleCheck } from "lucide-react"

const LessonKeyPoints = ({points}: {points: string[]}) => {

    return (
      <section aria-labelledby="lesson-key-points">    
          <h2 id="lesson-key-points" className="text-base leading-6 font-semibold text-neutral-900">
              In this lesson you will:
          </h2>
          <ul className="mt-5 flex flex-col gap-4">
              {points.map((point) => (
                  <li key={point}
                  className="flex items-start gap-4 text-sm leading-6 text-neutral-700"
                  >
                    <CircleCheck className="mt-0.5 size-4.5 shrink-0 text-primary-500" strokeWidth={2} aria-hidden />
                      {point}
                  </li>
              ))}
          </ul>
      </section>
    )
  }
  
  export default LessonKeyPoints