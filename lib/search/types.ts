/** Long queries are a cost and prompt-injection surface, not a feature. */
export const MAX_QUERY_LENGTH = 200;


export const SORTS = ["relevance", "newest", "duration"] as const;
export type SearchSort = (typeof SORTS)[number]