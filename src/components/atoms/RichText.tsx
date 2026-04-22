import DOMPurify from "isomorphic-dompurify";

type Props = {
  html: string;
  className?: string;
  as?: "p" | "div" | "span";
};

/**
 * Renders a translated string that may contain light HTML:
 * <b>, <strong>, <em>, <br>, <a>, <span class="text-accent">
 *
 * Sanitized with DOMPurify — only safe inline tags are allowed.
 */
export default function RichText({
  html,
  className = "",
  as: Tag = "div",
}: Props) {
  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ["b", "strong", "em", "i", "br", "a", "span", "u"],
    ALLOWED_ATTR: ["href", "target", "rel", "class"],
  });

  return (
    <Tag
      className={className}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
