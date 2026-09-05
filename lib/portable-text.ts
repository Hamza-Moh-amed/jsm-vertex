import { BlockContent } from "@/sanity.types";

type Block = BlockContent[number];


/** The plain text of a Portable Text block, ignoring marks and non-span children. */

function blockText (block: Extract<Block, {_type: "block"}> ) {
    return (block.children ?? [])
    .map((child) => (typeof child.text === "string" ? child.text : "" )).join("").trim()
}




/**
 * The first body paragraph of a Portable Text field, used where a document has no summary field of
 * its own. Returns null when there is no prose to show.
 */

export function firstParagraph(blocks: BlockContent | null | undefined) {
    if(!blocks) return null

    for(const block of blocks) {
        if (block._type !== "block" || block.style !== "normal" || block.listItem) continue
        const text = blockText(block)
        if(text) return text
    }
    return null
}

/** Truncates to a whole word, for metadata descriptions. */
export function truncate(text: string, maxLength: number) {
    if (text.length <= maxLength) return text;
    const clipped = text.slice(0, maxLength);
    return `${clipped.slice(0, clipped.lastIndexOf(" "))}…`;
  }