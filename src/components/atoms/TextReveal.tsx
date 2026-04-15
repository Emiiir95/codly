type Props = {
  text: string;
  className?: string;
};

/**
 * Snowpact-style text reveal. On parent hover (or when aria-current="page"),
 * the visible text slides up and a clone of the same text slides in from
 * below in accent color. Parent must carry the `group` class.
 */
export default function TextReveal({ text, className = "" }: Props) {
  return (
    <span
      className={`text-reveal ${className}`}
      data-text={text}
      aria-hidden={false}
    >
      <span>{text}</span>
    </span>
  );
}
