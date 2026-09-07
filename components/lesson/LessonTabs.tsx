"use client";

import { cn } from "@/lib/utils";
import { NotebookPen } from "lucide-react";
import { ReactNode, useId, useRef, useState } from "react";



type TabId = "content" | "notes"

const TABS: {id: TabId, label: string}[] = [
    {id: "content", label: "Lesson Content"},
    {id: "notes", label: "Notes"},
]

interface LessonTabsProps {
  /** Server-rendered lesson body. */
  children: ReactNode;
  lessonSlug: string;
}


const onKeyDown = (event: React.KeyboardEvent) => {

    }


const LessonTabs = ({ children, lessonSlug }: LessonTabsProps) => {

    const [active, setActive] = useState<TabId>("content")
    const baseId = useId()
    const tabRefs = useRef<Record<TabId, HTMLButtonElement | null>>({content: null, notes: null})

    return (
        <div>
            <div
            role="tablist"
            aria-label="Lesson"
            onKeyDown={onKeyDown}
            className="flex gap-8 border-b border-canvas-line"
            >
                {TABS.map((tab) => {
                    const isActive = tab.id === active

                    return (
                        <button
                        key={tab.id}
                        role="tab"
                        type="button"
                        ref={(node) => {tabRefs.current[tab.id] = node}}
                        id={`${baseId}-${tab.id}-tab`}
                        aria-selected={isActive}
                        aria-controls={`${baseId}-${tab.id}-panel`}
                        tabIndex={isActive ? 0 : -1}
                        onClick={() => setActive(tab.id)}
                        className={cn("-mb-px border-b-2 px-1 pb-3 text-sm leading-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
                            isActive ? "border-primary-500 font-medium text-primary-500" : "border-transparent text-neutral-500 hover:text-neutral-900"
                        )}
                        >
                            {tab.label}
                        </button>
                    )
                })}
            </div>

                <div
                role="tabpanel"
                id={`${baseId}-content-panel`}
                aria-labelledby={`${baseId}-content-tab`}
                hidden={active !== "content"}
                className="pt-8"
                >
                    {children}
                </div>


                
                <div
                role="tabpanel"
                id={`${baseId}-notes-panel`}
                aria-labelledby={`${baseId}-notes-tab`}
                hidden={active !== "notes"}
                tabIndex={0}
                className="pt-8"
                >
                    <div className="flex flex-col items-center gap-3 rounded-md border border-dashed border-canvas-line px-6 py-14 text-center">
                        <NotebookPen className="size-6 text-neutral-500" strokeWidth={2} aria-hidden />
                        <p className="text-sm leading-6 font-medium text-neutral-900">
                            Your notes will show here
                        </p>
                        <p className="text-sm leading-6 text-neutral-500 max-w-80">
                            Note taking is not available yet. Nothing you type would be saved, so the tab stays
                            read-only for now.
                        </p>
                    </div>
                </div>



        </div>
    )
}

export default LessonTabs