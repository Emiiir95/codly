type Props = {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
};

export default function FaqItem({ question, answer, isOpen, onToggle }: Props) {
  return (
    <li className="card">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-base font-medium text-[var(--color-fg)]">
          {question}
        </span>
        <span
          aria-hidden
          className={`text-xl text-[var(--color-accent)] transition-transform ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      {isOpen && (
        <div className="px-6 pb-6 text-sm leading-relaxed text-[var(--color-fg-muted)]">
          {answer}
        </div>
      )}
    </li>
  );
}
