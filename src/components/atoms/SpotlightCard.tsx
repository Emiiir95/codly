import { useRef, type ReactNode, type MouseEvent } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** rgba() or any CSS color accepted by radial-gradient. */
  spotlightColor?: string;
  /** When true, the wrapper adds no background/border/padding — just the
   *  cursor-following spotlight rendered on top via blend mode. Use this to
   *  keep an existing styled card (e.g. `.card`) unchanged. */
  bare?: boolean;
};

/**
 * Card with a cursor-following radial-gradient "spotlight" that appears on
 * hover. Uses CSS custom properties updated on mouse move so the gradient
 * tracks the pointer. Pair with `.card-spotlight` styles in globals.css.
 */
export default function SpotlightCard({
  children,
  className = "",
  spotlightColor,
  bare = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mouse-x", `${x}px`);
    el.style.setProperty("--mouse-y", `${y}px`);
    if (spotlightColor) {
      el.style.setProperty("--spotlight-color", spotlightColor);
    }
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`${bare ? "card-spotlight-bare" : "card-spotlight"} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
