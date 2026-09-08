import { z } from "zod";

/**
 * The search contract, in three layers.
 *
 * 1. `SearchRequestSchema` — what the browser may send.
 * 2. `ModelHitSchema` — the only thing the LLM is allowed to author. It names a lesson and says why
 *    it matched; it never authors a title, a label, a duration, or a count.
 * 3. `SearchResultSchema` — the grounded card the route returns, built server-side from a real
 *    Sanity read of the lesson the model named (AGENTS.md §7: never invent a course, lesson, price,
 *    duration, or timestamp).
 */

export const SORTS = ["relevance", "newest", "duration"] as const;
export type SearchSort = (typeof SORTS)[number];

/** Long queries are a cost and prompt-injection surface, not a feature. */
export const MAX_QUERY_LENGTH = 200;

/** Bounds the grounding query. The model is told not to truncate; this is a defensive ceiling. */
export const MAX_RESULTS = 100;



// export type SearchResult = z.infer(typeof SearchResultSchema)

export const SearchResponseSchema = z.object({
    query: z.string(),
    sort: z.enum(SORTS),
    count: z.number().int().min(0),
    courseCount: z.number().int().min(0),
    reply: z.string()
    // results: z.array(SearchResultSchema)

})

export type SearchResponse = z.infer<typeof SearchResponseSchema>;