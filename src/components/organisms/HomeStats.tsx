import { useI18n } from "@/lib/i18n";
import StatItem from "@/components/molecules/StatItem";

export default function HomeStats() {
  const { t } = useI18n();
  const stats = [
    { value: "120+", label: t("home.stats.projects") },
    { value: "92%", label: t("home.stats.retention") },
    { value: "98", label: t("home.stats.lighthouse") },
    { value: "76%", label: t("home.stats.ranking") },
  ];

  return (
    <div className="mx-auto w-full max-w-5xl px-6">
      <dl className="grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatItem key={s.label} value={s.value} label={s.label} />
        ))}
      </dl>
    </div>
  );
}
