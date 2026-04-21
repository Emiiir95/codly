import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/atoms/Button";

type Props = {
  title: string;
  subtitle: string;
  buttonLabel: string;
  href: string;
};

export default function MidCta({ title, subtitle, buttonLabel, href }: Props) {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="relative overflow-hidden rounded-2xl bg-[var(--color-accent)] px-8 py-10 text-center text-white shadow-xl sm:px-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(600px at 30% 20%, white, transparent 70%)",
          }}
        />
        <div className="relative">
          <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">{subtitle}</p>
          <div className="mt-6">
            <ButtonLink
              href={href}
              variant="secondary"
              className="!border-white/30 !bg-white !text-[var(--color-accent)] hover:!bg-white/90"
            >
              {buttonLabel} <ArrowRight size={16} />
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
