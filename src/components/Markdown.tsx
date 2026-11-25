import DOMPurify from "dompurify";
import { marked } from "marked";
import { useMemo } from "react";

let hooked = false;

/** Markdown -> bezpieczny HTML (DOMPurify). Linki zewnetrzne otwieraja sie w nowej karcie. */
export default function Markdown({ source }: { source: string }) {
  const html = useMemo(() => {
    if (!hooked) {
      DOMPurify.addHook("afterSanitizeAttributes", (node) => {
        if (node.tagName === "A") {
          node.setAttribute("target", "_blank");
          node.setAttribute("rel", "noopener noreferrer nofollow");
        }
      });
      hooked = true;
    }
    return DOMPurify.sanitize(marked.parse(source, { async: false, gfm: true, breaks: true }) as string, { USE_PROFILES: { html: true } });
  }, [source]);
  return <div className="markdown" dangerouslySetInnerHTML={{ __html: html }} />;
}
